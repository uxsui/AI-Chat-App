<script setup>
import { nextTick, ref, watch } from 'vue';
import { useChatStore } from '../store/chatStore';
import Markdown from 'vue-markdown-render'

const chatStore=useChatStore()
const bottomRef = ref(null)

const scrollToBottom = async () => {
  await nextTick()
  bottomRef.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'end'
  })
}

watch(
  () => chatStore.messages.length,
  () => {
    scrollToBottom()
  },
  { immediate: true }
)


</script>

<template>
  <div class="chat-list">
    <div 
      v-for="msg in chatStore.messages" 
      :key="msg.id" 
      :class="['message-row',msg.role==='user'?'right':'left']">
      <div class="content">
        <Markdown :source="msg.content" />
      </div>
    </div>

    <div v-if="chatStore.loading" class="message-row left">
      <div class="bubble loading-dots">AI 正在思考中...</div>
    </div>

    <div ref="bottomRef" class="chat-bottom-anchor"></div>
  </div>

</template>

<style scoped>
.content {
  line-height: 1.7;
  font-size: 15px;
  text-align: left;
  white-space: normal;
}

.content :deep(*) {
  text-align: left;
}

.content :deep(p),
.content :deep(ul),
.content :deep(ol),
.content :deep(pre),
.content :deep(blockquote) {
  margin: 0;
}

.content :deep(p + p),
.content :deep(p + ul),
.content :deep(p + ol),
.content :deep(ul + p),
.content :deep(ol + p),
.content :deep(pre + p),
.content :deep(p + pre),
.content :deep(ul + pre),
.content :deep(ol + pre) {
  margin-top: 12px;
}

.content :deep(h1),
.content :deep(h2),
.content :deep(h3) {
  margin: 12px 0 8px;
  font-weight: 600;
  line-height: 1.4;
}

.content :deep(ul),
.content :deep(ol) {
  padding-left: 22px;
}

.content :deep(li) {
  margin: 6px 0;
  line-height: 1.75;
}

.content :deep(li > p) {
  margin: 0;
}

.content :deep(pre) {
  padding: 14px 16px;
  border-radius: 14px;
  overflow-x: auto;
  background: #0f172a;
  color: #e2e8f0;
  border: 1px solid rgba(148, 163, 184, 0.16);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  font-size: 13px;
  line-height: 1.7;
  white-space: pre;
}

.content :deep(pre code) {
  display: block;
  padding: 0;
  margin: 0;
  color: inherit;
  background: transparent;
  border: 0;
  border-radius: 0;
  font-size: inherit;
  line-height: inherit;
  white-space: pre;
}

.content :deep(code) {
  padding: 2px 6px;
  border-radius: 6px;
  background: rgba(148, 163, 184, 0.14);
  color: #0f172a;
  font-family: 'Cascadia Code', Consolas, 'Courier New', monospace;
  font-size: 0.92em;
  word-break: break-word;
}

.content :deep(blockquote) {
  padding-left: 12px;
  border-left: 3px solid rgba(59, 130, 246, 0.28);
  color: #475569;
}

.chat-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 100%;
}

.message-row {
  display: flex;
  width: 100%;
}

.right {
  justify-content: flex-end;
}

.left {
  justify-content: flex-start;
}

.content {
  max-width: min(72%, 680px);
  padding: 14px 18px;
  border-radius: 22px;
  word-break: break-word;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
}

.right .content {
  background: linear-gradient(180deg, #dbeafe 0%, #cfe3ff 100%);
  color: #1e3a8a;
  border-bottom-right-radius: 10px;
}

.left .content {
  background: rgba(255, 255, 255, 0.9);
  color: #1f2937;
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-bottom-left-radius: 10px;
}

.loading-dots {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding-right: 20px;
}

.loading-dots::after {
  content: '';
  position: absolute;
  right: 2px;
  top: 50%;
  width: 12px;
  height: 16px;
  border-right: 2px solid rgba(59, 130, 246, 0.7);
  transform: translateY(-50%);
  animation: caret-blink 0.9s steps(1) infinite;
}

@keyframes caret-blink {
  0%,
  49% {
    opacity: 1;
  }

  50%,
  100% {
    opacity: 0;
  }
}

.chat-bottom-anchor {
  width: 100%;
  height: 1px;
}

@media (max-width: 640px) {
  .content {
    max-width: 88%;
    padding: 12px 14px;
    font-size: 14px;
  }
}
</style>
