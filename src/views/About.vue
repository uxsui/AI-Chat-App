<script setup>
import { RouterLink } from 'vue-router'

const highlights = [
  '基于 Vue 3、Vite、Pinia 和 Vue Router 构建',
  '轻量化聊天界面，专注清爽易用的对话体验',
  '本地保存对话记录，刷新页面后也能继续查看历史内容'
]
</script>

<template>
  <div class="page-shell">
    <header class="header">
      <div class="logo-area">
        <span class="avatar">AI</span>
        <div>
          <p class="eyebrow">项目介绍</p>
          <h1 class="title">关于应用</h1>
        </div>
      </div>
      <RouterLink class="back-link" to="/">返回对话</RouterLink>
    </header>

    <main class="page-container">
      <section class="hero-card">
        <p class="hero-kicker">AI 智能对话助手</p>
        <h2>专注简洁交互的轻量化对话应用</h2>
        <p class="hero-copy">
          这是一个基于 Vue 开发的轻量级 AI 聊天应用，强调直观、顺手、响应快的使用体验。
          页面布局清晰，支持连续对话与历史记录保留，适合日常问答、内容整理和灵感记录等场景。
        </p>
      </section>

      <section class="content-grid">
        <article class="info-card">
          <span class="label">版本</span>
          <strong>1.0</strong>
          <p>当前版本已包含聊天主页、帮助中心和关于页面等基础模块，整体结构清晰，适合作为 AI 对话应用的前端起点。</p>
        </article>

        <article class="info-card">
          <span class="label">项目亮点</span>
          <ul>
            <li v-for="item in highlights" :key="item">{{ item }}</li>
          </ul>
        </article>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* 样式保持不变，只调整页面文案 */
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
  max-width: 680px;
  color: #475569;
  font-size: 15px;
  line-height: 1.8;
}

.content-grid {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 16px;
}

.info-card {
  padding: 22px;
}

.label {
  display: inline-block;
  margin-bottom: 12px;
  color: #2563eb;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.info-card strong {
  display: block;
  margin-bottom: 8px;
  font-size: 28px;
  color: #0f172a;
}

.info-card p,
.info-card li {
  color: #475569;
  line-height: 1.8;
}

.info-card p {
  margin: 0;
}

.info-card ul {
  margin: 0;
  padding-left: 20px;
}

.info-card li + li {
  margin-top: 8px;
}

@media (max-width: 800px) {
  .content-grid {
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
