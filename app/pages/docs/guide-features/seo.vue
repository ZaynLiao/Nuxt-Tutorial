<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'use-seo-meta', label: '使用 useSeoMeta' },
            { id: 'social-preview', label: '社群分享預覽' },
            { id: 'dynamic-seo', label: '動態 SEO' },
            { id: 'advanced-head', label: '進階設定 (useHead)' }
        ]
    })

    useHead({
        title: 'SEO 設定 (Meta Tags)',
        meta: [
            { name: 'description', content: '掌握 Nuxt 4 的 SEO 工具：useSeoMeta 與 useHead。輕鬆設定 Open Graph、Twitter Cards 與動態 Meta 標籤。' }
        ]
    })
</script>

<template>
    <TutorialPage title="SEO 設定"
        description="Nuxt 天生對 SEO 友善。透過 SSR，搜尋引擎可以完美讀取你的內容。而 useSeoMeta 則讓管理 Meta Tags 變得前所未有的簡單。"
        :badges="[{ label: 'Core', color: 'primary' }, { label: 'Marketing', color: 'neutral' }]">

        <!-- 1. useSeoMeta -->
        <TutorialSection id="use-seo-meta" title="使用 useSeoMeta" icon="heroicons:magnifying-glass" separator>
            <p>
                這是 Nuxt 推薦的設定方式。它提供了<strong>型別安全 (Type-safe)</strong> 的介面，讓你不需要記憶繁瑣的 HTML meta 標籤名稱。
                Nuxt 會自動將這些設定轉換為標準的 HTML 標籤。
            </p>

            <div class="grid lg:grid-cols-2 gap-8">
                <AppCodeBlock code="<script setup>
