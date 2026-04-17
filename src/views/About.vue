<script setup>
import { RouterLink } from 'vue-router'
import logoUrl from '../assets/logo.png'

const highlights = [
  {
    icon: '⚙️',
    title: '核心架构',
    desc: 'Vue 3 + Vite 构建，轻量化实现确保快速响应与流畅体验。'
  },
  {
    icon: '✨',
    title: '交互体验',
    desc: '简洁的对话流程，避免多余动效，让用户聚焦于 AI 内容。'
  },
  {
    icon: '🔒',
    title: '隐私安全',
    desc: '对话记录保存在本地，优先保护你的数据安全。'
  }
]
</script>

<template>
  <div class="about-page">
    <header class="about-header">
      <div class="brand">
        <div class="brand-icon">
          <img :src="logoUrl" alt="豆奶 Logo" class="brand-logo" />
        </div>
        <div>
          <p class="brand-label">关于豆奶</p>
          <h1 class="brand-title">专注简洁交互的轻量化对话应用</h1>
        </div>
      </div>

      <RouterLink class="back-button" to="/">
        返回对话
      </RouterLink>
    </header>

    <main class="about-main">
      <section class="hero-card">
        <span class="hero-badge">项目详情</span>
        <h2 class="hero-heading">
          专注简洁交互的 <span>轻量化对话应用</span>
        </h2>
        <p class="hero-text">
          豆奶（Dounai）是基于 Vue 开发的实验性项目。它剥离复杂 UI 堆砌，旨在提供直观、顺手且响应及时的 AI 对话体验。
        </p>
      </section>

      <section class="highlights-grid">
        <article v-for="item in highlights" :key="item.title" class="highlight-card">
          <div class="highlight-icon">{{ item.icon }}</div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </article>
      </section>

      <section class="feature-panel">
        <div class="panel-copy-area">
          <span class="panel-label">当前版本</span>
          <h3 class="panel-version">v1.0</h3>
          <p class="panel-copy">
            包含基础对话、历史管理和 Markdown 解析能力。这个页面演示了一个简洁、高效的 AI 聊天应用起点。
          </p>
        </div>

        <div class="panel-actions">
          <RouterLink class="primary-button" to="/"> 立即体验</RouterLink>
          <RouterLink class="icon-button" to="/"> 返回首页</RouterLink>
        </div>
      </section>
    </main>

    <footer class="about-footer">
      <p>Designed for Soymilk / 2024</p>
    </footer>
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  background: radial-gradient(circle at top, #ffffff 0%, #f7f9fc 42%, #eef3f8 100%);
  color: #334155;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.about-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding: 18px 28px;
  background: rgba(255, 255, 255, 0.92);
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
  backdrop-filter: blur(16px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 16px;
}

.brand-icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  overflow: hidden;
}

.brand-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-label {
  margin: 0 0 6px;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #64748b;
}

.brand-title {
  margin: 0;
  font-size: clamp(20px, 2.4vw, 28px);
  line-height: 1.08;
  color: #0f172a;
}

.back-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: #ffffff;
  color: #475569;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.back-button:hover {
  transform: translateY(-1px);
  background: #f8fbff;
  color: #1d4ed8;
}

.about-main {
  width: min(1040px, calc(100% - 48px));
  margin: 0 auto;
  padding: 24px 0 40px;
}

.hero-card,
.highlight-card,
.feature-panel {
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.16);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
  border-radius: 28px;
}

.hero-card {
  padding: 32px 32px 36px;
  margin-bottom: 24px;
}

.hero-badge {
  display: inline-flex;
  padding: 8px 14px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.hero-heading {
  margin: 0 0 18px;
  font-size: clamp(32px, 4vw, 44px);
  line-height: 1.03;
  color: #0f172a;
}

.hero-heading span {
  color: #2563eb;
}

.hero-text {
  margin: 0;
  max-width: 700px;
  color: #475569;
  font-size: 15.6px;
  line-height: 1.85;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.highlight-card {
  padding: 24px;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  border: 1px solid rgba(148, 163, 184, 0.12);
}

.highlight-card:hover {
  transform: translateY(-3px);
  border-color: rgba(37, 99, 235, 0.22);
  box-shadow: 0 24px 50px rgba(15, 23, 42, 0.08);
}

.highlight-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
}

.highlight-card h3 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #0f172a;
}

.highlight-card p {
  margin: 0;
  color: #475569;
  line-height: 1.8;
  font-size: 14.8px;
}

.feature-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 28px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #f8fafc;
  position: relative;
  overflow: hidden;
}

.feature-panel::before {
  content: "";
  position: absolute;
  right: -20px;
  top: -20px;
  width: 180px;
  height: 180px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  pointer-events: none;
}

.panel-label {
  display: inline-flex;
  margin-bottom: 12px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.panel-version {
  margin: 0 0 14px;
  font-size: clamp(42px, 4vw, 52px);
  line-height: 0.95;
}

.panel-copy {
  margin: 0;
  max-width: 520px;
  color: rgba(248, 250, 252, 0.92);
  font-size: 15px;
  line-height: 1.8;
}

.panel-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.primary-button,
.icon-button {
  border: none;
  border-radius: 18px;
  padding: 14px 24px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.primary-button {
  background: #ffffff;
  color: #1d4ed8;
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.14);
}

.primary-button:hover {
  background: #f8fafc;
  transform: translateY(-1px);
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 56px;
  background: rgba(255, 255, 255, 0.14);
  color: #f8fafc;
  text-decoration: none;
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: translateY(-1px);
}

.about-footer {
  width: min(1040px, calc(100% - 48px));
  margin: 0 auto 32px;
  padding: 0 0 8px;
  text-align: center;
  color: #667085;
  font-size: 13px;
}

@media (max-width: 960px) {
  .highlights-grid {
    grid-template-columns: 1fr 1fr;
  }

  .feature-panel {
    flex-direction: column;
    align-items: flex-start;
  }

  .panel-copy {
    max-width: 100%;
  }
}

@media (max-width: 680px) {
  .about-header {
    flex-direction: column;
    align-items: stretch;
    padding: 18px 20px;
  }

  .back-button {
    width: 100%;
    justify-content: center;
  }

  .about-main {
    width: calc(100% - 32px);
    padding: 20px 0 32px;
  }

  .highlights-grid {
    grid-template-columns: 1fr;
  }

  .hero-card {
    padding: 24px 20px 28px;
  }

  .feature-panel {
    padding: 24px;
  }
}
</style>
