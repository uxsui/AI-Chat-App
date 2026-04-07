<script setup>
import ChatInput from '../components/ChatInput.vue'
import { useChatStore } from '../store/chatStore';
import ChatList from '../components/ChatList.vue';

const chatStore=useChatStore()
const handleClear=()=>{
    if(confirm('确定要清空所有聊天记录吗？')){
        chatStore.clearList()
    }
}
</script>

<template>
<div class="app-wrapper">
    <header class="header">
      <div class="logo-area">
        <span class="avatar">🥛</span>
        <span class="title">豆奶 AI</span>
      </div>
      <button class="clear-btn" @click="handleClear">清空</button>
    </header>

    <main class="chat-container">
      <ChatList />
      <div v-if="chatStore.isTyping" class="loading-status">豆奶正在思考中...</div>
    </main>

    <footer class="input-area">
      <ChatInput />
    </footer>
</div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.92), rgba(244, 247, 251, 0.98) 42%, #f3f5f8 100%);
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  min-height: 62px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px;
  background: rgba(248, 250, 252, 0.8);
  border-bottom: 1px solid rgba(15, 23, 42, 0.05);
  backdrop-filter: blur(20px);
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 14px;
  background: linear-gradient(180deg, #ffffff 0%, #f3f6fb 100%);
  color: #2563eb;
  border: 1px solid rgba(148, 163, 184, 0.24);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

.title {
  font-size: 17px;
  font-weight: 600;
  color: #111827;
  letter-spacing: 0.02em;
}

.clear-btn {
  padding: 9px 15px;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #475569;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.clear-btn:hover {
  transform: translateY(-1px);
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.chat-container {
  flex: 1;
  width: min(860px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0 70px;
  box-sizing: border-box;
}

.loading-status {
  margin-top: 16px;
  color: #94a3b8;
  font-size: 13px;
  text-align: center;
}

.input-area {
  padding: 0 16px 24px;
}

@media (max-width: 640px) {
  .header {
    padding: 0 16px;
  }

  .chat-container {
    width: calc(100% - 20px);
    padding: 16px 0 132px;
  }

  .title {
    font-size: 16px;
  }
}
</style>
