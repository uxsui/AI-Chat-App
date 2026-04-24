<script setup>
import { computed, nextTick, ref, watch, onMounted } from 'vue';
import { useChatStore } from '../store/chatStore';
import Markdown from 'vue-markdown-render'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import logoUrl from '../assets/logo.png'

const props = defineProps({
  searchKeyword: {
    type: String,
    default: ''
  }
})

const chatStore=useChatStore()
const bottomRef = ref(null)
const chatListRef = ref(null)

const scrollToBottom = async () => {
  await nextTick()
  bottomRef.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'end'
  })
}

// 应用代码高亮
const highlightCode = async () => {
  await nextTick()
  if (chatListRef.value) {
    const codeBlocks = chatListRef.value.querySelectorAll('pre code')
    codeBlocks.forEach(block => {
      if (!block.classList.contains('hljs')) {
        hljs.highlightElement(block)
      }
    })
  }
}

// 搜索高亮功能
const highlightSearchKeyword = async () => {
  await nextTick()
  if (!chatListRef.value || !props.searchKeyword.trim()) {
    // 清除之前的高亮
    const highlighted = chatListRef.value?.querySelectorAll('.search-highlight')
    highlighted?.forEach(el => {
      const parent = el.parentNode
      const text = el.textContent
      const textNode = document.createTextNode(text)
      parent.replaceChild(textNode, el)
      parent.normalize()
    })
    return
  }

  const keyword = props.searchKeyword.trim()
  const regex = new RegExp(`(${keyword})`, 'gi')
  
  const walker = document.createTreeWalker(
    chatListRef.value,
    NodeFilter.SHOW_TEXT,
    null,
    false
  )

  const nodesToReplace = []
  let node
  while (node = walker.nextNode()) {
    if (regex.test(node.textContent)) {
      nodesToReplace.push(node)
    }
  }

  nodesToReplace.forEach(node => {
    const fragment = document.createDocumentFragment()
    const parts = node.textContent.split(new RegExp(`(${keyword})`, 'gi'))
    
    parts.forEach(part => {
      if (part.toLowerCase() === keyword.toLowerCase()) {
        const mark = document.createElement('mark')
        mark.className = 'search-highlight'
        mark.textContent = part
        fragment.appendChild(mark)
      } else if (part) {
        fragment.appendChild(document.createTextNode(part))
      }
    })
    
    node.parentNode.replaceChild(fragment, node)
  })
}

// 流式逐字更新时，最后一条消息 content 会频繁变化；用 rAF 合并滚动，避免抖动/卡顿。
let rafId = null
const scheduleScroll = () => {
  if (rafId) return
  rafId = window.requestAnimationFrame(() => {
    rafId = null
    scrollToBottom()
    highlightCode()
  })
}

const lastContent = computed(() => {
  const msgs = chatStore.currentMessages
  return msgs?.[msgs.length - 1]?.content
})

watch(lastContent, () => scheduleScroll(), { immediate: true })

watch(() => props.searchKeyword, () => {
  highlightSearchKeyword()
})

onMounted(() => {
  highlightCode()
})


</script>

<template>
  <div class="chat-list" ref="chatListRef">
    <div 
      v-for="msg in chatStore.currentMessages" 
      :key="msg.id" 
      :class="['message-row',msg.role==='user'?'right':'left']">
      <div v-if="msg.role === 'ai'" class="message-avatar">
        <img :src="logoUrl" alt="豆奶 AI logo" class="message-avatar-logo" />
      </div>
      <div class="message-body">
        <div class="content">
          <Markdown :source="msg.content" />
        </div>
      </div>
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
  gap: 28px;
  min-height: 100%;
  width: min(980px, calc(100% - 48px));
  margin: 0 auto;
  padding: 8px 0 220px;
  box-sizing: border-box;
}

.message-row {
  display: flex;
  width: 100%;
  gap: 14px;
  align-items: flex-start;
}

.right {
  justify-content: flex-end;
}

.left {
  justify-content: flex-start;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  background: linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%);
  border: 1px solid #dbe7fb;
}

.message-avatar-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right .message-avatar {
  display: none;
}

.message-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: min(78%, 760px);
}

.right .message-body {
  align-items: flex-end;
}

.content {
  width: 100%;
  padding: 16px 18px;
  border-radius: 22px;
  word-break: break-word;
  box-sizing: border-box;
}

.right .content {
  background: linear-gradient(180deg, #2f6cf6 0%, #2563eb 100%);
  color: #ffffff;
  border-bottom-right-radius: 8px;
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.2);
}

.left .content {
  background: #ffffff;
  color: #1f2937;
  border: 1px solid #e8eef6;
  border-bottom-left-radius: 8px;
  box-shadow: 0 8px 26px rgba(15, 23, 42, 0.05);
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
  scroll-margin-bottom: 220px;
}

/* 搜索高亮样式 */
.search-highlight {
  background-color: #fef08a;
  color: #0f172a;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: 600;
  box-shadow: 0 0 0 2px rgba(254, 240, 138, 0.5);
}

.right .search-highlight {
  background-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
  box-shadow: none;
}

@media (max-width: 640px) {
  .chat-list {
    width: calc(100% - 20px);
    padding-bottom: 156px;
  }

  .message-body {
    max-width: 90%;
  }

  .content {
    padding: 12px 14px;
    font-size: 14px;
  }
}
</style>
