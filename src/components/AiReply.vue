<script setup>
defineProps({
    content:String
})

</script>

<template>
    <div class="ai-reply-container">
        <div>豆奶</div>
        <div class="content">
            <p>{{ content }}</p>
        </div>
    </div>

</template>


<style scoped>
/* 消息项容器 */
.message-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
  width: 100%;
}

/* AI 消息：左对齐 */
.ai-message {
  justify-content: flex-start;
}

/* 用户消息：右对齐（你可以单独做一个 UserMessage.vue 用这个样式） */
/* .user-message {
  justify-content: flex-end;
  flex-direction: row-reverse;
} */

/* 头像 */
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0099ff, #00ccff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 153, 255, 0.2);
}

.avatar-icon {
  font-size: 18px;
  color: #fff;
}

/* 气泡容器 */
.bubble {
  max-width: 75%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* 气泡内容 */
.bubble-content {
  background: #f5f7fa;
  padding: 12px 16px;
  border-radius: 18px;
  border-top-left-radius: 4px; /* 豆包专属尖角效果 */
  color: #1a1a1a;
  font-size: 15px;
  line-height: 1.6;
  word-wrap: break-word;
  white-space: pre-wrap;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

/* 可选：用户消息气泡样式（右对齐，蓝色背景） */
/* .user-message .bubble-content {
  background: #0099ff;
  color: #fff;
  border-radius: 18px;
  border-top-right-radius: 4px;
} */
</style>
