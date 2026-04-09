// store/chatStore.js
import { defineStore } from 'pinia'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY

const request = axios.create({
  // Groq 的官方 API 基础地址
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    // ⚠️ 记得换成你真正的 API Key
    'Authorization': apiKey
  }
})

export const useChatStore = defineStore('chat', {
  state: () => ({
    list: [], // 聊天记录
    loading:false //观察是否加载
  }),
  actions: {
    addMessage(msg) {
      this.list.push({
        id:Date.now(),
        timestamp:new Date(),
        ...msg
      })
    },
    async sendChatMessage(content){
      if(!content) return

      this.addMessage({role:'user',content})
      this.loading=true //加载

      try{
        //调用接口
        const res =await request.post('/chat/completions',{
          model: 'llama-3.3-70b-versatile',
          messages:[
            { role:'user',
              content:content}
          ]
        })
        const aiReply=res.data.choices[0].message.content

        this.addMessage({
          role:'ai',
          content: aiReply
        })

      }catch(error){
        console.error('聊天接口报错了',error);
        this.addMessage({
          role:'ai',
          content:'抱歉，现在网络出现问题，请稍后再试。'
        })
      }finally{
        //关闭加载动画
        this.loading=false
      }
    },
    clearList() {
      this.list = []
    }
  },
  persist: true // 持久化
})