<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '自動引入機制' },
            { id: 'components', label: '元件 (Components)' },
            { id: 'composables', label: '組合式函數 (Composables)' },
            { id: 'utils', label: '工具函式 (Utils)' },
            { id: 'lazy', label: '動態載入 (Lazy)' },
            { id: 'explicit', label: '顯式引入' }
        ]
    })

    useHead({
        title: '自動引入 (Auto-imports)',
        meta: [
            { name: 'description', content: 'Nuxt 自動引入 (Auto-imports) 機制詳解：元件、Composables 與 Utils 的自動掃描規則，Lazy Loading 的使用時機，以及 TypeScript 型別支援。' }
        ]
    })
</script>

<template>
    <TutorialPage title="自動引入 (Auto-imports)"
        description="Nuxt 的核心魔法之一。只要將檔案放入指定目錄 (components, composables, utils)，就能在全專案直接使用，完全不需要手動 import。"
        :badges="[{ label: 'DX Friendly', color: 'primary' }, { label: 'Tree Shaking', color: 'neutral' }]">

        <!-- 1. Concept -->
        <TutorialSection id="concept" title="自動引入機制" icon="heroicons:sparkles" separator>
            <p>
                在傳統 Vue 專案中，你必須手動引入每個用到的元件和函式。
                Nuxt 自動化了這個過程，掃描 <code class="text-emerald-400">components/</code>、<code
                    class="text-emerald-400">composables/</code> 與 <code class="text-emerald-400">utils/</code>
                目錄，並生成型別定義 (Type Definitions)。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <div class="text-xs font-bold text-slate-500 uppercase mb-4">Standard Vue</div>
                    <AppCodeBlock code="<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'

const count = ref(0)
const route = useRoute()
</script>" lang="vue" />
                </div>

                <div class="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/20 relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-2">
                        <Icon name="heroicons:check-badge" class="w-6 h-6 text-emerald-500" />
                    </div>
                    <div class="text-xs font-bold text-emerald-500 uppercase mb-4">Nuxt Way</div>
                    <AppCodeBlock code="<script setup>
// Vue API, Vue Router 與 Components
// 全部自動引入！

const count = ref(0)
const route = useRoute()
</script>" lang="vue" />
                </div>
            </div>

            <div class="mt-4 p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 flex gap-3">
                <Icon name="heroicons:light-bulb" class="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div class="text-sm text-slate-400">
                    <strong>這不是魔法，是 TypeScript：</strong>
                    Nuxt 會在 <code class="text-slate-300 font-mono">.nuxt/imports.d.ts</code> 中生成全域型別宣告。所以當你輸入 <code
                        class="text-emerald-400">ref</code> 時，VS Code 能知道它是什麼並提供自動補全。
                </div>
            </div>
        </TutorialSection>

        <!-- 2. Components Naming Convention -->
        <TutorialSection id="components" title="元件 (Components)" icon="heroicons:cube" separator>
            <p>
                Nuxt 會根據<strong>目錄層級</strong>自動組合元件名稱，使用 PascalCase (大駝峰) 格式。
                這有助於避免命名衝突，並讓元件來源一目瞭然。
            </p>

            <AppWindow title="Directory to Component Name" icon="heroicons:folder-open" class="w-full">
                <div class="p-6 bg-slate-950">
                    <AppFileTree :files="[
                        {
                            name: 'components/',
                            icon: 'heroicons:folder-open',
                            color: 'emerald',
                            children: [
                                { name: 'Header.vue', icon: 'logos:vue', badge: { text: '<Header />', color: 'emerald' } },
                                {
                                    name: 'base/',
                                    icon: 'heroicons:folder',
                                    color: 'blue',
                                    children: [
                                        { name: 'Button.vue', icon: 'logos:vue', badge: { text: '<BaseButton />', color: 'emerald' } }
                                    ]
                                },
                                {
                                    name: 'blog/post/',
                                    icon: 'heroicons:folder',
                                    color: 'blue',
                                    children: [
                                        { name: 'Card.vue', icon: 'logos:vue', badge: { text: '<BlogPostCard />', color: 'emerald' } }
                                    ]
                                }
                            ]
                        }
                    ]" />
                </div>
            </AppWindow>

            <div class="mt-4 p-4 bg-blue-950/20 border border-blue-500/20 rounded-lg flex items-start gap-3">
                <Icon name="heroicons:information-circle" class="w-5 h-5 text-blue-400 mt-0.5" />
                <div class="text-sm text-blue-200">
                    <strong>重複名稱優化：</strong>
                    如果檔名與目錄名相同 (e.g., <code class="text-blue-300">components/Base/Base.vue</code>)，
                    Nuxt 會自動簡化為 <code class="text-blue-300">&lt;Base /&gt;</code> 而不是 <code class="text-blue-300">&lt;BaseBase
                /&gt;</code>。
                </div>
            </div>
        </TutorialSection>

        <!-- 3. Composables -->
        <TutorialSection id="composables" title="組合式函數 (Composables)" icon="heroicons:cube-transparent" separator>
            <p>
                Nuxt 自動引入 <code class="text-emerald-400">composables/</code> 目錄下的所有 Top-level 匯出。
                這是放置商業邏輯與狀態邏輯的最佳場所。
            </p>

            <div class="grid lg:grid-cols-2 gap-8">
                <!-- File Structure -->
                <AppWindow title="File Structure" icon="heroicons:folder-open" class="h-full">
                    <AppFileTree :files="[
                        {
                            name: 'composables/',
                            icon: 'heroicons:folder-open',
                            color: 'emerald',
                            children: [
                                { name: 'useUser.ts', icon: 'logos:typescript-icon', badge: { text: 'useUser()', color: 'emerald' } },
                                { name: 'cart.ts', icon: 'logos:typescript-icon', badge: { text: 'useCart()', color: 'emerald' } },
                                {
                                    name: 'auth/',
                                    icon: 'heroicons:folder',
                                    children: [
                                        { name: 'login.ts', icon: 'logos:typescript-icon', badge: { text: 'useLogin()', color: 'emerald' } }
                                    ]
                                }
                            ]
                        }
                    ]" />
                </AppWindow>

                <!-- Usage -->
                <div class="space-y-4">
                    <AppCodeBlock code="// composables/useUser.ts
