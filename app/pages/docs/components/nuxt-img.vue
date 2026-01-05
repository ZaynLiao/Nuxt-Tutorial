<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'install', label: '安裝模組' },
            { id: 'usage', label: '基本用法' },
            { id: 'responsive', label: '響應式圖片' },
            { id: 'providers', label: '圖片服務商' }
        ]
    })

    useHead({
        title: 'NuxtImg 圖片優化',
        meta: [
            { name: 'description', content: 'NuxtImg 元件教學：自動圖片優化、格式轉換 (WebP)、響應式尺寸設定 (sizes) 與 Lazy Loading。' }
        ]
    })
</script>

<template>
    <TutorialPage title="NuxtImg 圖片優化"
        description="Nuxt Image 是官方提供的圖片優化模組，能自動調整大小、轉換格式 (WebP/Avif) 並支援 Lazy Loading，大幅提升網站效能 (LCP)。"
        :badges="[{ label: 'Performance', color: 'primary' }, { label: 'Module', color: 'neutral' }]">

        <!-- 1. Concept: Optimization -->
        <TutorialSection id="concept" title="核心概念" icon="heroicons:sparkles" separator>
            <p>
                為什麼需要 <code class="text-emerald-400">&lt;NuxtImg&gt;</code>？因為未優化的圖片是網頁效能的殺手。
                Nuxt Image 自動幫你處理了最繁瑣的部分。
            </p>

            <AppWindow title="Optimization Pipeline" icon="heroicons:cog-6-tooth" class="w-full">
                <div class="p-8 bg-slate-950 flex flex-col md:flex-row items-center justify-between gap-8">
                    <!-- Input -->
                    <div class="flex flex-col items-center gap-2">
                        <div
                            class="w-20 h-24 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center relative">
                            <div class="absolute top-2 right-2 text-xs font-bold text-red-400">JPG</div>
                            <Icon name="heroicons:photo" class="w-10 h-10 text-slate-500" />
                        </div>
                        <div class="text-xs text-red-400 font-mono">2.5 MB</div>
                    </div>

                    <!-- Magic -->
                    <div class="flex-1 flex items-center justify-center relative w-full">
                        <div class="h-0.5 w-full bg-slate-800 absolute"></div>
                        <div
                            class="w-12 h-12 bg-emerald-900 rounded-full border border-emerald-500 flex items-center justify-center z-10 shadow-lg shadow-emerald-500/30">
                            <Icon name="heroicons:wand-and-rays" class="w-6 h-6 text-emerald-400" />
                        </div>
                        <div class="absolute -bottom-6 text-xs text-slate-500 uppercase tracking-wider">Resize &
                            Compress</div>
                    </div>

                    <!-- Output -->
                    <div class="flex flex-col items-center gap-2">
                        <div
                            class="w-20 h-24 bg-slate-800 border border-emerald-500/50 rounded-lg flex items-center justify-center relative shadow-lg shadow-emerald-500/10">
                            <div class="absolute top-2 right-2 text-xs font-bold text-emerald-400">WebP</div>
                            <Icon name="heroicons:photo" class="w-10 h-10 text-emerald-400" />
                        </div>
                        <div class="text-xs text-emerald-400 font-mono">150 KB</div>
                    </div>
                </div>
            </AppWindow>
        </TutorialSection>

        <!-- 2. Install -->
        <TutorialSection id="install" title="安裝模組" icon="heroicons:arrow-down-tray" separator>
            <p>
                Nuxt Image 是一個獨立模組，需要額外安裝。
            </p>

            <AppCodeBlock filename="Terminal" code="npx nuxi@latest module add image" lang="bash" />
        </TutorialSection>

        <!-- 3. Usage -->
        <TutorialSection id="usage" title="基本用法" icon="heroicons:code-bracket" separator>
            <p>
                使用 <code class="text-emerald-400">&lt;NuxtImg&gt;</code> 取代標準的 <code
                    class="text-white">&lt;img&gt;</code> 標籤。
                它可以直接讀取 <code class="text-white">public/</code> 目錄下的圖片，或是外部 URL。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <div class="flex items-center justify-between px-2">
                        <span class="text-xs font-bold text-emerald-500 uppercase">Local Image</span>
                    </div>
                    <AppCodeBlock code="<template>
  <!-- public/hero.jpg -->
  <NuxtImg 
    src=&quot;/hero.jpg&quot; 
    width=&quot;800&quot; 
    height=&quot;400&quot; 
    format=&quot;webp&quot;
  />
