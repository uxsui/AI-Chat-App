import { defineStore } from 'pinia'
import axios from 'axios'

const apiKey = import.meta.env.VITE_GROQ_API_KEY

const request = axios.create({
  baseURL: 'https://api.groq.com/openai/v1',
  headers: {
    Authorization: apiKey ? `Bearer ${apiKey}` : ''
  }
})

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [
      { id: 1, role: 'ai', content: '你好，我是你的 AI 助手豆奶，请问有什么可以帮你的？' }
    ],
    isTyping: false
  }),
  actions: {
    addMessage(payload) {
      this.messages.push({
        id: Date.now(),
        ...payload,
        timestamp: new Date()
      })
    },
    async sendChatMessage(content) {
      if (!content) return

      this.addMessage({ role: 'user', content })
      this.isTyping = true

      try {
        const res = await request.post('/chat/completions', {
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content }]
        })
        const aiReply = res.data.choices[0].message.content
        this.addMessage({ role: 'ai', content: aiReply })
      } catch (error) {
        console.error('API 调用失败:', error)
        this.addMessage({ role: 'ai', content: '抱歉，刚刚豆奶开小差了，请重试。' })
      } finally {
        this.isTyping = false
      }
    },
    clearList() {
      this.messages = []
    }
  },
  persist: true
})
