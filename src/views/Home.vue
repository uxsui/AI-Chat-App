<script setup>
import { RouterLink } from 'vue-router'
import ChatInput from '../components/ChatInput.vue'
import { useChatStore } from '../store/chatStore'
import ChatList from '../components/ChatList.vue'
import ChatSidebar from '../components/ChatSidebar.vue'

const chatStore = useChatStore()

// 建议：如果这是全局初始化，移到 App.vue 更好
chatStore.ensureSessionsInitialized()

const handleClear = () => {
  if (confirm('确定要清空所有聊天记录吗？')) {
    chatStore.clearList()
  }
}
</script>

<template>
  <div class="app-wrapper">
    <header class="header">
      <div class="header-session">
        <span class="header-label">对话窗口:</span>
        <span class="header-title">{{ chatStore.currentSession?.title || '新对话' }}</span>
      </div>

      <div class="header-actions">
        <button class="action-item icon-btn" type="button">⌕</button>
        <nav class="header-nav">
          <RouterLink class="action-item" to="/help">帮助</RouterLink>
          <RouterLink class="action-item" to="/about">关于豆奶</RouterLink>
        </nav>
        <button class="action-item clear-btn" @click="handleClear">↺ 清空聊天</button>
      </div>
    </header>

    <main class="chat-container">
      <ChatSidebar />
      <div class="chat-main">
        <ChatList />
      </div>
    </main>

    <footer class="input-area">
      <ChatInput />
    </footer>
  </div>
</template>

<style scoped>
/* 1. 基础布局简化 */
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8fafc;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background: rgba(255, 255, 255, 0.82);
  border-bottom: 1px solid #eef2f7;
  backdrop-filter: blur(18px);
}

/* 2. 提取公共按钮样式 */
.action-item {
  padding: 8px 14px;
  border: 1px solid #e5edf7;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  color: #475569;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
}

.action-item:hover, .router-link-active {
  background: #ffffff;
  color: #1d4ed8;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.icon-btn {
  width: 38px;
  height: 38px;
  padding: 0;
  display: grid;
  place-items: center;
}

/* 3. 布局结构 */
.header-session, .header-actions, .header-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-label { color: #94a3b8; font-size: 12px; font-weight: 600; }
.header-title { font-size: 14px; font-weight: 600; color: #0f172a; }

.chat-container {
  flex: 1;
  display: flex;
  padding-bottom: 110px; /* 为底部输入框留空 */
}

.chat-main {
  flex: 1;
  min-width: 0;
  background: #f8fafc;
}

/* 4. 移动端适配精简 */
@media (max-width: 640px) {
  .header { padding: 0 12px; }
  .chat-container { padding-bottom: 132px; }
  .action-item { padding: 6px 10px; font-size: 12px; }
}
</style>