</template>" lang="vue" />
                </div>

                <div class="space-y-2">
                    <div class="flex items-center justify-between px-2">
                        <span class="text-xs font-bold text-sky-500 uppercase">Remote Image</span>
                    </div>
                    <AppCodeBlock code="<template>
  <!-- External URL -->
  <NuxtImg 
    src=&quot;https://example.com/logo.png&quot; 
    width=&quot;100&quot;
    quality=&quot;80&quot;
  />
</template>" lang="vue" />
                </div>
            </div>
        </TutorialSection>

        <!-- 4. Responsive Sizes -->
        <TutorialSection id="responsive" title="響應式圖片" icon="heroicons:device-phone-mobile" separator>
            <p>
                使用 <code class="text-emerald-400">sizes</code> 屬性來定義不同螢幕寬度下的圖片尺寸。
                Nuxt Image 會自動生成 <code class="text-white">srcset</code>，讓瀏覽器下載最適合的大小。
            </p>

            <div class="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 mb-6">
                <div
                    class="flex flex-col md:flex-row gap-4 items-end justify-center h-32 pb-4 border-b border-slate-800">
                    <!-- Mobile -->
                    <div
                        class="w-12 bg-slate-800 rounded-t-lg border border-slate-700 flex flex-col items-center justify-end pb-2 h-16">
                        <Icon name="heroicons:device-phone-mobile" class="w-4 h-4 text-slate-500" />
                    </div>
                    <!-- Tablet -->
                    <div
                        class="w-20 bg-slate-800 rounded-t-lg border border-slate-700 flex flex-col items-center justify-end pb-2 h-24">
                        <Icon name="heroicons:device-tablet" class="w-6 h-6 text-slate-500" />
                    </div>
                    <!-- Desktop -->
                    <div
                        class="w-32 bg-slate-800 rounded-t-lg border border-slate-700 flex flex-col items-center justify-end pb-2 h-full">
                        <Icon name="heroicons:computer-desktop" class="w-8 h-8 text-slate-500" />
                    </div>
                </div>
                <div
                    class="flex flex-col md:flex-row gap-4 justify-center mt-4 text-xs font-mono text-slate-400 text-center">
                    <div class="w-12">sm:100vw</div>
                    <div class="w-20">md:50vw</div>
                    <div class="w-32">lg:400px</div>
                </div>
            </div>

            <AppCodeBlock code="<NuxtImg 
  src=&quot;/gallery/photo-1.jpg&quot;
  sizes=&quot;sm:100vw md:50vw lg:400px&quot;
  loading=&quot;lazy&quot;
/>" lang="vue" />
        </TutorialSection>

        <!-- 5. Providers -->
        <TutorialSection id="providers" title="圖片服務商" icon="heroicons:cloud">
            <p>
                Nuxt Image 支援多種圖片 CDN 服務商。你可以在 <code class="text-emerald-400">nuxt.config.ts</code> 中設定預設服務商。
            </p>

            <div class="flex flex-wrap gap-4 mb-6">
                <div
                    class="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 flex items-center gap-2 text-slate-300">
                    <Icon name="logos:vercel-icon" class="w-4 h-4" /> Vercel
                </div>
                <div
                    class="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 flex items-center gap-2 text-slate-300">
                    <Icon name="logos:netlify-icon" class="w-4 h-4" /> Netlify
                </div>
                <div
                    class="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 flex items-center gap-2 text-slate-300">
                    <Icon name="logos:cloudinary-icon" class="w-4 h-4" /> Cloudinary
                </div>
                <div
                    class="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 flex items-center gap-2 text-slate-300">
                    <Icon name="logos:imgix-icon" class="w-4 h-4" /> Imgix
                </div>
            </div>

            <AppCodeBlock code="export default defineNuxtConfig({
  image: {
    provider: 'cloudinary',
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/my-cloud/image/upload/'
    }
  }
})" lang="ts" filename="nuxt.config.ts" />
        </TutorialSection>

    </TutorialPage>
</template>
