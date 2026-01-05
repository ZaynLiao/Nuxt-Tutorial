<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'why-usestate', label: '為什麼需要 useState?' },
            { id: 'basic-usage', label: '基本用法' },
            { id: 'shared-state', label: '跨元件共享' },
            { id: 'pinia', label: '進階：Pinia' }
        ]
    })

    useHead({
        title: '狀態管理 (State Management)',
        meta: [
            { name: 'description', content: '深入了解 Nuxt 4 的狀態管理機制，掌握 useState 與 Pinia 的最佳使用場景。' }
        ]
    })
</script>

<template>
    <TutorialPage title="狀態管理" description="在 SSR 框架中，狀態管理比純 SPA 複雜。Nuxt 提供了 useState 組合式函數，解決了伺服器端與客戶端狀態同步的難題。"
        :badges="[{ label: 'Core', color: 'primary' }, { label: 'State', color: 'neutral' }]">

        <!-- 1. Why useState -->
        <TutorialSection id="why-usestate" title="為什麼需要 useState?" icon="heroicons:question-mark-circle" separator>
            <p>
                你可能會問：「為什麼不能直接用 Vue 的 <code class="text-emerald-400">ref</code>？」
                <br>答案在於 **SSR (伺服器端渲染)** 的運作機制。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- The Problem -->
                <div class="p-6 rounded-2xl bg-red-950/10 border border-red-500/20">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="p-2 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                            <Icon name="heroicons:exclamation-triangle" class="w-5 h-5" />
                        </div>
                        <h3 class="font-bold text-red-400">使用 ref 的風險</h3>
                    </div>
                    <p class="text-sm text-red-200/70 leading-relaxed mb-4">
                        如果在 <code class="font-mono">setup()</code> 外部定義全域 <code class="font-mono">ref</code>，
                        這個變數會在 Node.js 伺服器記憶體中被<strong>所有使用者的請求共享</strong>。
                    </p>
                    <div class="p-3 rounded bg-red-950/30 border border-red-500/10 text-xs text-red-300 font-mono">
                        // 危險！所有使用者會看到同一個 counter
                        <br>const globalCounter = ref(0)
                    </div>
                </div>

                <!-- The Solution -->
                <div class="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/20">
                    <div class="flex items-center gap-3 mb-4">
                        <div
                            class="p-2 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                            <Icon name="heroicons:shield-check" class="w-5 h-5" />
                        </div>
                        <h3 class="font-bold text-emerald-400">useState 的保護</h3>
                    </div>
                    <p class="text-sm text-emerald-200/70 leading-relaxed mb-4">
                        <code class="font-mono">useState</code> 會在伺服器端為<strong>每個請求</strong>建立獨立的狀態實例，
                        並自動將資料序列化 (Serialize) 傳送到客戶端，完成水合 (Hydration)。
                    </p>
                    <div
                        class="p-3 rounded bg-emerald-950/30 border border-emerald-500/10 text-xs text-emerald-300 font-mono">
                        // 安全。每個請求都有獨立的 counter
                        <br>const counter = useState('count', () => 0)
                    </div>
                </div>
            </div>

            <!-- Live Demo -->
            <div class="mt-8 pt-8 border-t border-slate-800/50">
                <div class="flex items-center gap-2 mb-4">
                    <Icon name="heroicons:beaker" class="w-5 h-5 text-amber-400" />
                    <h3 class="font-bold text-white">實驗室：Local vs Shared State</h3>
                </div>
                <p class="text-sm text-slate-400 mb-6">
                    試著操作下方的按鈕。你會發現 <code class="text-emerald-400">ref</code> (Local) 只會影響單一元件，
                    而 <code class="text-emerald-400">useState</code> (Shared) 則會同步更新所有使用該 Key 的元件。
                </p>
                <StateDemo />
            </div>
        </TutorialSection>

        <!-- 2. Basic Usage -->
        <TutorialSection id="basic-usage" title="基本用法" icon="heroicons:code-bracket" separator>
            <p>
                <code class="text-emerald-400">useState</code> 接受兩個參數：一個唯一的 key (字串) 和一個初始化函數。
            </p>

            <div class="grid lg:grid-cols-2 gap-8">
                <AppCodeBlock code="<script setup>
// 'counter' 是全域唯一的 key
const count = useState('counter', () => 0)

const increment = () => {
  count.value++
}
</script>

<template>
  <button @click='increment'>
    Count: {{ count }}
  </button>
