import { defineStore } from 'pinia'
import { createStreamChatRequest } from '../api/chat'

const WELCOME_AI = '你好，我是你的 AI 助手豆奶，请问有什么可以帮你的？'

export const useChatStore = defineStore('chat', {
  state: () => ({
    // 新结构：多个会话
    sessions: [],
    currentSessionId: null,

    // legacy：用于迁移老版本 persistedState（只有 messages 的情况）
    messages: [{ id: 1, role: 'ai', content: WELCOME_AI }],

    isTyping: false
  }),
  getters: {
    currentSession(state) {
      if (!state.currentSessionId) return null
      return state.sessions.find(s => s.id === state.currentSessionId) || null
    },
    // 兼容 UI：当 sessions 还未迁移时，直接使用 legacy messages
    currentMessages() {
      const session = this.currentSession
      if (session?.messages) return session.messages
      return this.messages
    },
    // 获取用于API上下文的消息（最近10轮，共20条消息）
    contextMessages() {
      const session = this.currentSession
      if (!session?.messages) return []
      const allMessages = session.messages
      // 最多保留20条消息（10轮对话）
      return allMessages.slice(-20)
    },
    // 获取当前上下文中的消息数量
    contextMessageCount() {
      return this.contextMessages.length
    }
  },
  actions: {
    ensureSessionsInitialized() {
      if (this.sessions.length > 0) {
        if (!this.currentSessionId) this.currentSessionId = this.sessions[0].id
        return
      }

      const legacyMessages = Array.isArray(this.messages) ? this.messages : []
      const now = new Date()
      const sessionId = Date.now().toString()

      const normalizedLegacyMessages =
        legacyMessages.length > 0
          ? legacyMessages.map(m => ({
              ...m,
              timestamp: m.timestamp ?? new Date()
            }))
          : [{ id: 1, role: 'ai', content: WELCOME_AI, timestamp: now }]

      this.sessions = [
        {
          id: sessionId,
          title: '新对话',
          messages: normalizedLegacyMessages,
          createdAt: now.toISOString(),
          updatedAt: now.toISOString()
        }
      ]
      this.currentSessionId = sessionId
      // 清掉 legacy，避免 double-save
      this.messages = []
    },

    startNewSession() {
      this.ensureSessionsInitialized()

      const now = new Date()
      const sessionId = Date.now().toString()
      const welcomeMsg = { id: now.getTime(), role: 'ai', content: WELCOME_AI, timestamp: now }

      this.sessions.unshift({
        id: sessionId,
        title: '新对话',
        messages: [welcomeMsg],
        createdAt: now.toISOString(),
        updatedAt: now.toISOString()
      })

      this.currentSessionId = sessionId
    },

    setCurrentSession(id) {
      if (this.isTyping) this.cancelChat()
      this.ensureSessionsInitialized()
      if (this.sessions.some(s => s.id === id)) {
        this.currentSessionId = id
      }
    },

    deleteSession(id) {
      this.ensureSessionsInitialized()

      const idx = this.sessions.findIndex(s => s.id === id)
      if (idx < 0) return

      const now = new Date()
      if (this.sessions.length === 1) {
        const newId = Date.now().toString()
        this.sessions = [
          {
            id: newId,
            title: '新对话',
            messages: [{ id: now.getTime(), role: 'ai', content: WELCOME_AI, timestamp: now }],
            createdAt: now.toISOString(),
            updatedAt: now.toISOString()
          }
        ]
        this.currentSessionId = newId
        return
      }

      this.sessions.splice(idx, 1)

      if (this.currentSessionId === id) {
        const next = this.sessions[idx] || this.sessions[idx - 1] || this.sessions[0]
        this.currentSessionId = next.id
      }
    },

    // 取消当前流式生成（如果有）
    cancelChat() {
      try {
        this.abortController?.abort()
      } catch (e) {
        // ignore
      } finally {
        this.isTyping = false
      }
    },

    clearList() {
      this.ensureSessionsInitialized()
      const session = this.currentSession
      if (session) {
        session.messages = []
        session.updatedAt = new Date().toISOString()
      }
    },

    async sendChatMessage(content) {
      if (!content) return

      this.ensureSessionsInitialized()
      const session = this.currentSession
      if (!session) return

      // 若上一次还有未完成的流，先取消
      this.cancelChat()

      session.updatedAt = new Date().toISOString()

      // 用户消息入当前会话
      const now = new Date()
      session.messages.push({ id: Date.now(), role: 'user', content, timestamp: now })

      // 为会话生成一个简单标题（首轮用户内容）
      if (session.title === '新对话') {
        session.title = content.trim().slice(0, 12)
      }

      // 占位 AI 消息：流式过程中只更新这一条的 content
      this.isTyping = true
      const aiMsgIndex = session.messages.length
      session.messages.push({ id: Date.now(), role: 'ai', content: '', timestamp: new Date() })

      // 获取最近10轮对话的消息（共20条：10个用户消息 + 10个AI消息）
      const contextMessages = session.messages.slice(-20).map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      try {
        this.abortController = await createStreamChatRequest(
          contextMessages,
          // 流式数据处理
          (delta) => {
            session.messages[aiMsgIndex].content += delta
          },
          // 错误处理
          (error) => {
            console.error('API 调用失败:', error)
            const lastAi = session.messages.slice().reverse().find(m => m.role === 'ai')
            if (lastAi) {
              lastAi.content = '抱歉，刚刚豆奶开小差了，请重试。'
            } else {
              session.messages.push({
                id: Date.now(),
                role: 'ai',
                content: '抱歉，刚刚豆奶开小差了，请重试。',
                timestamp: new Date()
              })
            }
          },
          // 完成处理
          () => {
            this.isTyping = false
            this.abortController = null
            session.updatedAt = new Date().toISOString()
          }
        )
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error('API 调用失败:', error)
        }
      } finally {
        this.isTyping = false
        this.abortController = null
        session.updatedAt = new Date().toISOString()
      }
    }
  },
  // 流式逐字更新时会频繁触发状态变更；避免每个 token 都写 localStorage 影响“顺滑度”
  persist: {
    filter: (_mutation, state) => !state.isTyping
  }
})
