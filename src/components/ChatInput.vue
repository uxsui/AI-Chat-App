<script setup>
import { ref } from 'vue'
import { useChatStore } from '../store/chatStore'

const talk = ref('')
const chatStore = useChatStore()

const submit = async () => {
  const content = talk.value.trim()
  if (!content) return

  await chatStore.sendChatMessage(content)
  talk.value = ''
  document.activeElement?.blur()
}

const cancel = () => {
  chatStore.cancelChat()
}
</script>

<template>
  <div class="input-wrapper">
    <input
      v-model="talk"
      type="text"
      placeholder="问我任何问题..."
      @keyup.enter="submit"
      autocomplete="off"
    />
    <button 
      class="send-btn"
      @click="submit" 
      :disabled="chatStore.isTyping"
    >
      发送
    </button>
    <button
      v-if="chatStore.isTyping"
      class="cancel-btn"
      @click="cancel"
    >
      取消
    </button>
  </div>
</template>

<style scoped>
.input-wrapper {
  position: fixed;
  bottom: 26px;
  left: calc(50% + 138px);
  transform: translateX(-50%);
  width: min(760px, calc(100% - 56px));
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 22px;
  border: 1px solid #e6edf7;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(14px);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.input-wrapper:focus-within {
  border-color: rgba(96, 165, 250, 0.45);
  box-shadow:
    0 18px 42px rgba(15, 23, 42, 0.12),
    0 0 0 4px rgba(219, 234, 254, 0.85);
}

input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  font-size: 15px;
  line-height: 24px;
  color: #111827;
  background: transparent;
}

input::placeholder {
  color: #9ca3af;
}

.send-btn,
.cancel-btn {
  height: 40px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
}

.send-btn {
  padding: 0 14px;
  background: linear-gradient(180deg, #2f6cf6 0%, #2563eb 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.24);
}

.send-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 26px rgba(37, 99, 235, 0.28);
}

.send-btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
  box-shadow: none;
}

.cancel-btn {
  padding: 0 12px;
  background: #fee2e2;
  color: #dc2626;
  font-size: 13px;
  font-weight: 600;
}

.cancel-btn:hover {
  background: #fecaca;
}

@media (max-width: 640px) {
  .input-wrapper {
    bottom: 16px;
    width: calc(100% - 20px);
    padding: 12px 14px;
    gap: 10px;
    left: 50%;
  }

  .send-btn,
  .cancel-btn {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>
