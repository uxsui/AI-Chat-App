<script setup>
import { RouterLink } from 'vue-router'
import logoUrl from '../assets/logo.png'

const helpItems = [
  {
    icon: '?',
    title: '怎么使用',
    desc: '在聊天输入框中输入你的问题或需求，然后发送消息，系统会在对话区返回回答。'
  },
  {
    icon: '⏱',
    title: '历史消息',
    desc: '应用会在本地保存最近的对话记录，刷新页面后通常仍可继续查看；如果手动清除本地数据，历史记录也会一并移除。'
  },
  {
    icon: '⚠️',
    title: '如果回复失败',
    desc: '如果页面持续提示请求失败，请检查接口配置、环境变量以及当前使用的模型或密钥是否填写正确。'
  }
]
</script>

<template>
  <div class="help-page">
    <header class="help-header">
      <div class="help-brand">
        <div class="brand-icon">
          <img :src="logoUrl" alt="豆奶 Logo" class="brand-logo" />
        </div>
        <div>
          <p class="brand-label">支持中心</p>
          <h1 class="brand-title">帮助中心</h1>
        </div>
      </div>

      <RouterLink class="back-button" to="/">回到对话</RouterLink>
    </header>

    <main class="help-main">
      <section class="hero-card">
        <div class="hero-copy">
          <span class="hero-badge">快速指南</span>
          <h2 class="hero-heading">常见问题与 <span>使用说明</span></h2>
          <p class="hero-text">
            这里整理了使用过程中最常见的几个问题，包括如何发送消息、如何查看历史记录，以及请求失败时可以优先检查哪些设置。
          </p>
        </div>
      </section>

      <section class="help-grid">
        <article v-for="item in helpItems" :key="item.title" class="help-card">
          <div class="help-card-icon">{{ item.icon }}</div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </article>
      </section>
    </main>

    <footer class="help-footer">
      <p>Soymilk Support Center / 2024</p>
    </footer>
  </div>
</template>

<style scoped>
.help-page {
  min-height: 100vh;
  background: radial-gradient(circle at top, #ffffff 0%, #f7f9fc 42%, #eef3f8 100%);
  color: #334155;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.help-header {
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

.help-brand {
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
  padding: 12px 20px;
  border-radius: 24px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: #ffffff;
  color: #475569;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  transition: transform 0.2s ease, background 0.2s ease;
}

.back-button:hover {
  transform: translateY(-1px);
  background: #f8fbff;
}

.help-main {
  width: min(1040px, calc(100% - 48px));
  margin: 0 auto;
  padding: 24px 0 40px;
}

.hero-card {
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 28px;
  padding: 32px 32px 36px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
  margin-bottom: 24px;
}

.hero-card::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  background: linear-gradient(to left, rgba(37, 99, 235, 0.12), transparent);
  pointer-events: none;
}

.hero-badge {
  display: inline-flex;
  padding: 8px 16px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 22px;
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
  line-height: 1.8;
}

.help-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.help-card {
  padding: 24px;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  border: 1px solid rgba(148, 163, 184, 0.12);
  background: #ffffff;
  border-radius: 28px;
}

.help-card:hover {
  transform: translateY(-2px);
  border-color: rgba(37, 99, 235, 0.18);
}

.help-card-icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  margin-bottom: 18px;
  border-radius: 16px;
  background: rgba(37, 99, 235, 0.08);
  color: #2563eb;
  font-size: 1rem;
  font-weight: 700;
}

.help-card h3 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #0f172a;
  font-weight: 700;
}

.help-card p {
  margin: 0;
  color: #475569;
  line-height: 1.8;
  font-size: 14.8px;
}

.help-footer {
  width: min(1040px, calc(100% - 48px));
  margin: 0 auto 32px;
  padding: 0 0 8px;
  text-align: center;
  color: #667085;
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

@media (max-width: 960px) {
  .help-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 680px) {
  .help-header {
    flex-direction: column;
    align-items: stretch;
    padding: 18px 20px;
  }

  .back-button {
    width: 100%;
    justify-content: center;
  }

  .help-main {
    width: calc(100% - 32px);
    padding: 20px 0 32px;
  }

  .help-grid {
    grid-template-columns: 1fr;
  }

  .hero-card {
    padding: 24px 20px 28px;
  }
}
</style>
