<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'usage', label: '手動控制' },
            { id: 'nested', label: '巢狀佈局' }
        ]
    })

    useHead({
        title: 'NuxtLayout',
        meta: [
            { name: 'description', content: 'NuxtLayout 元件教學：如何手動控制佈局渲染、實作巢狀佈局 (Nested Layouts)，以及動態切換佈局。' }
        ]
    })
</script>

<template>
    <TutorialPage title="NuxtLayout"
        description="NuxtLayout 是用於渲染佈局的元件。雖然 Nuxt 會自動處理佈局，但在某些進階場景下，你可能需要手動控制佈局的渲染位置或巢狀結構。"
        :badges="[{ label: 'Structure', color: 'primary' }, { label: 'Flexibility', color: 'neutral' }]">

        <!-- 1. Concept -->
        <TutorialSection id="concept" title="核心概念" icon="heroicons:rectangle-group" separator>
            <p>
                在 <code class="text-emerald-400">app.vue</code> 中，<code
                    class="text-emerald-400">&lt;NuxtLayout&gt;</code>
                負責載入並渲染 <code class="text-emerald-400">layouts/</code> 目錄下的檔案。
                它就像是一個容器，把頁面內容 (<code class="text-emerald-400">&lt;NuxtPage&gt;</code>) 包裹起來。
            </p>

            <AppWindow title="Layout Structure" icon="heroicons:square-3-stack-3d" class="w-full">
                <div class="p-8 bg-slate-950 flex justify-center">
                    <div
                        class="relative w-64 h-48 bg-slate-900 border border-slate-700 rounded-lg p-4 flex flex-col gap-2 shadow-xl">
                        <div class="text-xs font-bold text-slate-500 absolute -top-3 left-4 bg-slate-950 px-2">app.vue
                        </div>

                        <!-- NuxtLayout -->
                        <div
                            class="flex-1 border-2 border-dashed border-emerald-500/30 rounded bg-emerald-950/10 p-3 flex flex-col gap-2 relative">
                            <div class="text-xs font-bold text-emerald-500 absolute -top-3 left-2 bg-slate-950 px-2">
                                &lt;NuxtLayout&gt;</div>

                            <!-- Layout File Content -->
                            <div class="h-4 bg-emerald-500/20 rounded w-full"></div>

                            <!-- Slot / NuxtPage -->
                            <div
                                class="flex-1 border border-blue-500/30 rounded bg-blue-950/10 flex items-center justify-center text-xs text-blue-400">
                                &lt;slot /&gt; (NuxtPage)
                            </div>

                            <div class="h-4 bg-emerald-500/20 rounded w-full"></div>
                        </div>
                    </div>
                </div>
            </AppWindow>
        </TutorialSection>

        <!-- 2. Manual Usage -->
        <TutorialSection id="usage" title="手動控制" icon="heroicons:adjustments-horizontal" separator>
            <p>
                你可以透過 <code class="text-emerald-400">name</code> prop 強制指定要使用的佈局。
                這允許你在同一個頁面中使用多個佈局，或是根據狀態動態切換。
            </p>

            <AppCodeBlock code="<template>
  <div>
    <!-- 強制使用 layouts/custom.vue -->
    <NuxtLayout name=&quot;custom&quot;>
      <template #header>
        <h1>自定義標題</h1>
      </template>

<SomeComponent />
</NuxtLayout>

<!-- 根據狀態切換 -->
<NuxtLayout :name=&quot;isAdmin ? 'admin' : 'default' &quot;>
    <NuxtPage />
</NuxtLayout>
</div>
</template>" lang="vue" />
        </TutorialSection>

        <!-- 3. Nested Layouts -->
        <TutorialSection id="nested" title="巢狀佈局" icon="heroicons:squares-plus">
            <p>
                有時候你需要「佈局中的佈局」。例如：整個網站有通用的 Header/Footer，
                但在「會員中心」區塊又需要一個獨立的側邊欄。這時就可以使用巢狀佈局。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <div class="text-sm font-bold text-slate-400">app.vue (Outer Layout)</div>
                    <AppCodeBlock code="<template>
  <NuxtLayout name=&quot;default&quot;>
    <NuxtPage />
  </NuxtLayout>
</template>" lang="vue" />
                </div>

                <div class="space-y-4">
                    <div class="text-sm font-bold text-slate-400">pages/user.vue (Inner Layout)</div>
                    <AppCodeBlock code="<template>
  <!-- 這裡再包一層 -->
  <NuxtLayout name=&quot;sidebar&quot;>
    <UserProfile />
    <UserSettings />
  </NuxtLayout>
</template>" lang="vue" />
                </div>
            </div>

            <div class="mt-6 p-4 bg-slate-900 rounded-lg border border-slate-800 flex justify-center">
                <!-- Visual Representation of Nested Layouts -->
                <div class="w-64 h-48 bg-slate-800 border border-slate-600 rounded flex flex-col relative">
                    <div class="absolute top-1 left-2 text-xs text-slate-400">Default Layout</div>
                    <div class="h-6 border-b border-slate-600 bg-slate-700/50 w-full"></div> <!-- Header -->

                    <div class="flex-1 p-2">
                        <div class="w-full h-full bg-slate-900 border border-emerald-500/50 rounded flex relative">
                            <div class="absolute top-1 left-2 text-xs text-emerald-500">Sidebar Layout</div>
                            <div class="w-1/4 border-r border-emerald-500/30 bg-emerald-950/10 h-full"></div>
                            <!-- Sidebar -->
                            <div class="flex-1 bg-blue-950/10 flex items-center justify-center text-xs text-blue-400">
                                Page Content
                            </div>
                        </div>
                    </div>

                    <div class="h-6 border-t border-slate-600 bg-slate-700/50 w-full"></div> <!-- Footer -->
                </div>
            </div>
        </TutorialSection>

    </TutorialPage>
</template>
