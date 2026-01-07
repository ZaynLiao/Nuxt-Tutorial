<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'public', label: 'Public 目錄' },
            { id: 'assets', label: 'Assets 目錄' },
            { id: 'optimization', label: '圖片優化' }
        ]
    })

    useHead({
        title: '靜態資源 (Assets)',
        meta: [
            { name: 'description', content: 'Nuxt 4 靜態資源教學：了解 Public 與 Assets 目錄的差異，以及如何使用 Nuxt Image 進行圖片優化。' }
        ]
    })
</script>

<template>
    <DocsPage title="靜態資源" description="Nuxt 提供了兩個目錄來管理靜態資源：public/ 與 assets/。了解它們的差異對於優化網站效能至關重要。"
        :badges="[{ label: 'Performance', color: 'primary' }, { label: 'Build Tool', color: 'neutral' }]">

        <!-- 1. Concept: Comparison -->
        <DocsSection id="concept" title="核心概念" icon="heroicons:scale" separator>
            <p>
                簡單來說：如果你希望檔案被 Vite 處理（壓縮、雜湊命名、轉譯），請放在 <code class="text-emerald-400">assets/</code>。
                如果你希望檔案保持原樣（如 robots.txt），請放在 <code class="text-white">public/</code>。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- Public Card -->
                <div class="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                            <Icon name="heroicons:folder-open" class="w-6 h-6" />
                        </div>
                        <h3 class="font-bold text-white">public/</h3>
                    </div>
                    <ul class="space-y-3 text-sm text-slate-400">
                        <li class="flex items-start gap-2">
                            <Icon name="heroicons:check" class="w-4 h-4 text-sky-500 mt-0.5" />
                            <span>直接映射到網站根目錄 (/)</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <Icon name="heroicons:check" class="w-4 h-4 text-sky-500 mt-0.5" />
                            <span>不經過編譯或壓縮</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <Icon name="heroicons:check" class="w-4 h-4 text-sky-500 mt-0.5" />
                            <span>適合 robots.txt, favicon.ico, CNAME</span>
                        </li>
                    </ul>
                </div>

                <!-- Assets Card -->
                <div class="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                            <Icon name="heroicons:wrench-screwdriver" class="w-6 h-6" />
                        </div>
                        <h3 class="font-bold text-white">assets/</h3>
                    </div>
                    <ul class="space-y-3 text-sm text-slate-400">
                        <li class="flex items-start gap-2">
                            <Icon name="heroicons:check" class="w-4 h-4 text-emerald-500 mt-0.5" />
                            <span>由 Vite 處理 (Build Pipeline)</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <Icon name="heroicons:check" class="w-4 h-4 text-emerald-500 mt-0.5" />
                            <span>支援 CSS Pre-processors (Sass, Tailwind)</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <Icon name="heroicons:check" class="w-4 h-4 text-emerald-500 mt-0.5" />
                            <span>自動雜湊命名 (Cache Busting)</span>
                        </li>
                    </ul>
                </div>
            </div>
        </DocsSection>

        <!-- 2. Public Directory -->
        <DocsSection id="public" title="Public 目錄" icon="heroicons:globe-alt" separator>
            <p>
                放在這裡的檔案可以透過 <code class="text-white">/filename</code> 直接存取。
            </p>

            <div
                class="flex flex-col md:flex-row items-center gap-4 md:gap-8 p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
                <!-- File System -->
                <div class="flex-1 w-full space-y-3">
                    <div class="flex items-center gap-2">
                        <Icon name="heroicons:computer-desktop" class="w-4 h-4 text-slate-500" />
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">File System</span>
                    </div>
                    <div
                        class="font-mono text-sm text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-3 shadow-sm">
                        <Icon name="heroicons:document" class="w-5 h-5 text-slate-500" />
                        public/robots.txt
                    </div>
                </div>

                <!-- Arrow -->
                <div class="space-y-3">
                    <div
                        class="flex items-center gap-2 justify-center rounded-full mt-6 bg-slate-900/40 w-8 h-8 border border-slate-700">
                        <Icon name="heroicons:arrow-right" class="w-4 h-4 text-slate-500" />
                    </div>
                </div>


                <!-- Browser URL -->
                <div class="flex-1 w-full space-y-3">
                    <div class="flex items-center gap-2">
                        <Icon name="heroicons:globe-alt" class="w-4 h-4 text-emerald-500" />
                        <span class="text-xs font-bold text-emerald-500 uppercase tracking-wider">Browser URL</span>
                    </div>
                    <div
                        class="font-mono text-sm text-emerald-400 bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/20 flex items-center gap-3 shadow-sm shadow-emerald-500/5">
                        <Icon name="heroicons:link" class="w-5 h-5 text-emerald-500" />
                        https://site.com/robots.txt
                    </div>
                </div>
            </div>
        </DocsSection>

        <!-- 3. Assets Directory -->
        <DocsSection id="assets" title="Assets 目錄" icon="heroicons:photo" separator>
            <p>
                這裡的檔案需要透過 <code class="text-emerald-400">~/assets/</code> 路徑引用。
                Vite 會將其轉換為帶有 Hash 的檔名，以利於瀏覽器快取。
            </p>

            <UiWindow title="Vite Processing" icon="heroicons:cog" class="w-full">
                <div class="p-8 bg-slate-950 flex flex-col md:flex-row items-center justify-between gap-4">
                    <!-- Source -->
                    <div class="text-center">
                        <div
                            class="w-16 h-16 mx-auto bg-slate-800 rounded-xl flex items-center justify-center mb-2 border border-slate-700">
                            <Icon name="heroicons:photo" class="w-8 h-8 text-slate-400" />
                        </div>
                        <div class="text-xs font-mono text-slate-500">assets/logo.png</div>
                    </div>

                    <!-- Process -->
                    <div class="flex-1 flex items-center justify-center relative">
                        <div class="h-0.5 w-full bg-slate-800 absolute"></div>
                        <div
                            class="w-10 h-10 bg-emerald-900 rounded-full border border-emerald-500 flex items-center justify-center z-10 shadow-lg shadow-emerald-500/30">
                            <Icon name="heroicons:bolt" class="w-5 h-5 text-emerald-400" />
                        </div>
                    </div>

                    <!-- Output -->
                    <div class="text-center">
                        <div
                            class="w-16 h-16 mx-auto bg-slate-800 rounded-xl flex items-center justify-center mb-2 border border-slate-700">
                            <Icon name="heroicons:photo" class="w-8 h-8 text-emerald-400" />
                        </div>
                        <div class="text-xs font-mono text-emerald-400">_nuxt/logo.a1b2c3.png</div>
                    </div>
                </div>
            </UiWindow>

            <div class="mt-6">
                <UiCodeBlock code="<template>
  <!-- 引用 assets 目錄下的圖片 -->
  <img src=&quot;~/assets/img/logo.png&quot; alt=&quot;Logo&quot; />
  
  <!-- 在 CSS 中引用 -->
  <div class=&quot;bg-[url('~/assets/bg.jpg')]&quot;></div>
