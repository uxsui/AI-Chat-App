<script setup>
import { RouterLink } from 'vue-router'

const helpSections = [
  {
    title: '怎么使用',
    text: '在聊天输入框中输入你的问题或需求，然后发送消息，系统会在对话区返回回答。'
  },
  {
    title: '历史消息',
    text: '应用会在本地保存最近的对话记录，刷新页面后通常仍可继续查看；如果手动清除本地数据，历史记录也会一并移除。'
  },
  {
    title: '如果回复失败',
    text: '如果页面持续提示请求失败，请检查接口配置、环境变量以及当前使用的模型或密钥是否填写正确。'
  }
]
</script>

<template>
  <div class="page-shell">
    <header class="header">
      <div class="logo-area">
        <span class="avatar">AI</span>
        <div>
          <p class="eyebrow">支持</p>
          <h1 class="title">帮助中心</h1>
        </div>
      </div>
      <RouterLink class="back-link" to="/">回到对话</RouterLink>
    </header>

    <main class="page-container">
      <section class="hero-card">
        <p class="hero-kicker">快速指南</p>
        <h2>常见问题与使用说明</h2>
        <p class="hero-copy">
          这里整理了使用过程中最常见的几个问题，包括如何发送消息、如何查看历史记录，以及请求失败时可以优先检查哪些设置。
        </p>
      </section>

      <section class="grid">
        <article
          v-for="item in helpSections"
          :key="item.title"
          class="info-card"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page-shell {
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
  font-size: 13px;
  font-weight: 700;
}

.eyebrow {
  margin: 0 0 2px;
  font-size: 12px;
  color: #64748b;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.back-link {
  padding: 9px 14px;
  border-radius: 999px;
  color: #475569;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(148, 163, 184, 0.22);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
}

.back-link:hover {
  color: #1d4ed8;
  background: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.page-container {
  width: min(980px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 48px;
}

.hero-card,
.info-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 28px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.hero-card {
  padding: 28px;
  margin-bottom: 20px;
}

.hero-kicker {
  margin: 0 0 10px;
  color: #2563eb;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-card h2 {
  margin: 0;
  font-size: clamp(28px, 4vw, 36px);
  line-height: 1.12;
  color: #0f172a;
}

.hero-copy {
  margin: 14px 0 0;
  max-width: 640px;
  color: #475569;
  font-size: 15px;
  line-height: 1.8;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.info-card {
  padding: 22px;
}

.info-card h3 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #0f172a;
}

.info-card p {
  margin: 0;
  color: #475569;
  line-height: 1.8;
}

@media (max-width: 800px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .header {
    padding: 0 16px;
  }

  .page-container {
    width: calc(100% - 20px);
    padding: 18px 0 32px;
  }

  .hero-card,
  .info-card {
    border-radius: 22px;
  }

  .hero-card {
    padding: 22px 18px;
  }
}
</style>
