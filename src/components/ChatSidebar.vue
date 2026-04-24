<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useChatStore } from '../store/chatStore'
import logoUrl from '../assets/logo.png'

const chatStore = useChatStore()

const sessionPreview = computed(() =>
  chatStore.sessions.map(session => {
    const lastUserMessage = [...session.messages].reverse().find(item => item.role === 'user')
    return {
      id: session.id,
      title: session.title || '新对话',
      preview: lastUserMessage?.content || '点击继续这个对话'
    }
  })
)

const newChat = () => {
  chatStore.startNewSession()
}

const setActive = id => {
  chatStore.setCurrentSession(id)
}

const removeChat = id => {
  if (confirm('确定删除该对话吗？')) {
    chatStore.deleteSession(id)
  }
}
</script>

<template>
  <aside class="chat-sidebar">
    <div class="brand-row">
      <div class="brand-badge">
        <img :src="logoUrl" alt="豆奶 AI logo" class="brand-logo" />
      </div>
      <div>
        <p class="brand-name">豆奶 AI</p>
      </div>
    </div>

    <div class="sidebar-top">
      <button class="new-chat-btn" @click="newChat">
        <span class="new-chat-plus">+</span>
        <span>新对话</span>
      </button>
    </div>

    <p class="sidebar-section-title">最近对话记录</p>

    <div class="sidebar-list">
      <div v-if="chatStore.sessions.length === 0" class="sidebar-empty">
        暂无对话，点击上方按钮新建一个。
      </div>

      <div
        v-for="s in sessionPreview"
        :key="s.id"
        class="sidebar-item"
        :class="{ active: s.id === chatStore.currentSessionId }"
        @click="setActive(s.id)"
      >
        <div class="sidebar-item-icon">💬</div>
        <div class="sidebar-item-content">
          <div class="sidebar-item-title">
            {{ s.title }}
          </div>
          <div class="sidebar-item-preview">
            {{ s.preview }}
          </div>
        </div>
        <button class="sidebar-item-del" @click.stop="removeChat(s.id)">
          ×
        </button>
      </div>
    </div>

    <div class="sidebar-footer">
      <RouterLink class="sidebar-footer-btn" to="/about">关于豆奶</RouterLink>
      <RouterLink class="sidebar-footer-btn" to="/help">帮助</RouterLink>
    </div>
  </aside>
</template>

<style scoped>
.chat-sidebar {
  position: fixed;
  left: 0;
  top: 64px;
  width: 248px;
  height: calc(100vh - 64px);
  padding: 18px 12px;
  box-sizing: border-box;
  background: #ffffff;
  border-right: 1px solid #eef2f7;
  display: flex;
  flex-direction: column;
  z-index: 9;
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px;
  margin-bottom: 20px;
}

.brand-badge {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%);
  border: 1px solid #dbe7fb;
}

.brand-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brand-name {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #111827;
}

.sidebar-top {
  margin-bottom: 16px;
}

.new-chat-btn {
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(180deg, #2f6cf6 0%, #2563eb 100%);
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.26);
  display: flex;
  align-items: center;
  gap: 8px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.new-chat-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.3);
}

.new-chat-plus {
  font-size: 20px;
  line-height: 1;
  display: inline-flex;
  transition: transform 0.24s ease;
}

.new-chat-btn:hover .new-chat-plus {
  transform: rotate(90deg);
}

.sidebar-section-title {
  margin: 0 0 10px;
  padding: 0 8px;
  color: #94a3b8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.sidebar-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
  min-height: 0;
  flex: 1;
  padding-right: 2px;
}

.sidebar-empty {
  padding: 14px 12px;
  border-radius: 12px;
  background: #f8fafc;
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
}

.sidebar-item {
  padding: 11px 10px;
  border-radius: 14px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.sidebar-item:hover {
  background: #f8fafc;
}

.sidebar-item.active {
  background: #edf4ff;
  border-color: #d8e6ff;
}

.sidebar-item-icon {
  padding-top: 2px;
  color: #94a3b8;
  font-size: 16px;
}

.sidebar-item-content {
  flex: 1;
  min-width: 0;
}

.sidebar-item-title {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidebar-item-preview {
  margin-top: 3px;
  color: #94a3b8;
  font-size: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidebar-item-del {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: #cbd5e1;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  margin-top: -1px;
}

.sidebar-item-del:hover {
  background: #fee2e2;
  color: #ef4444;
}

.sidebar-footer {
  padding-top: 14px;
  margin-top: 12px;
  border-top: 1px solid #f1f5f9;
}

.sidebar-footer-btn {
  width: 100%;
  padding: 12px 14px;
  border: none;
  border-radius: 14px;
  background: transparent;
  color: #475569;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;
}

.sidebar-footer-btn:hover {
  background: #f8fafc;
}

@media (max-width: 640px) {
  .chat-sidebar {
    display: none;
  }
}
</style>

