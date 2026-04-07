<template>
  <div class="page-container">
    <h2>使用帮助</h2>
    <div class="help-item">
      <h3>如何开始聊天？</h3>
      <p>在底部的输入框输入你想说的话，点击发送或按回车键即可。</p>
    </div>
    <div class="help-item">
      <h3>聊天记录会丢失吗？</h3>
      <p>我们启用了持久化存储，只要不清理浏览器缓存，你的记录都会在。</p>
    </div>
    <router-link to="/">返回聊天</router-link>
  </div>
</template>

<style scoped>
.page-container { padding: 20px; line-height: 1.8; }
.help-item { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
h3 { color: #42b983; }
</style>