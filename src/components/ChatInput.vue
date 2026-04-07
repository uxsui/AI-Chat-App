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
</script>

<template>
  <div class="input-wrapper">
    <input
      v-model="talk"
      type="text"
      placeholder="说点什么..."
      @keyup.enter="submit"
      autocomplete="off"
    />
    <button 
      @click="submit" 
      :disabled="chatStore.isTyping"
    >
      发送
    </button>
  </div>
</template>

<style scoped>
.input-wrapper {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: min(860px, calc(100% - 32px));
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 26px;
  border: 1px solid rgba(226, 232, 240, 0.95);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(14px);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.input-wrapper:focus-within {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow:
    0 14px 34px rgba(15, 23, 42, 0.1),
    0 0 0 4px rgba(191, 219, 254, 0.55);
}

input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  font-size: 15px;
  line-height: 22px;
  color: #111827;
  background: transparent;
}

input::placeholder {
  color: #9ca3af;
}

button {
  padding: 10px 16px;
  border-radius: 999px;
  background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 8px 18px rgba(37, 99, 235, 0.24);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.28);
  filter: brightness(1.02);
}

button:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
  box-shadow: none;
}

@media (max-width: 640px) {
  .input-wrapper {
    bottom: 16px;
    width: calc(100% - 20px);
    padding: 12px 14px;
    gap: 10px;
  }

  button {
    padding: 10px 14px;
  }
}
</style>
