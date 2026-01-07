<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'setup', label: '安裝與設定' },
            { id: 'usage', label: '基本用法' },
            { id: 'routing', label: '路由策略' },
            { id: 'seo', label: 'SEO 支援' }
        ]
    })

    useHead({
        title: '多語言 (i18n)',
        meta: [
            { name: 'description', content: 'Nuxt 4 多語言教學：使用 @nuxtjs/i18n 實現國際化，包含路由切換、翻譯檔管理與 SEO 優化。' }
        ]
    })
</script>

<template>
    <DocsPage title="多語言 (i18n)"
        description="在全球化的時代，支援多語言是必備功能。Nuxt 官方提供了 @nuxtjs/i18n 模組，讓國際化 (Internationalization) 變得簡單且強大。"
        :badges="[{ label: 'Localization', color: 'primary' }, { label: 'SEO Ready', color: 'neutral' }]">

        <!-- Section 1: Setup -->
        <DocsSection id="setup" title="安裝與設定" icon="heroicons:wrench-screwdriver" separator>
            <p class="text-slate-400 mb-6">
                首先安裝 <code class="text-emerald-400">@nuxtjs/i18n</code> 模組。
            </p>

            <UiCodeBlock language="bash" :code="`pnpm add @nuxtjs/i18n`" filename="Terminal" />

            <p class="text-slate-400 my-4">
                在 <code class="text-emerald-400">nuxt.config.ts</code> 中進行配置：
            </p>

            <UiCodeBlock language="typescript" :code="`export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'zh', iso: 'zh-TW', name: '繁體中文', file: 'zh.json' }
    ],
    defaultLocale: 'zh',
    strategy: 'prefix_except_default', // 預設語言不加前綴，其他語言加 /en
    lazy: true, // 懶加載翻譯檔
    langDir: 'locales', // 翻譯檔目錄
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  }
})`" filename="nuxt.config.ts" />
        </DocsSection>

        <!-- Section 2: Usage -->
        <DocsSection id="usage" title="基本用法" icon="heroicons:language" separator>
            <p class="text-slate-400 mb-6">
                在 Vue 元件中，使用 <code class="text-emerald-400">$t</code> 函數來顯示翻譯內容。
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div class="text-xs font-mono text-slate-500 mb-2">locales/zh.json</div>
                    <UiCodeBlock language="json" :code="`{
  &quot;welcome&quot;: &quot;歡迎來到 Nuxt&quot;,
  &quot;about&quot;: &quot;關於我們&quot;
}`" filename="JSON" />
                </div>
                <div>
                    <div class="text-xs font-mono text-slate-500 mb-2">app.vue</div>
                    <UiCodeBlock language="vue" :code="`<template>
  <h1>{{ $t('welcome') }}</h1>
  
  <!-- 切換語言按鈕 -->
  <NuxtLink :to=&quot;switchLocalePath('en')&quot;>
    English
  </NuxtLink>
</template>

<script setup>
const { locale, setLocale } = useI18n()
</script>`" filename="Vue" />
                </div>
            </div>
        </DocsSection>

        <!-- Section 3: Routing -->
        <DocsSection id="routing" title="路由策略" icon="heroicons:map" separator>
            <p class="text-slate-400 mb-6">
                <code class="text-emerald-400">@nuxtjs/i18n</code> 會自動為您產生多語言路由。
            </p>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm text-slate-400">
                    <thead class="bg-slate-900/50 text-slate-200 font-medium">
                        <tr>
                            <th class="p-3 rounded-tl-lg">URL</th>
                            <th class="p-3">Locale</th>
                            <th class="p-3 rounded-tr-lg">說明</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800/50">
                        <tr>
                            <td class="p-3 font-mono text-emerald-400">/</td>
                            <td class="p-3">zh (Default)</td>
                            <td class="p-3">預設語言首頁</td>
                        </tr>
                        <tr>
                            <td class="p-3 font-mono text-emerald-400">/about</td>
                            <td class="p-3">zh</td>
                            <td class="p-3">預設語言內頁</td>
                        </tr>
                        <tr>
                            <td class="p-3 font-mono text-blue-400">/en</td>
                            <td class="p-3">en</td>
                            <td class="p-3">英文版首頁</td>
                        </tr>
                        <tr>
                            <td class="p-3 font-mono text-blue-400">/en/about</td>
                            <td class="p-3">en</td>
                            <td class="p-3">英文版內頁</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </DocsSection>

        <!-- Section 4: SEO -->
        <DocsSection id="seo" title="SEO 支援" icon="heroicons:globe-alt" separator>
            <p class="text-slate-400 mb-6">
                模組會自動為每個頁面注入正確的 <code class="text-slate-300">hreflang</code> 標籤，這對於多語言網站的 SEO 至關重要。
            </p>

            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800/50">
                <h4 class="text-white font-medium mb-2 text-sm">Generated Head Tags</h4>
                <pre class="text-xs text-slate-400 font-mono overflow-x-auto">
            &lt;link rel="alternate" href="https://example.com/" hreflang="zh-TW" /&gt;
            &lt;link rel="alternate" href="https://example.com/en" hreflang="en-US" /&gt;
            &lt;link rel="canonical" href="https://example.com/" /&gt;</pre>
            </div>
        </DocsSection>

    </DocsPage>
</template>