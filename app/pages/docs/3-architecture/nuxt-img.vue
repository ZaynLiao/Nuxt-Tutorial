<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'installation', label: '安裝與設定' },
            { id: 'basic-usage', label: '基本用法' },
            { id: 'features', label: '核心功能' },
            { id: 'providers', label: '圖片服務商' }
        ]
    })

    useHead({
        title: 'Nuxt Image',
        meta: [
            { name: 'description', content: 'Nuxt Image 完整教學：自動化圖片優化、格式轉換、響應式圖片與 Lazy Loading 設定。' }
        ]
    })

    const installCode = `npx nuxi@latest module add image`

    const configCode = `export default defineNuxtConfig({
  modules: ['@nuxt/image'],
  image: {
    // 設定預設選項
    format: ['webp'],
    quality: 80,
  }
})`

    const usageCode = `<template>
  <!-- 自動轉換為 WebP 並調整大小 -->
  <NuxtImg 
    src="/photos/mountain.jpg" 
    width="800" 
    height="500"
    format="webp"
    loading="lazy"
    class="rounded-lg shadow-lg"
  />
</template>`

    const providerCode = `export default defineNuxtConfig({
  image: {
    // 使用 Unsplash 作為圖片來源
    domains: ['images.unsplash.com'],
    
    // 或者設定專屬 Provider (如 Cloudinary)
    provider: 'cloudinary',
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/my-cloud/image/upload/'
    }
  }
})`
</script>

<template>
    <TutorialPage title="Nuxt Image"
        description="圖片通常是網頁載入速度的瓶頸。Nuxt Image 提供了一套自動化的解決方案，能即時調整圖片大小、壓縮並轉換格式，大幅提升 Core Web Vitals 分數。"
        :badges="[{ label: 'Performance', color: 'emerald' }, { label: 'UX', color: 'primary' }]">

        <!-- 1. Installation -->
        <TutorialSection id="installation" title="安裝與設定" icon="heroicons:arrow-down-tray" separator>
            <p class="text-slate-400 mb-4">
                Nuxt Image 是一個官方模組，安裝非常簡單。請在終端機執行以下指令：
            </p>

            <div class="space-y-4">
                <AppCodeBlock filename="Terminal" :code="installCode" lang="sh" />

                <p class="text-slate-400 text-sm">
                    安裝完成後，系統會自動更新 <code class="text-slate-300">package.json</code>。接著，您需要在 <code
                        class="text-slate-300">nuxt.config.ts</code> 中註冊模組並進行全域設定：
                </p>

                <AppCodeBlock filename="nuxt.config.ts" :code="configCode" lang="typescript" />
            </div>
        </TutorialSection>

        <!-- 2. Basic Usage -->
        <TutorialSection id="basic-usage" title="基本用法" icon="heroicons:code-bracket" separator>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <p class="text-slate-400 mb-4">
                        使用 <code class="text-emerald-400">&lt;NuxtImg&gt;</code> 元件取代原生的 <code
                            class="text-slate-300">&lt;img&gt;</code> 標籤。
                        它會自動生成最佳化的圖片 URL。
                    </p>
                    <ul class="space-y-2 text-slate-400 text-sm mb-6">
                        <li class="flex items-center gap-2">
                            <Icon name="heroicons:check-circle" class="text-emerald-400 w-5 h-5" />
                            <span>自動轉換為 WebP/AVIF</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <Icon name="heroicons:check-circle" class="text-emerald-400 w-5 h-5" />
                            <span>自動調整尺寸 (Resize)</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <Icon name="heroicons:check-circle" class="text-emerald-400 w-5 h-5" />
                            <span>內建 Lazy Loading</span>
                        </li>
                    </ul>
                </div>

                <AppCodeBlock filename="app.vue" :code="usageCode" lang="vue" />
            </div>
        </TutorialSection>

        <!-- 3. Features Visualization -->
        <TutorialSection id="features" title="核心功能" icon="heroicons:sparkles" separator>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Feature 1: Format -->
                <div
                    class="p-6 rounded-2xl bg-slate-950 border border-slate-800/50 flex flex-col items-center text-center">
                    <div class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                        <Icon name="heroicons:photo" class="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 class="text-slate-200 font-bold mb-2">格式轉換</h3>
                    <p class="text-slate-400 text-xs">
                        自動將 JPG/PNG 轉換為更輕量的 <span class="text-blue-400">WebP</span> 或 <span
                            class="text-blue-400">AVIF</span>，減少檔案大小達 50% 以上。
                    </p>
                </div>

                <!-- Feature 2: Resize -->
                <div
                    class="p-6 rounded-2xl bg-slate-950 border border-slate-800/50 flex flex-col items-center text-center">
                    <div class="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                        <Icon name="heroicons:arrows-pointing-in" class="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 class="text-slate-200 font-bold mb-2">尺寸優化</h3>
                    <p class="text-slate-400 text-xs">
                        根據螢幕大小自動提供合適尺寸的圖片，避免在手機上載入 4K 大圖。
                    </p>
                </div>

                <!-- Feature 3: Lazy Load -->
                <div
                    class="p-6 rounded-2xl bg-slate-950 border border-slate-800/50 flex flex-col items-center text-center">
                    <div class="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                        <Icon name="heroicons:clock" class="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 class="text-slate-200 font-bold mb-2">延遲載入</h3>
                    <p class="text-slate-400 text-xs">
                        預設啟用 Lazy Loading，只有當圖片進入視窗範圍時才開始下載，加快首屏載入速度。
                    </p>
                </div>
            </div>
        </TutorialSection>

        <!-- 4. Providers -->
        <TutorialSection id="providers" title="圖片服務商 (Providers)" icon="heroicons:server-stack">
            <p class="text-slate-400 mb-6">
                Nuxt Image 支援多種圖片來源與 CDN。除了預設的本地 IPX 處理器外，也支援第三方服務。
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div
                    class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center gap-3 hover:border-slate-600 transition-colors">
                    <Icon name="simple-icons:vercel" class="w-8 h-8 text-white" />
                    <span class="text-slate-300 text-sm font-medium">Vercel</span>
                </div>
                <div
                    class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center gap-3 hover:border-slate-600 transition-colors">
                    <Icon name="simple-icons:netlify" class="w-8 h-8 text-teal-400" />
                    <span class="text-slate-300 text-sm font-medium">Netlify</span>
                </div>
                <div
                    class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center gap-3 hover:border-slate-600 transition-colors">
                    <Icon name="simple-icons:cloudinary" class="w-8 h-8 text-blue-500" />
                    <span class="text-slate-300 text-sm font-medium">Cloudinary</span>
                </div>
            </div>

            <AppCodeBlock filename="nuxt.config.ts" :code="providerCode" lang="typescript" />
        </TutorialSection>

    </TutorialPage>
</template>
