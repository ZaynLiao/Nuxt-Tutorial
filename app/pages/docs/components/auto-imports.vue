<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '自動引入機制' },
            { id: 'naming', label: '命名規則' },
            { id: 'lazy', label: '動態載入 (Lazy)' },
            { id: 'explicit', label: '顯式引入' }
        ]
    })

    useHead({
        title: '元件自動引入',
        meta: [
            { name: 'description', content: 'Nuxt 自動引入 (Auto-imports) 機制詳解：目錄結構如何映射為元件名稱、Lazy Loading 的使用時機，以及如何處理名稱衝突。' }
        ]
    })
</script>

<template>
    <TutorialPage title="元件自動引入" description="Nuxt 的核心魔法之一。只要將 Vue 元件放入 components/ 目錄，就能在任何地方直接使用，完全不需要手動 import。"
        :badges="[{ label: 'DX Friendly', color: 'primary' }, { label: 'Tree Shaking', color: 'neutral' }]">

        <!-- 1. Concept -->
        <TutorialSection id="concept" title="自動引入機制" icon="heroicons:sparkles" separator>
            <p>
                在傳統 Vue 專案中，使用元件前必須先 <code class="text-emerald-400">import</code> 並註冊。
                Nuxt 會自動掃描 <code class="text-emerald-400">components/</code> 目錄，並根據檔名自動產生全域元件。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <div class="text-xs font-bold text-slate-500 uppercase mb-4">Standard Vue</div>
                    <AppCodeBlock code="<script setup>
import AppHeader from './components/AppHeader.vue'
import UserCard from './components/UserCard.vue'
</script>

<template>
  <AppHeader />
  <UserCard />
</template>" lang="vue" />
                </div>

                <div class="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/20 relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-2">
                        <Icon name="heroicons:check-badge" class="w-6 h-6 text-emerald-500" />
                    </div>
                    <div class="text-xs font-bold text-emerald-500 uppercase mb-4">Nuxt Way</div>
                    <AppCodeBlock code="<script setup>
// 什麼都不用寫！
// Nuxt 已經幫你做好了
</script>

<template>
  <AppHeader />
  <UserCard />
</template>" lang="vue" />
                </div>
            </div>
        </TutorialSection>

        <!-- 2. Naming Convention -->
        <TutorialSection id="naming" title="命名規則" icon="heroicons:tag" separator>
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

        <!-- 3. Lazy Loading -->
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
