<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'usage', label: '在 Nuxt 中使用' },
            { id: 'lifecycle', label: '生命週期' }
        ]
    })

    useHead({
        title: 'KeepAlive',
        meta: [
            { name: 'description', content: 'KeepAlive 教學：如何在 Nuxt 中快取頁面狀態，保留使用者輸入內容，並理解 onActivated 與 onDeactivated 生命週期。' }
        ]
    })
</script>

<template>
    <TutorialPage title="KeepAlive"
        description="KeepAlive 是 Vue 的內建元件，用於快取元件實例。當元件切換時，它不會被銷毀，而是保留在記憶體中，下次顯示時能保留狀態並避免重新渲染。"
        :badges="[{ label: 'Performance', color: 'primary' }, { label: 'State Preservation', color: 'neutral' }]">

        <!-- 1. Concept -->
        <TutorialSection id="concept" title="核心概念" icon="heroicons:archive-box" separator>
            <p>
                在多步驟表單或列表頁與詳情頁之間切換時，我們通常希望保留使用者輸入的內容或捲軸位置。
                <code class="text-emerald-400">&lt;KeepAlive&gt;</code> 就像是把元件「冷凍」起來，而不是丟進垃圾桶。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- Without KeepAlive -->
                <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                    <div class="text-xs font-bold text-slate-500 uppercase mb-4">Normal Behavior</div>
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-8 h-8 rounded bg-blue-500 flex items-center justify-center text-white font-bold">
                                A</div>
                            <Icon name="heroicons:arrow-right" class="text-slate-600" />
                            <div class="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-600">
                                <Icon name="heroicons:trash" />
                            </div>
                        </div>
                        <div class="text-xs text-slate-400">Component A is destroyed</div>
                    </div>
                </div>

                <!-- With KeepAlive -->
                <div class="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/20">
                    <div class="text-xs font-bold text-emerald-500 uppercase mb-4">With KeepAlive</div>
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center text-white font-bold">
                                A</div>
                            <Icon name="heroicons:arrow-right" class="text-emerald-600" />
                            <div
                                class="w-8 h-8 rounded bg-emerald-900/50 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                                <Icon name="heroicons:snowflake" />
                            </div>
                        </div>
                        <div class="text-xs text-emerald-400">Component A is cached (Inactive)</div>
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- 2. Usage in Nuxt -->
        <TutorialSection id="usage" title="在 Nuxt 中使用" icon="heroicons:code-bracket" separator>
            <p>
                在 Nuxt 中，你不需要手動包裹 <code class="text-emerald-400">&lt;KeepAlive&gt;</code>。
                只需在 <code class="text-emerald-400">definePageMeta</code> 中設定即可。
            </p>

            <AppCodeBlock code="<script setup>
definePageMeta({
  // 啟用快取 (使用預設設定)
  keepalive: true,
  
  // 或者提供進階設定
  keepalive: {
    max: 10, // 最多快取 10 個頁面
    include: ['Home', 'Users'], // 只快取特定名稱的頁面
    exclude: ['Login'] // 不快取登入頁
  }
})
</script>" lang="ts" />
        </TutorialSection>

        <!-- 3. Lifecycle -->
        <TutorialSection id="lifecycle" title="生命週期" icon="heroicons:clock">
            <p>
                當元件被快取時，標準的 <code class="text-emerald-400">onMounted</code> 和 <code
                    class="text-emerald-400">onUnmounted</code> 只會執行一次。
                你需要使用專屬的生命週期 Hook 來監聽元件的「喚醒」與「休眠」。
            </p>

            <AppWindow title="Lifecycle Hooks" icon="heroicons:arrow-path" class="w-full">
                <div class="p-6 bg-slate-950 space-y-6">
                    <!-- Initial Load -->
                    <div class="flex items-center gap-4">
                        <div class="w-24 text-right text-xs font-bold text-slate-500">First Load</div>
                        <div class="flex gap-2">
                            <span
                                class="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-mono">onMounted</span>
                            <span
                                class="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono">onActivated</span>
                        </div>
                    </div>

                    <!-- Navigate Away -->
                    <div class="flex items-center gap-4">
                        <div class="w-24 text-right text-xs font-bold text-slate-500">Leave</div>
                        <div class="flex gap-2">
                            <span
                                class="px-2 py-1 rounded bg-orange-500/20 text-orange-400 text-xs font-mono">onDeactivated</span>
                            <span class="text-xs text-slate-600 flex items-center">(Not Unmounted)</span>
                        </div>
                    </div>

                    <!-- Return -->
                    <div class="flex items-center gap-4">
                        <div class="w-24 text-right text-xs font-bold text-slate-500">Return</div>
                        <div class="flex gap-2">
                            <span
                                class="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono">onActivated</span>
                            <span class="text-xs text-slate-600 flex items-center">(No Mounted)</span>
                        </div>
                    </div>
                </div>
            </AppWindow>

            <div class="mt-6">
                <AppCodeBlock code="<script setup>
onMounted(() => {
  console.log('只會執行一次 (初始化)')
})

onActivated(() => {
  console.log('每次進入頁面都會執行 (包含從快取恢復)')
  // 適合：重新抓取資料、重置捲軸位置
})

onDeactivated(() => {
  console.log('每次離開頁面都會執行')
  // 適合：暫停計時器、儲存草稿
})
</script>" lang="ts" />
            </div>
        </TutorialSection>

    </TutorialPage>
</template>