useSeoMeta({
  title: '我的 Nuxt 應用',
  description: '這是一個超棒的 Nuxt 4 網站',
  ogTitle: '我的 Nuxt 應用',
  ogDescription: '這是一個超棒的 Nuxt 4 網站',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>" lang="vue" filename="app.vue" />

                <div class="space-y-4">
                    <div class="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
                        <h4 class="font-bold text-white mb-4 flex items-center gap-2">
                            <Icon name="heroicons:code-bracket" class="text-emerald-400" />
                            自動生成的 HTML
                        </h4>
                        <div class="space-y-2 font-mono text-xs text-slate-400">
                            <div class="p-2 bg-slate-950 rounded border border-slate-800/50">
                                &lt;title&gt;我的 Nuxt 應用&lt;/title&gt;
                            </div>
                            <div class="p-2 bg-slate-950 rounded border border-slate-800/50">
                                &lt;meta name="description" content="..."&gt;
                            </div>
                            <div class="p-2 bg-slate-950 rounded border border-slate-800/50">
                                &lt;meta property="og:title" content="..."&gt;
                            </div>
                            <div class="p-2 bg-slate-950 rounded border border-slate-800/50">
                                &lt;meta property="og:image" content="..."&gt;
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Interactive Preview -->
            <div class="mt-8 pt-8 border-t border-slate-800/50">
                <div class="flex items-center gap-2 mb-4">
                    <Icon name="heroicons:eye" class="w-5 h-5 text-amber-400" />
                    <h3 class="font-bold text-white">社群預覽實驗室</h3>
                </div>
                <p class="text-sm text-slate-400 mb-6">
                    設定正確的 Open Graph 標籤對於社群分享至關重要。試著編輯下方的欄位，預覽你的網站在 Facebook 或 Twitter 上的樣子。
                </p>
                <SeoPreview />
            </div>
        </TutorialSection>

        <!-- 2. Social Preview -->
        <TutorialSection id="social-preview" title="社群分享預覽" icon="heroicons:share" separator>
            <p>
                設定正確的 Open Graph (OG) 標籤，能讓你的網站在 Facebook、Twitter (X)、Line 分享時更具吸引力。
            </p>

            <div class="flex justify-center py-8 bg-slate-900/30 rounded-2xl border border-slate-800/50">
                <!-- Mock Social Card -->
                <div class="w-full max-w-md bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    <!-- Image Placeholder -->
                    <div class="h-48 bg-slate-900 relative group overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                            <Icon name="logos:nuxt-icon" class="w-1/2 h-1/2 grayscale" />
                        </div>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <span class="text-slate-600 text-sm font-mono">og:image (1200x630)</span>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-4 bg-slate-900 border-t border-slate-800">
                        <div class="text-xs text-slate-500 uppercase tracking-wider mb-1">EXAMPLE.COM</div>
                        <h3 class="text-base font-bold text-slate-200 mb-1 truncate">我的 Nuxt 應用 - 最棒的教學</h3>
                        <p class="text-sm text-slate-400 line-clamp-2">
                            這是一個超棒的 Nuxt 4 網站，我們致力於提供最優質的教學內容，讓開發者能快速上手...
                        </p>
                    </div>
                </div>
            </div>

            <div class="grid sm:grid-cols-3 gap-4 mt-6">
                <div class="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/20 text-center">
                    <div class="text-emerald-400 font-bold mb-1">og:title</div>
                    <div class="text-xs text-emerald-200/60">標題，通常與網頁標題一致</div>
                </div>
                <div class="p-4 rounded-xl bg-sky-950/10 border border-sky-500/20 text-center">
                    <div class="text-sky-400 font-bold mb-1">og:description</div>
                    <div class="text-xs text-sky-200/60">簡短描述，吸引使用者點擊</div>
                </div>
                <div class="p-4 rounded-xl bg-amber-950/10 border border-amber-500/20 text-center">
                    <div class="text-amber-400 font-bold mb-1">og:image</div>
                    <div class="text-xs text-amber-200/60">縮圖，建議尺寸 1200x630</div>
                </div>
            </div>
        </TutorialSection>

        <!-- 3. Dynamic SEO -->
        <TutorialSection id="dynamic-seo" title="動態 SEO" icon="heroicons:variable" separator>
            <p>
                在實際專案中，SEO 資訊通常來自 API (例如文章標題、產品名稱)。
                <code class="text-emerald-400">useSeoMeta</code> 支援響應式資料，當資料更新時，Meta Tags 也會自動更新。
            </p>

            <div class="grid lg:grid-cols-2 gap-8">
                <AppCodeBlock code="<script setup>
// 1. 從 API 取得資料
const { data: article } = await useFetch('/api/article/1')

// 2. 使用 Computed 或直接傳入 Ref
useSeoMeta({
  title: () => article.value?.title,
  description: () => article.value?.summary,
  ogImage: () => article.value?.coverImage
})
</script>" lang="vue" filename="pages/articles/[id].vue" />

                <div class="space-y-4">
                    <div class="p-4 rounded-xl bg-amber-950/10 border border-amber-500/20 flex items-start gap-3">
                        <Icon name="heroicons:light-bulb" class="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div class="text-sm text-amber-200/80">
                            <strong class="block mb-1 text-amber-400">為什麼要用箭頭函式？</strong>
                            <p>
                                <code class="font-mono">() => value</code> 能確保當 <code class="font-mono">article</code>
                                資料非同步載入完成後，SEO 標籤能重新計算並更新。如果直接傳值，可能會拿到 <code class="font-mono">undefined</code>。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- 4. Advanced (useHead) -->
        <TutorialSection id="advanced-head" title="進階設定 (useHead)" icon="heroicons:adjustments-horizontal">
            <p>
                雖然 <code class="text-emerald-400">useSeoMeta</code> 涵蓋了 90% 的需求，但如果你需要插入
                <code class="text-slate-300">&lt;script&gt;</code> (如 Google Analytics) 或
                <code class="text-slate-300">&lt;style&gt;</code>，則需要使用 <code class="text-emerald-400">useHead</code>。
            </p>

            <AppCodeBlock code="<script setup>
useHead({
  // 設定網頁標題模板
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - My Site Name` : 'My Site Name';
  },
  // 插入外部腳本
  script: [
    {
      src: 'https://analytics.example.com/script.js',
      async: true,
      tagPosition: 'bodyClose' // 放在 </body> 之前
    }
  ],
  // 設定 HTML 屬性
  htmlAttrs: {
    lang: 'zh-TW'
  }
})
</script>" lang="vue" filename="app.vue" />
        </TutorialSection>

    </TutorialPage>
</template>
