<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'composables', label: 'Composables' },
            { id: 'utils', label: 'Utils' },
            { id: 'difference', label: '兩者差異' },
            { id: 'auto-imports', label: '自動引入機制' }
        ]
    })

    useHead({
        title: 'Composables 與 Utils',
        meta: [
            { name: 'description', content: 'Nuxt 4 邏輯複用教學：了解 Composables 與 Utils 的差異，以及如何利用自動引入機制來組織程式碼。' }
        ]
    })
</script>

<template>
    <TutorialPage title="Composables 與 Utils"
        description="在 Nuxt 開發中，我們經常需要提取共用邏輯。Nuxt 提供了兩個主要目錄：composables 與 utils，它們都具備自動引入 (Auto-import) 的特性，但用途卻大不相同。"
        :badges="[{ label: 'Logic Reuse', color: 'primary' }, { label: 'Auto-imports', color: 'neutral' }]">

        <!-- Section 1: Composables -->
        <TutorialSection id="composables" title="Composables" icon="heroicons:cube-transparent" separator>
            <p class="text-slate-400 leading-relaxed mb-6">
                <code class="text-emerald-400">composables/</code> 目錄用於存放<strong>有狀態 (Stateful)</strong> 的邏輯，通常涉及 Vue
                的響應式系統 (Refs, Computed) 或生命週期 Hooks。
            </p>

            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800/50 mb-6">
                <h4 class="text-white font-medium mb-2 text-sm">最佳實踐</h4>
                <ul class="space-y-2 text-sm text-slate-400">
                    <li class="flex items-center gap-2">
                        <UIcon name="heroicons:check" class="w-4 h-4 text-emerald-400" />
                        <span>檔案與函數名稱應以 <code class="text-slate-300">use</code> 開頭 (e.g., <code
                                class="text-slate-300">useUser.ts</code>)。</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <UIcon name="heroicons:check" class="w-4 h-4 text-emerald-400" />
                        <span>優先使用 Named Export 以利重構與測試。</span>
                    </li>
                </ul>
            </div>

            <AppCodeBlock language="typescript" :code="`// composables/useCounter.ts
export const useCounter = () => {
  const count = ref(0)
  
  const increment = () => {
    count.value++
  }

  return {
    count,
    increment
  }
}`" filename="composables/useCounter.ts" />
        </TutorialSection>

        <!-- Section 2: Utils -->
        <TutorialSection id="utils" title="Utils" icon="heroicons:wrench" separator>
            <p class="text-slate-400 mb-6">
                <code class="text-emerald-400">utils/</code> 目錄用於存放<strong>無狀態 (Stateless)</strong> 的輔助函數。這些函數通常是純函數
                (Pure Functions)，輸入相同則輸出相同，不依賴外部狀態。
            </p>

            <AppCodeBlock language="typescript" :code="`// utils/format.ts
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('zh-TW').format(date)
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('zh-TW', { 
    style: 'currency', 
    currency: 'TWD' 
  }).format(amount)
}`" filename="utils/format.ts" />
        </TutorialSection>

        <!-- Section 3: Difference -->
        <TutorialSection id="difference" title="兩者差異" icon="heroicons:scale" separator>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm text-slate-400">
                    <thead class="bg-slate-900/50 text-slate-200 font-medium">
                        <tr>
                            <th class="p-3 rounded-tl-lg">特性</th>
                            <th class="p-3">Composables</th>
                            <th class="p-3 rounded-tr-lg">Utils</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800/50">
                        <tr>
                            <td class="p-3 font-medium text-white">狀態依賴</td>
                            <td class="p-3 text-emerald-400">有狀態 (Refs, Reactive)</td>
                            <td class="p-3 text-blue-400">無狀態 (Pure Functions)</td>
                        </tr>
                        <tr>
                            <td class="p-3 font-medium text-white">Nuxt Context</td>
                            <td class="p-3">可使用 (useNuxtApp, useRoute)</td>
                            <td class="p-3">通常不使用</td>
                        </tr>
                        <tr>
                            <td class="p-3 font-medium text-white">命名慣例</td>
                            <td class="p-3 font-mono">useFeature</td>
                            <td class="p-3 font-mono">verbNoun (e.g. formatDate)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </TutorialSection>

        <!-- Section 4: Auto Imports -->
        <TutorialSection id="auto-imports" title="自動引入機制" icon="heroicons:arrow-path" separator>
            <p class="text-slate-400 mb-6">
                Nuxt 會自動掃描這兩個目錄，並將導出的函數自動引入到您的頁面與元件中。
            </p>

            <div class="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
                <div class="flex items-start gap-3">
                    <UIcon name="heroicons:exclamation-triangle" class="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                        <h4 class="text-yellow-400 font-medium text-sm">巢狀目錄掃描</h4>
                        <p class="text-slate-400 text-xs mt-1">
                            預設情況下，Nuxt 只會掃描頂層檔案。若要掃描巢狀目錄 (e.g., <code
                                class="text-slate-300">composables/cart/index.ts</code>)，該目錄必須包含 <code
                                class="text-slate-300">index.ts</code> 重新導出，或者在 <code
                                class="text-slate-300">nuxt.config.ts</code> 中手動配置。
                        </p>
                    </div>
                </div>
            </div>

            <AppCodeBlock language="vue" :code="`<script setup>
// 無需 import，直接使用！
const { count, increment } = useCounter()
const price = formatCurrency(1000)
</script>`" filename="pages/index.vue" />
        </TutorialSection>

    </TutorialPage>
</template>