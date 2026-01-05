<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'components', label: 'SEO 元件' },
            { id: 'composable', label: 'useSeoMeta (推薦)' },
            { id: 'preview', label: '社群預覽' }
        ]
    })

    useHead({
        title: 'SEO 元件',
        meta: [
            { name: 'description', content: 'Nuxt SEO 元件教學：使用 <Title>, <Meta> 管理標頭資訊，以及為何推薦使用 useSeoMeta 來自動處理 Open Graph 與 Twitter Card。' }
        ]
    })
</script>

<template>
    <TutorialPage title="SEO 元件"
        description="Nuxt 提供了完整的 SEO 支援。你可以使用元件或 Composable 來管理 <head> 標籤，確保網站在搜尋引擎與社群媒體上的呈現效果。"
        :badges="[{ label: 'Search Engine', color: 'primary' }, { label: 'Social Share', color: 'neutral' }]">

        <!-- 1. Components -->
        <TutorialSection id="components" title="SEO 元件" icon="heroicons:code-bracket" separator>
            <p>
                Nuxt 提供了 <code class="text-emerald-400">&lt;Title&gt;</code>, <code
                    class="text-emerald-400">&lt;Meta&gt;</code>,
                <code class="text-emerald-400">&lt;Link&gt;</code> 等元件，讓你直接在 Template 中定義 Head 資訊。
                這對於習慣寫 HTML 的開發者來說很直觀。
            </p>

            <AppCodeBlock code="<template>
  <div>
    <Head>
      <Title>我的 Nuxt 應用</Title>
      <Meta name=&quot;description&quot; content=&quot;這是一個很棒的網站&quot; />
      <Link rel=&quot;icon&quot; href=&quot;/favicon.ico&quot; />
    </Head>
  </div>
</template>" lang="vue" />
        </TutorialSection>

        <!-- 2. useSeoMeta -->
        <TutorialSection id="composable" title="useSeoMeta (推薦)" icon="heroicons:sparkles" separator>
            <p>
                相比於元件，官方更推薦使用 <code class="text-emerald-400">useSeoMeta</code>。
                它提供了完整的 TypeScript 支援，並且能自動處理 Open Graph (OG) 與 Twitter Card 的重複標籤，讓你少寫一半的程式碼。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <div class="text-sm font-bold text-slate-400">The Old Way (Verbose)</div>
                    <AppCodeBlock code="<Head>
  <Title>My App</Title>
  <Meta name=&quot;description&quot; content=&quot;...&quot; />
  <Meta property=&quot;og:title&quot; content=&quot;My App&quot; />
  <Meta property=&quot;og:description&quot; content=&quot;...&quot; />
  <Meta name=&quot;twitter:title&quot; content=&quot;My App&quot; />
  <Meta name=&quot;twitter:description&quot; content=&quot;...&quot; />
</Head>" lang="vue" />
                </div>

                <div class="space-y-4">
                    <div class="text-sm font-bold text-emerald-400">The Nuxt Way (Concise)</div>
                    <AppCodeBlock code="<script setup>
useSeoMeta({
  title: 'My App',
  description: '...',
  // 自動產生 og:title, twitter:title
  // 自動產生 og:description, twitter:description
  ogImage: 'https://example.com/image.png'
})
</script>" lang="ts" />
                </div>
            </div>
        </TutorialSection>

        <!-- 3. Preview -->
        <TutorialSection id="preview" title="社群預覽" icon="heroicons:share">
            <p>
                設定好 SEO 標籤後，你的網站在被分享到 Facebook、Twitter 或 Discord 時，就會顯示漂亮的預覽卡片。
            </p>

            <AppWindow title="Social Media Preview" icon="heroicons:chat-bubble-left-right" class="w-full">
                <div class="p-8 bg-slate-950 flex justify-center">
                    <!-- Card Preview -->
                    <div
                        class="w-full max-w-md bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                        <!-- Image -->
                        <div class="h-48 bg-slate-800 relative overflow-hidden group">
                            <div class="absolute inset-0 bg-gradient-to-br from-emerald-900 to-slate-900"></div>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <Icon name="logos:nuxt-icon"
                                    class="w-20 h-20 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="p-4 space-y-2">
                            <div class="text-xs text-slate-500 uppercase font-bold">example.com</div>
                            <div class="font-bold text-slate-200 text-lg leading-tight">
                                Nuxt 4 Tutorial: Master the Framework
                            </div>
                            <div class="text-sm text-slate-400 line-clamp-2">
                                Learn how to build modern web applications with Nuxt 4. Covers routing, state
                                management, SEO,
                                and more.
                            </div>
                        </div>
                    </div>
                </div>
            </AppWindow>
        </TutorialSection>

    </TutorialPage>
</template>