</template>" lang="vue" filename="app.vue" />

                <div class="space-y-4">
                    <div class="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
                        <h4 class="font-bold text-white mb-2">參數說明</h4>
                        <ul class="space-y-3 text-sm text-slate-400">
                            <li class="flex gap-3">
                                <span
                                    class="shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">1</span>
                                <div>
                                    <strong class="text-emerald-400">Key (String)</strong>
                                    <p class="mt-1">用於識別狀態的唯一鍵值。如果在不同元件使用相同的 key，它們會共享同一個狀態。</p>
                                </div>
                            </li>
                            <li class="flex gap-3">
                                <span
                                    class="shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">2</span>
                                <div>
                                    <strong class="text-emerald-400">Init (Function)</strong>
                                    <p class="mt-1">初始化函數。只會在狀態尚未存在時執行一次。</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="p-4 rounded-xl bg-amber-950/10 border border-amber-500/20 flex items-start gap-3">
                        <Icon name="heroicons:light-bulb" class="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div class="text-sm text-amber-200/80">
                            <strong class="block mb-1 text-amber-400">自動 Key 生成</strong>
                            <p>如果你在元件的 <code class="font-mono">script setup</code> 頂層使用，Nuxt 可以自動為你生成 key，但在 Composables
                                中建議手動指定。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- 3. Shared State -->
        <TutorialSection id="shared-state" title="跨元件共享" icon="heroicons:share" separator>
            <p>
                結合 <code class="text-emerald-400">Composables</code> 與 <code
                    class="text-emerald-400">useState</code>，我們可以建立輕量級的全域狀態管理系統。
            </p>

            <div class="space-y-6">
                <!-- Step 1: Define -->
                <div class="relative group">
                    <div
                        class="absolute -left-3 top-0 bottom-0 w-1 bg-slate-800 group-hover:bg-emerald-500/50 transition-colors rounded-full">
                    </div>
                    <div class="pl-6">
                        <h4 class="text-lg font-bold text-white mb-2">1. 定義 Composable</h4>
                        <AppCodeBlock code="// app/composables/useColor.ts
export const useColor = () => {
  return useState('color', () => 'pink')
}" lang="ts" filename="app/composables/useColor.ts" />
                    </div>
                </div>

                <!-- Step 2: Use -->
                <div class="relative group">
                    <div
                        class="absolute -left-3 top-0 bottom-0 w-1 bg-slate-800 group-hover:bg-emerald-500/50 transition-colors rounded-full">
                    </div>
                    <div class="pl-6">
                        <h4 class="text-lg font-bold text-white mb-2">2. 在任何元件中使用</h4>
                        <div class="grid md:grid-cols-2 gap-4">
                            <AppCodeBlock code="<script setup>
const color = useColor() // 'pink'
</script>" lang="vue" filename="ComponentA.vue" />
                            <AppCodeBlock code="<script setup>
const color = useColor()
// 修改會同步到 ComponentA
color.value = 'blue' 
</script>" lang="vue" filename="ComponentB.vue" />
                        </div>
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- 4. Pinia -->
        <TutorialSection id="pinia" title="進階：Pinia" icon="logos:pinia">
            <div class="flex flex-col md:flex-row gap-8 items-center">
                <div class="flex-1 space-y-4">
                    <p class="leading-relaxed">
                        雖然 <code class="text-emerald-400">useState</code> 足夠應付簡單場景，但當應用程式變得複雜時，
                        官方推薦使用 <strong>Pinia</strong>。
                    </p>
                    <ul class="space-y-3">
                        <li class="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                            <Icon name="heroicons:check" class="text-emerald-400" />
                            <span class="text-slate-300">DevTools 支援 (時光旅行除錯)</span>
                        </li>
                        <li class="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                            <Icon name="heroicons:check" class="text-emerald-400" />
                            <span class="text-slate-300">熱模組替換 (HMR)</span>
                        </li>
                        <li class="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                            <Icon name="heroicons:check" class="text-emerald-400" />
                            <span class="text-slate-300">更完整的 TypeScript 型別推斷</span>
                        </li>
                    </ul>
                    <div class="pt-4">
                        <a href="https://pinia.vuejs.org/" target="_blank"
                            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20 transition-all font-bold text-sm">
                            <Icon name="logos:pinia" class="w-5 h-5" />
                            探索 Pinia 官方文件
                            <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <div class="w-full md:w-1/3 flex justify-center">
                    <div class="relative w-48 h-48 flex justify-center items-center">
                        <div class="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full animate-pulse-slow">
                        </div>
                        <Icon name="logos:pinia" class="w-full h-full relative z-10 drop-shadow-2xl" size="128" />
                    </div>
                </div>
            </div>
        </TutorialSection>

    </TutorialPage>
</template>
