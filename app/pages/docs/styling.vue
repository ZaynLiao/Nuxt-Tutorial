<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'tailwind', label: 'Tailwind CSS v4' },
            { id: 'css-architecture', label: 'CSS 架構' },
            { id: 'scoped-styles', label: '元件樣式' },
            { id: 'fonts', label: '字型設定' }
        ]
    })

    useHead({
        title: '樣式系統 (Styling)',
        meta: [
            { name: 'description', content: 'Nuxt 4 樣式指南：掌握 Tailwind CSS v4 的新特性、CSS 架構設計，以及如何在元件中撰寫 Scoped Styles。' }
        ]
    })
</script>

<template>
    <TutorialPage title="樣式系統 (Styling)"
        description="Nuxt 4 與 Tailwind CSS v4 完美整合，提供了極致的開發體驗。本章將介紹如何建立可維護的 CSS 架構，以及如何善用現代 CSS 特性。"
        :badges="[{ label: 'Tailwind CSS v4', color: 'primary' }, { label: 'CSS', color: 'neutral' }]">

        <!-- Section 1: Tailwind CSS v4 -->
        <TutorialSection id="tailwind" title="Tailwind CSS v4" icon="logos:tailwindcss-icon" separator>
            <p class="text-slate-400 leading-relaxed mb-6">
                Nuxt 4 專案預設支援 Tailwind CSS v4。與 v3 不同，v4 是一個從頭重寫的引擎，速度更快且無需 <code
                    class="text-slate-300">tailwind.config.js</code>。
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div class="p-5 rounded-xl bg-slate-950 border border-slate-800/50">
                    <h3 class="text-white font-medium mb-2 flex items-center gap-2">
                        <UIcon name="heroicons:bolt" class="w-5 h-5 text-yellow-400" />
                        Zero Configuration
                    </h3>
                    <p class="text-sm text-slate-400">
                        所有的設定都直接在 CSS 檔案中使用 <code class="text-emerald-400">@theme</code> 區塊定義，不再需要 JavaScript 設定檔。
                    </p>
                </div>
                <div class="p-5 rounded-xl bg-slate-950 border border-slate-800/50">
                    <h3 class="text-white font-medium mb-2 flex items-center gap-2">
                        <UIcon name="heroicons:cpu-chip" class="w-5 h-5 text-blue-400" />
                        Native Engine
                    </h3>
                    <p class="text-sm text-slate-400">
                        基於 Rust (Lightning CSS) 的解析引擎，編譯速度提升 10 倍以上。
                    </p>
                </div>
            </div>

            <p class="text-slate-400 mb-4">
                在 <code class="text-emerald-400">assets/css/main.css</code> 中設定主題：
            </p>

            <AppCodeBlock language="css" :code="`@import 'tailwindcss';

@theme {
  /* 自定義顏色 */
  --color-brand-500: oklch(0.7 0.15 150);
  
  /* 自定義動畫 */
  --animate-fade-in: fade-in 0.5s ease-out;
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}`" filename="assets/css/main.css" />
        </TutorialSection>

        <!-- Section 2: CSS Architecture -->
        <TutorialSection id="css-architecture" title="CSS 架構" icon="heroicons:building-library" separator>
            <p class="text-slate-400 mb-6">
                在 Nuxt 專案中，我們建議將全域樣式保持在最低限度。
            </p>

            <div class="space-y-4">
                <div class="flex items-start gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-800/50">
                    <div class="mt-1 p-1.5 rounded bg-emerald-500/10 text-emerald-400">
                        <UIcon name="heroicons:check" class="w-4 h-4" />
                    </div>
                    <div>
                        <h4 class="text-white font-medium text-sm">Utility-First</h4>
                        <p class="text-slate-400 text-sm">優先使用 Tailwind Utility Classes。這能確保樣式的一致性並減少 CSS Bundle 大小。</p>
                    </div>
                </div>

                <div class="flex items-start gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-800/50">
                    <div class="mt-1 p-1.5 rounded bg-emerald-500/10 text-emerald-400">
                        <UIcon name="heroicons:check" class="w-4 h-4" />
                    </div>
                    <div>
                        <h4 class="text-white font-medium text-sm">Component Abstraction</h4>
                        <p class="text-slate-400 text-sm">如果一組樣式重複出現 (例如按鈕)，請將其封裝為 Vue 元件 (<code
                                class="text-slate-300">AppButton.vue</code>)，而不是建立 CSS Class。</p>
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- Section 3: Scoped Styles -->
        <TutorialSection id="scoped-styles" title="元件樣式 (Scoped Styles)" icon="heroicons:code-bracket-square" separator>
            <p class="text-slate-400 mb-6">
                當你需要撰寫無法用 Tailwind 表達的複雜樣式時，請使用 <code class="text-emerald-400">&lt;style scoped&gt;</code>。
            </p>

            <AppCodeBlock language="vue" :code="`<template>
  <div class=&quot;card&quot;>
    <slot />
  </div>
</template>

<style scoped>
/* 這裡的樣式只會影響此元件 */
.card {
  /* 使用 Tailwind 的 theme() 函數存取變數 */
  background-color: theme('colors.slate.900');
  
  /* 複雜的 CSS 特性 */
  backdrop-filter: blur(12px);
  clip-path: polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%);
}
</style>`" filename="components/SpecialCard.vue" />
        </TutorialSection>

    </TutorialPage>
</template>