// Groq API 配置
const apiKey = import.meta.env.VITE_API_KEY
const API_BASE_URL = 'https://api.groq.com/openai/v1'
const DEFAULT_MODEL = 'llama-3.3-70b-versatile'

// 创建流式请求
export const createStreamChatRequest = async (messages, onChunk, onError, onComplete) => {
  const abortController = new AbortController()

  try {
    const resp = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages,
        stream: true
      }),
      signal: abortController.signal
    })

    if (!resp.ok || !resp.body) {
      throw new Error(`Request failed: ${resp.status}`)
    }

    const reader = resp.body.getReader()
    const decoder = new TextDecoder('utf-8')

    // SSE 解析：按行累积 data，遇到空行认为一个事件结束
    let buffer = ''
    let eventDataLines = []

    const handleEventData = data => {
      if (!data) return

      if (data === '[DONE]') {
        onComplete()
        return 'done'
      }

      let payload
      try {
        payload = JSON.parse(data)
      } catch (e) {
        return
      }

      const deltaObj = payload?.choices?.[0]?.delta
      // 兼容不同实现可能用 content/text 字段
      const delta =
        deltaObj?.content ??
        deltaObj?.text ??
        payload?.choices?.[0]?.text ??
        payload?.choices?.[0]?.message?.content

      if (typeof delta === 'string' && delta.length > 0) {
        onChunk(delta)
      }
    }

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      buffer = buffer.replace(/\r/g, '')

      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line === '') {
          const data = eventDataLines.join('\n').trim()
          eventDataLines = []
          const r = handleEventData(data)
          if (r === 'done') return abortController
          continue
        }

        // SSE 只取 data: 行（event: / id: 不需要）
        if (line.startsWith('data:')) {
          eventDataLines.push(line.slice(5).trim())
        }
      }
    }

    // flush 最后残留
    if (buffer) {
      const lastLine = buffer.trim()
      if (lastLine.startsWith('data:')) {
        eventDataLines.push(lastLine.slice(5).trim())
      }
    }

    if (eventDataLines.length > 0) {
      const data = eventDataLines.join('\n').trim()
      const r = handleEventData(data)
      if (r === 'done') return abortController
    }

    return abortController
  } catch (error) {
    if (error?.name === 'AbortError') {
      return abortController
    }
    onError(error)
    return abortController
  }
}          