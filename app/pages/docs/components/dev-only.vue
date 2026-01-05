<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'usage', label: '基本用法' },
            { id: 'fallback', label: 'Fallback 內容' }
        ]
    })

    useHead({
        title: 'DevOnly 元件',
        meta: [
            { name: 'description', content: 'DevOnly 元件教學：如何在開發環境顯示除錯工具，並確保這些程式碼在生產環境建置時被完全移除 (Tree Shaking)。' }
        ]
    })
</script>

<template>
    <TutorialPage title="DevOnly 元件"
        description="DevOnly 元件的內容只會在開發環境 (Development Mode) 下渲染。在生產環境 (Production) 建置時，這些內容會被完全移除，不會增加 Bundle Size。"
        :badges="[{ label: 'Tree Shaking', color: 'primary' }, { label: 'Debug Tools', color: 'neutral' }]">

        <!-- 1. Concept -->
        <TutorialSection id="concept" title="核心概念" icon="heroicons:eye" separator>
            <p>
                <code class="text-emerald-400">&lt;DevOnly&gt;</code> 就像是一個智慧過濾器。
                它不僅僅是隱藏內容 (`display: none`)，而是從最終的 JavaScript Bundle 中<strong>徹底刪除</strong>該段程式碼。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- Dev Mode -->
                <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                    <div class="flex items-center justify-between mb-4">
                        <div class="text-xs font-bold text-blue-400 uppercase flex items-center gap-2">
                            <Icon name="heroicons:command-line" />
                            Development
                        </div>
                        <div class="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-mono">npm run dev</div>
                    </div>
                    <div class="space-y-2">
                        <div class="h-8 bg-slate-800 rounded w-3/4"></div>
                        <div class="h-8 bg-slate-800 rounded w-1/2"></div>
                        <div
                            class="h-12 bg-red-500/20 border border-red-500/50 rounded flex items-center justify-center text-red-400 font-mono text-sm">
                            &lt;DebugPanel /&gt;
                        </div>
                    </div>
                </div>

                <!-- Prod Mode -->
                <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                    <div class="flex items-center justify-between mb-4">
                        <div class="text-xs font-bold text-emerald-400 uppercase flex items-center gap-2">
                            <Icon name="heroicons:cube" />
                            Production
                        </div>
                        <div class="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono">npm run
                            build</div>
                    </div>
                    <div class="space-y-2">
                        <div class="h-8 bg-slate-800 rounded w-3/4"></div>
                        <div class="h-8 bg-slate-800 rounded w-1/2"></div>
                        <div
                            class="h-12 border border-dashed border-slate-700 rounded flex items-center justify-center text-slate-600 font-mono text-sm">
                            (Removed)
                        </div>
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- 2. Usage -->
        <TutorialSection id="usage" title="基本用法" icon="heroicons:code-bracket" separator>
            <p>
                這對於顯示 API 測試按鈕、狀態檢視器或開發中的功能非常有用。
            </p>

            <AppCodeBlock code="<template>
  <nav>
    <NuxtLink to=&quot;/&quot;>Home</NuxtLink>
    <NuxtLink to=&quot;/about&quot;>About</NuxtLink>
    
    <!-- 這個按鈕只會在開發時出現 -->
    <DevOnly>
      <button @click=&quot;clearCache&quot; class=&quot;bg-red-500&quot;>
        Clear Cache (Debug)
      </button>
    </DevOnly>
  </nav>
</template>" lang="vue" />
        </TutorialSection>

        <!-- 3. Fallback -->
        <TutorialSection id="fallback" title="Fallback 內容" icon="heroicons:arrow-path-rounded-square">
            <p>
                你可以使用 <code class="text-emerald-400">#fallback</code> slot
                來指定在生產環境中顯示的替代內容。這在開發「即將推出」的功能時很有用。
            </p>

            <AppCodeBlock code="<template>
  <DevOnly>
    <!-- 開發者看到的是新版後台 -->
    <NewAdminDashboard />
    
    <template #fallback>
      <!-- 一般使用者看到的是舊版後台 -->
      <LegacyAdminDashboard />
    </template>
  </DevOnly>
</template>" lang="vue" />
        </TutorialSection>

    </TutorialPage>
</template>