</template>" lang="vue" />
            </div>
        </DocsSection>

        <!-- 4. Image Optimization -->
        <DocsSection id="optimization" title="圖片優化" icon="heroicons:sparkles">
            <p>
                建議使用 <a href="https://image.nuxt.com" target="_blank" class="text-emerald-400 hover:underline">Nuxt
                    Image</a>
                模組。
                它可以自動調整大小、轉換格式 (WebP/Avif) 並支援 Lazy Loading，大幅提升 Core Web Vitals 分數。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <h4 class="font-bold text-white mb-4">Original (Standard &lt;img&gt;)</h4>
                    <div class="space-y-2 text-sm text-slate-400">
                        <div class="flex justify-between">
                            <span>Format</span>
                            <span class="text-red-400">JPEG</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Size</span>
                            <span class="text-red-400">2.5 MB</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Loading</span>
                            <span class="text-red-400">Eager (Blocks Render)</span>
                        </div>
                    </div>
                </div>

                <div class="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/20">
                    <h4 class="font-bold text-emerald-400 mb-4">Optimized (&lt;NuxtImg&gt;)</h4>
                    <div class="space-y-2 text-sm text-emerald-200/70">
                        <div class="flex justify-between">
                            <span>Format</span>
                            <span class="text-emerald-400">WebP</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Size</span>
                            <span class="text-emerald-400">150 KB (-94%)</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Loading</span>
                            <span class="text-emerald-400">Lazy (On Viewport)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6">
                <UiCodeBlock code="<template>
  <NuxtImg 
    src=&quot;/photo.jpg&quot; 
    width=&quot;500&quot; 
    format=&quot;webp&quot; 
    loading=&quot;lazy&quot; 
    placeholder
  />
</template>" lang="vue" />
            </div>
        </DocsSection>

    </DocsPage>
</template>
