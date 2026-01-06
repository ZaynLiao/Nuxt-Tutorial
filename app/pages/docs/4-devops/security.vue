<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'validation', label: '資料驗證 (Zod)' },
            { id: 'headers', label: '安全性標頭' },
            { id: 'env-safety', label: '環境變數安全' }
        ]
    })

    useHead({
        title: '安全性 (Security)',
        meta: [
            { name: 'description', content: 'Nuxt 4 安全性指南：使用 Zod 驗證 API 輸入、設定 HTTP 安全性標頭，以及保護敏感的環境變數。' }
        ]
    })
</script>

<template>
    <TutorialPage title="安全性 (Security)" description="安全性不是附加功能，而是開發的基礎。本章將介紹如何在 Nuxt 應用程式中實作輸入驗證、設定安全標頭，並保護您的敏感資料。"
        :badges="[{ label: 'Zod', color: 'primary' }, { label: 'OWASP', color: 'neutral' }]">

        <!-- Section 1: Validation -->
        <TutorialSection id="validation" title="資料驗證 (Zod)" icon="heroicons:shield-check" separator>
            <p class="text-slate-400 leading-relaxed mb-6">
                永遠不要信任客戶端的輸入。我們推薦使用 <strong class="text-emerald-400">Zod</strong> 來驗證 API 請求的 Body 與 Query Parameters。
            </p>

            <AppCodeBlock language="bash" :code="`pnpm add zod h3-zod`" filename="Terminal" />

            <p class="text-slate-400 my-4">
                在 Server Handler 中使用：
            </p>

            <AppCodeBlock language="typescript" :code="`import { z } from 'zod'

const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  age: z.number().min(18)
})

export default defineEventHandler(async (event) => {
  // readValidatedBody 會自動驗證並拋出 400 錯誤
  const body = await readValidatedBody(event, (body) => userSchema.parse(body))
  
  return { success: true, user: body }
})`" filename="server/api/register.post.ts" />
        </TutorialSection>

        <!-- Section 2: Headers -->
        <TutorialSection id="headers" title="安全性標頭" icon="heroicons:lock-closed" separator>
            <p class="text-slate-400 mb-6">
                設定適當的 HTTP Headers 可以防禦 XSS、Clickjacking 等攻擊。您可以使用 <code class="text-emerald-400">nuxt-security</code>
                模組，或在 <code class="text-emerald-400">nuxt.config.ts</code> 中手動設定。
            </p>

            <AppCodeBlock language="typescript" :code="`export default defineNuxtConfig({
  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      }
    }
  }
})`" filename="nuxt.config.ts" />
        </TutorialSection>

        <!-- Section 3: Env Safety -->
        <TutorialSection id="env-safety" title="環境變數安全" icon="heroicons:key" separator>
            <p class="text-slate-400 mb-6">
                再次強調，<strong>絕對不要</strong>將私鑰 (Private Keys) 放入 <code class="text-emerald-400">public</code> runtime
                config 中。
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div class="flex items-center gap-2 mb-2 text-red-400 font-bold">
                        <Icon name="heroicons:x-circle" class="w-5 h-5" />
                        <span>危險做法 (Don't)</span>
                    </div>
                    <pre class="text-xs text-slate-300 font-mono overflow-x-auto">
runtimeConfig: {
  public: {
    // ❌ 這會暴露給瀏覽器！
    stripeSecret: 'sk_live_...'
  }
}</pre>
                </div>

                <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div class="flex items-center gap-2 mb-2 text-emerald-400 font-bold">
                        <Icon name="heroicons:check-circle" class="w-5 h-5" />
                        <span>正確做法 (Do)</span>
                    </div>
                    <pre class="text-xs text-slate-300 font-mono overflow-x-auto">
runtimeConfig: {
  // ✅ 僅限伺服器端存取
  stripeSecret: 'sk_live_...',
  public: {
    apiBase: '/api'
  }
}</pre>
                </div>
            </div>
        </TutorialSection>

    </TutorialPage>
</template>