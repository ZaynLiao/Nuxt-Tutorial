<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'flow', label: '運作流程' },
            { id: 'usage', label: '基本用法' },
            { id: 'comparison', label: 'vs ClientOnly' }
        ]
    })

    useHead({
        title: 'NuxtClientFallback',
        meta: [
            { name: 'description', content: 'NuxtClientFallback 教學：如何優雅處理 SSR 渲染錯誤，避免整個頁面崩潰 (500 Error)，並自動降級為客戶端渲染。' }
        ]
    })
</script>

<template>
    <TutorialPage title="NuxtClientFallback"
        description="當元件在伺服器端渲染 (SSR) 發生錯誤時，通常會導致整個頁面崩潰 (500 Error)。NuxtClientFallback 允許你捕捉這些錯誤，並改為在客戶端渲染該元件。"
        :badges="[{ label: 'Error Handling', color: 'primary' }, { label: 'Resilience', color: 'neutral' }]">

        <!-- 1. Concept -->
        <TutorialSection id="concept" title="核心概念" icon="heroicons:shield-exclamation" separator>
            <p>
                有些第三方元件可能不支援 SSR，或者依賴了瀏覽器特定的 API (如 window)。
                如果在 SSR 過程中拋出錯誤，使用者通常會看到可怕的 500 錯誤頁面。
                <code class="text-emerald-400">&lt;NuxtClientFallback&gt;</code> 就像是 SSR 的安全氣囊。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- Without Fallback -->
                <div class="p-6 rounded-2xl bg-red-950/10 border border-red-500/20">
                    <div class="text-xs font-bold text-red-400 uppercase mb-4 flex items-center gap-2">
                        <Icon name="heroicons:x-circle" />
                        Without Protection
                    </div>
                    <div class="space-y-2 text-center py-8">
                        <div class="text-4xl font-bold text-red-500">500</div>
                        <div class="text-sm text-red-400">Internal Server Error</div>
                        <div class="text-xs text-red-300/50 mt-2">Whole page crashes</div>
                    </div>
                </div>

                <!-- With Fallback -->
                <div class="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/20">
                    <div class="text-xs font-bold text-emerald-500 uppercase mb-4 flex items-center gap-2">
                        <Icon name="heroicons:check-circle" />
                        With NuxtClientFallback
                    </div>
                    <div class="space-y-4">
                        <div class="h-4 bg-slate-800 rounded w-3/4"></div>
                        <div
                            class="h-24 bg-slate-800 rounded border border-dashed border-slate-600 flex items-center justify-center text-xs text-slate-500">
                            Component rendered on Client
                        </div>
                        <div class="h-4 bg-slate-800 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- 2. Flow -->
        <TutorialSection id="flow" title="運作流程" icon="heroicons:arrow-path" separator>
            <p>
                NuxtClientFallback 的運作邏輯是「先試試看 SSR，如果失敗了，再換 Client Side Rendering」。
            </p>

            <AppWindow title="Rendering Flow" icon="heroicons:cpu-chip" class="w-full">
                <div class="p-8 bg-slate-950 flex flex-col md:flex-row items-center justify-between gap-4">
                    <!-- Step 1: SSR -->
                    <div class="flex flex-col items-center gap-2 relative group">
                        <div
                            class="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:border-red-500 group-hover:text-red-500 transition-colors">
                            <Icon name="heroicons:server" class="w-8 h-8" />
                        </div>
                        <div class="text-xs font-bold text-slate-500">1. SSR Attempt</div>

                        <!-- Error Badge -->
                        <div
                            class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-bounce">
                            !</div>
                    </div>

                    <!-- Arrow -->
                    <div class="flex-1 h-0.5 bg-slate-800 relative">
                        <div
                            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 px-2 text-xs text-slate-500">
                            Catch Error
                        </div>
                    </div>

                    <!-- Step 2: Client -->
                    <div class="flex flex-col items-center gap-2">
                        <div
                            class="w-16 h-16 rounded-full bg-emerald-900/20 border border-emerald-500 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                            <Icon name="heroicons:computer-desktop" class="w-8 h-8" />
                        </div>
                        <div class="text-xs font-bold text-emerald-500">2. Client Render</div>
                    </div>
                </div>
            </AppWindow>
        </TutorialSection>

        <!-- 3. Usage -->
        <TutorialSection id="usage" title="基本用法" icon="heroicons:code-bracket" separator>
            <p>
                將可能出錯的元件包裹起來，並可選擇性地提供 <code class="text-emerald-400">#fallback</code>。
            </p>

            <AppCodeBlock code="<template>
  <!-- 如果 BuggyComponent 在 SSR 出錯，它會在 Client 端重試 -->
  <NuxtClientFallback>
    <BuggyComponent />
    
    <!-- 選用：如果 Client 端也出錯，或者在載入期間顯示 -->
    <template #fallback>
      <div class=&quot;p-4 bg-red-500/10 text-red-400 rounded&quot;>
        無法載入元件
      </div>
    </template>
</NuxtClientFallback>
</template>" lang="vue" />
        </TutorialSection>

        <!-- 4. Comparison -->
        <TutorialSection id="comparison" title="vs ClientOnly" icon="heroicons:scale">
            <p>
                兩者很像，但用途不同。
            </p>

            <div class="overflow-hidden rounded-lg border border-slate-800">
                <table class="w-full text-left text-sm">
                    <thead class="bg-slate-900 text-slate-400">
                        <tr>
                            <th class="p-4 font-medium">Feature</th>
                            <th class="p-4 font-medium text-emerald-400">NuxtClientFallback</th>
                            <th class="p-4 font-medium text-blue-400">ClientOnly</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800 bg-slate-950/50">
                        <tr>
                            <td class="p-4 text-slate-300">SSR 策略</td>
                            <td class="p-4 text-slate-400">先嘗試 SSR，失敗才轉 CSR</td>
                            <td class="p-4 text-slate-400">直接跳過 SSR，只做 CSR</td>
                        </tr>
                        <tr>
                            <td class="p-4 text-slate-300">主要用途</td>
                            <td class="p-4 text-slate-400">錯誤處理 (Error Handling)</td>
                            <td class="p-4 text-slate-400">特定環境邏輯 (Browser API)</td>
                        </tr>
                        <tr>
                            <td class="p-4 text-slate-300">SEO 影響</td>
                            <td class="p-4 text-slate-400">有機會被索引 (若 SSR 成功)</td>
                            <td class="p-4 text-slate-400">完全無法被索引 (除非 Google 執行 JS)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </TutorialSection>

    </TutorialPage>
</template>
