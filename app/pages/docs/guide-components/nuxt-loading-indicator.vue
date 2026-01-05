<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'usage', label: '基本用法' },
            { id: 'customization', label: '自定義樣式' },
            { id: 'manual', label: '手動控制' }
        ]
    })

    useHead({
        title: 'NuxtLoadingIndicator',
        meta: [
            { name: 'description', content: 'NuxtLoadingIndicator 元件教學：自定義頁面切換時的頂部進度條，調整顏色、高度與動畫時間，以及使用 useLoadingIndicator 手動控制。' }
        ]
    })
</script>

<template>
    <TutorialPage title="NuxtLoadingIndicator"
        description="當使用者在頁面間導航時，Nuxt 會自動顯示一個頂部進度條。這個元件允許你自定義該進度條的外觀與行為，提升 SPA 的操作回饋感。"
        :badges="[{ label: 'UX Enhancement', color: 'primary' }, { label: 'Navigation', color: 'neutral' }]">

        <!-- 1. Concept -->
        <TutorialSection id="concept" title="核心概念" icon="heroicons:presentation-chart-line" separator>
            <p>
                在 SPA (單頁應用) 導航中，頁面切換通常需要等待資料獲取 (Data Fetching)。
                如果沒有任何回饋，使用者會以為網頁當機了。
                <code class="text-emerald-400">&lt;NuxtLoadingIndicator&gt;</code> 會監聽路由變化與 <code
                    class="text-emerald-400">useAsyncData</code> 的狀態，自動顯示進度。
            </p>

            <AppWindow title="Browser Preview" icon="heroicons:globe-alt" class="w-full">
                <div class="relative bg-slate-950 h-48 flex flex-col">
                    <!-- Loading Bar -->
                    <div class="h-1 w-full bg-slate-800 relative overflow-hidden">
                        <div
                            class="absolute top-0 left-0 h-full bg-emerald-500 w-2/3 shadow-lg shadow-emerald-500/50 animate-pulse">
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-6 flex-1 flex items-center justify-center">
                        <div class="text-center space-y-2">
                            <div class="flex items-center justify-center gap-2 text-emerald-400 animate-pulse">
                                <Icon name="heroicons:arrow-path" class="animate-spin" />
                                <span class="font-bold">Navigating...</span>
                            </div>
                            <div class="text-xs text-slate-500">Fetching data from API</div>
                        </div>
                    </div>
                </div>
            </AppWindow>
        </TutorialSection>

        <!-- 2. Usage -->
        <TutorialSection id="usage" title="基本用法" icon="heroicons:code-bracket" separator>
            <p>
                通常將其放在 <code class="text-emerald-400">app.vue</code> 或 <code
                    class="text-emerald-400">layouts/default.vue</code> 的最上方。
            </p>

            <AppCodeBlock code="<template>
  <div>
    <!-- 放在最頂層 -->
    <NuxtLoadingIndicator />
    
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>" lang="vue" />
        </TutorialSection>

        <!-- 3. Customization -->
        <TutorialSection id="customization" title="自定義樣式" icon="heroicons:paint-brush" separator>
            <p>
                你可以透過 props 調整顏色、高度與動畫時間。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <AppCodeBlock code="<NuxtLoadingIndicator 
  color=&quot;#34d399&quot; 
  :height=&quot;4&quot; 
  :duration=&quot;3000&quot; 
  :throttle=&quot;200&quot;
/>" lang="vue" />

                <div class="space-y-4">
                    <div class="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-800">
                        <code class="text-emerald-400 text-sm">color</code>
                        <span class="text-xs text-slate-400">進度條顏色 (CSS color)</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-800">
                        <code class="text-emerald-400 text-sm">height</code>
                        <span class="text-xs text-slate-400">高度 (px)</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-800">
                        <code class="text-emerald-400 text-sm">duration</code>
                        <span class="text-xs text-slate-400">預估載入時間 (ms)</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-800">
                        <code class="text-emerald-400 text-sm">throttle</code>
                        <span class="text-xs text-slate-400">延遲顯示 (ms)，避免閃爍</span>
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- 4. Manual Control -->
        <TutorialSection id="manual" title="手動控制" icon="heroicons:adjustments-vertical">
            <p>
                如果你需要在非路由導航的情況下（例如提交表單）顯示進度條，可以使用 <code class="text-emerald-400">useLoadingIndicator</code>。
            </p>

            <AppCodeBlock code="<script setup>
const { start, finish } = useLoadingIndicator()

async function handleSubmit() {
  try {
    start() // 開始跑進度條
    await saveData()
    finish() // 完成 (跑到 100% 後消失)
  } catch (e) {
    finish()
  }
}
</script>" lang="ts" />
        </TutorialSection>

    </TutorialPage>
</template>
