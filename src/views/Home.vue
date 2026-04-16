<script setup>
import { RouterLink } from 'vue-router'
import ChatInput from '../components/ChatInput.vue'
import { useChatStore } from '../store/chatStore'
import ChatList from '../components/ChatList.vue'
import ChatSidebar from '../components/ChatSidebar.vue'

const chatStore = useChatStore()

// 启动时把 legacy 的单会话数据迁移到 sessions 结构
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
        <button class="icon-btn" type="button" aria-label="搜索">⌕</button>
        <nav class="header-nav">
          <RouterLink class="nav-link" to="/help">帮助</RouterLink>
          <RouterLink class="nav-link" to="/about">关于豆奶</RouterLink>
        </nav>
        <button class="clear-btn" @click="handleClear">↺ 清空聊天</button>
      </div>
    </header>

    <main class="chat-container">
      <ChatSidebar />
      <div class="chat-main">
        <ChatList />
        <div v-if="chatStore.isTyping" class="loading-status">豆奶正在思考中...</div>
      </div>
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
  background: #f8fafc;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  min-height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px 0 24px;
  background: rgba(255, 255, 255, 0.82);
  border-bottom: 1px solid #eef2f7;
  backdrop-filter: blur(18px);
}

.header-session {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-label {
  color: #94a3b8;
  font-size: 12px;
  font-weight: 600;
}

.header-title {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-btn,
.nav-link,
.clear-btn {
  padding: 9px 15px;
  border: 1px solid #e5edf7;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  color: #475569;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
}

.icon-btn {
  width: 38px;
  height: 38px;
  padding: 0;
  display: grid;
  place-items: center;
  font-size: 16px;
}

.icon-btn:hover,
.nav-link:hover,
.nav-link.router-link-active,
.clear-btn:hover {
  background: #ffffff;
  color: #1d4ed8;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.chat-container {
  flex: 1;
  width: 100%;
  margin: 0;
  padding: 0 0 110px;
  box-sizing: border-box;
  display: flex;
  gap: 0;
  align-items: flex-start;
}

.chat-main {
  flex: 1;
  min-width: 0;
  padding: 14px 0 0;
  background: #f8fafc;
}

.loading-status {
  margin-top: 8px;
  color: #94a3b8;
  font-size: 12px;
  text-align: center;
}

.input-area {
  padding: 0;
}

@media (max-width: 640px) {
  .header {
    padding: 0 16px;
  }

  .header-actions {
    gap: 6px;
  }

  .header-nav {
    gap: 6px;
  }

  .icon-btn,
  .nav-link,
  .clear-btn {
    padding: 8px 12px;
  }

  .chat-container {
    padding: 0 0 132px;
  }

  .header-title {
    font-size: 13px;
  }
}
</style>