export const useUser = () => {
    const user = useState('user', () => null)
    return { user }
}" lang="ts" filename="composables/useUser.ts" />

                    <AppCodeBlock code="// app.vue
// 直接使用，免 import
const { user } = useUser()" lang="vue" filename="app.vue" />

                    <div class="p-4 rounded-lg bg-slate-900 border border-slate-800 text-sm">
                        <strong class="text-white block mb-1">注意掃描行為：</strong>
                        <span class="text-slate-400">Nuxt 預設只掃描 <code class="text-emerald-400">composables/</code>
                            的第一層檔案。若要支援巢狀目錄 (如 <code class="text-slate-300">composables/auth/login.ts</code>)，該檔案必須是
                            <code class="text-slate-300">index.ts</code> 或在 <code
                                class="text-emerald-400">nuxt.config.ts</code> 中額外設定。</span>
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- 4. Utils -->
        <TutorialSection id="utils" title="工具函式 (Utils)" icon="heroicons:wrench-screwdriver" separator>
            <p>
                <code class="text-emerald-400">utils/</code> 目錄運作方式與 <code class="text-emerald-400">composables/</code>
                相似，但用途不同。
                這裡適合放置<strong>純函數 (Pure Functions)</strong>，也就是不依賴 Vue 實例或狀態的輔助函式。
            </p>

            <div class="grid sm:grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                    <h4 class="text-emerald-400 font-bold mb-2 flex items-center gap-2">
                        <Icon name="heroicons:cursor-arrow-rays" class="w-5 h-5" />
                        Composables
                    </h4>
                    <ul class="text-sm text-slate-400 space-y-1 list-disc list-inside">
                        <li>依賴 Vue Context (ref, computed)</li>
                        <li>涉及狀態管理 (useState, Pinia)</li>
                        <li>命名通常以 <code class="text-slate-300">use</code> 開頭</li>
                    </ul>
                </div>

                <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                    <h4 class="text-sky-400 font-bold mb-2 flex items-center gap-2">
                        <Icon name="heroicons:wrench" class="w-5 h-5" />
                        Utils
                    </h4>
                    <ul class="text-sm text-slate-400 space-y-1 list-disc list-inside">
                        <li>純 JavaScript/TypeScript 邏輯</li>
                        <li>格式化 (Date, Currency)</li>
                        <li>驗證邏輯 (Regex)</li>
                    </ul>
                </div>
            </div>

            <AppCodeBlock code="// utils/format.ts
export const formatPrice = (price: number) => {
  return '$' + price.toFixed(2)
}

// app.vue
// 自動引入
const price = formatPrice(100)" lang="ts" class="mt-4" />
        </TutorialSection>

        <!-- 5. Lazy Loading -->
        <TutorialSection id="lazy" title="動態載入 (Lazy)" icon="heroicons:bolt" separator>
            <p>
                只要在元件名稱前加上 <code class="text-emerald-400">Lazy</code> 前綴，Nuxt 就會自動將該元件打包成獨立的 chunk，
                並在<strong>需要顯示時</strong>才透過網路下載。這對於彈窗 (Modal)、側邊欄或捲動後才看到的內容非常有用。
            </p>

            <div class="grid md:grid-cols-2 gap-6 items-center">
                <AppCodeBlock code="<template>
  <!-- 只有當 show 為 true 時 -->
  <!-- 瀏覽器才會下載 Modal 的程式碼 -->
  <LazyModal v-if=&quot;show&quot; />
  
  <button @click=&quot;show = true&quot;>
    Open Modal
  </button>
</template>" lang="vue" />

                <div class="space-y-4">
                    <div class="flex items-center gap-4 p-4 bg-slate-900 rounded-lg border border-slate-800">
                        <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                            <Icon name="heroicons:cube" class="w-6 h-6 text-slate-500" />
                        </div>
                        <div>
                            <div class="text-sm font-bold text-slate-300">Standard Component</div>
                            <div class="text-xs text-slate-500">Included in main bundle</div>
                        </div>
                    </div>

                    <div class="flex items-center gap-4 p-4 bg-emerald-950/20 rounded-lg border border-emerald-500/30">
                        <div
                            class="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center animate-pulse">
                            <Icon name="heroicons:cloud-arrow-down" class="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <div class="text-sm font-bold text-emerald-400">Lazy Component</div>
                            <div class="text-xs text-emerald-600">Fetched on demand</div>
                        </div>
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- 4. Explicit Imports -->
        <TutorialSection id="explicit" title="顯式引入" icon="heroicons:code-bracket">
            <p>
                雖然自動引入很方便，但在某些情況下（例如 JSX/TSX 或動態元件），你可能需要手動引入。
                你可以從 <code class="text-emerald-400">#components</code> 虛擬模組中引入。
            </p>

            <AppCodeBlock code="<script setup lang=&quot;ts&quot;>
// 顯式引入 (通常不需要，除非是為了取得元件型別或在非 Vue 檔使用)
import { AppHeader, LazyModal } from '#components'

const MyComponent = resolveComponent('AppHeader')
</script>" lang="ts" />
        </TutorialSection>

    </TutorialPage>
</template>
