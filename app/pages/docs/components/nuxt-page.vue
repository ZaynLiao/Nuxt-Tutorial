<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'key', label: 'Page Key (重新渲染)' },
            { id: 'props', label: '傳遞 Props' },
            { id: 'transition', label: '頁面轉場' }
        ]
    })

    useHead({
        title: 'NuxtPage',
        meta: [
            { name: 'description', content: 'NuxtPage 元件教學：Nuxt 路由系統的渲染出口，如何控制頁面重新渲染 (pageKey)，傳遞 Props，以及設定頁面轉場動畫。' }
        ]
    })
</script>

<template>
    <TutorialPage title="NuxtPage"
        description="NuxtPage 是 Nuxt 路由系統的渲染出口，相當於 Vue Router 的 <router-view>。它負責顯示目前路由對應的 pages/ 元件。"
        :badges="[{ label: 'Routing', color: 'primary' }, { label: 'Core', color: 'neutral' }]">

        <!-- 1. Concept -->
        <TutorialSection id="concept" title="核心概念" icon="heroicons:computer-desktop" separator>
            <p>
                <code class="text-emerald-400">&lt;NuxtPage&gt;</code> 就像是一個畫框。
                當網址改變時，Nuxt 會自動把對應的 <code class="text-emerald-400">pages/*.vue</code> 內容「畫」在這個框框裡。
            </p>

            <AppWindow title="Routing Mechanism" icon="heroicons:map" class="w-full">
                <div class="p-8 bg-slate-950 flex flex-col md:flex-row items-center justify-between gap-8">
                    <!-- URL Bar -->
                    <div class="flex flex-col gap-4 w-full md:w-1/3">
                        <div
                            class="bg-slate-900 border border-slate-700 rounded p-2 flex items-center gap-2 text-xs font-mono text-slate-400">
                            <Icon name="heroicons:globe-alt" />
                            /users/1
                        </div>
                        <div class="flex justify-center">
                            <Icon name="heroicons:arrow-down" class="text-slate-600 md:hidden" />
                            <Icon name="heroicons:arrow-right" class="text-slate-600 hidden md:block" />
                        </div>
                    </div>

                    <!-- NuxtPage Container -->
                    <div
                        class="flex-1 w-full border-2 border-dashed border-emerald-500/30 rounded-lg bg-emerald-950/10 p-4 relative">
                        <div class="absolute -top-3 left-4 bg-slate-950 px-2 text-xs font-bold text-emerald-500">
                            &lt;NuxtPage /&gt;
                        </div>

                        <!-- Rendered Content -->
                        <div class="bg-slate-900 border border-slate-800 rounded p-4 space-y-2">
                            <div class="h-4 bg-slate-800 rounded w-1/3"></div>
                            <div class="h-20 bg-slate-800 rounded w-full"></div>
                            <div class="text-xs text-slate-500 text-right">pages/users/[id].vue</div>
                        </div>
                    </div>
                </div>
            </AppWindow>
        </TutorialSection>

        <!-- 2. Page Key -->
        <TutorialSection id="key" title="Page Key (重新渲染)" icon="heroicons:arrow-path" separator>
            <p>
                預設情況下，當路由參數改變（例如從 <code class="text-blue-400">/users/1</code> 到 <code
                    class="text-blue-400">/users/2</code>）時，
                Nuxt <strong>不會</strong>銷毀並重新建立元件，而是重複使用同一個實例（為了效能）。
                如果你希望強制重新渲染，可以使用 <code class="text-emerald-400">pageKey</code>。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <div class="text-sm font-bold text-slate-400">Default Behavior (Reuse)</div>
                    <AppCodeBlock code="<template>
  <!-- 參數變了，但元件不變 -->
  <!-- onMounted 不會再次執行 -->
  <NuxtPage />
</template>" lang="vue" />
                </div>

                <div class="space-y-4">
                    <div class="text-sm font-bold text-emerald-400">Force Re-render</div>
                    <AppCodeBlock code="<template>
  <!-- 參數變了，元件銷毀重建 -->
  <!-- onMounted 會再次執行 -->
  <NuxtPage 
    :page-key=&quot;route => route.fullPath&quot; 
  />
</template>" lang="vue" />
                </div>
            </div>
        </TutorialSection>

        <!-- 3. Props -->
        <TutorialSection id="props" title="傳遞 Props" icon="heroicons:cube-transparent" separator>
            <p>
                你可以傳遞 props 給 <code class="text-emerald-400">&lt;NuxtPage&gt;</code>，這些 props 會被傳遞給當前渲染的頁面元件。
                這在共用佈局中傳遞全域資料時很有用。
            </p>

            <AppCodeBlock code="<template>
  <div>
    <NuxtLayout>
      <!-- 所有頁面都會收到 user prop -->
      <NuxtPage :user=&quot;currentUser&quot; />
    </NuxtLayout>
  </div>
</template>" lang="vue" />
        </TutorialSection>

        <!-- 4. Transition -->
        <TutorialSection id="transition" title="頁面轉場" icon="heroicons:film">
            <p>
                <code class="text-emerald-400">&lt;NuxtPage&gt;</code> 內建了對 Vue Transition 的支援。
                你可以透過 <code class="text-emerald-400">transition</code> prop 設定全域轉場，或在個別頁面中使用 <code
                    class="text-emerald-400">definePageMeta</code> 設定。
            </p>

            <AppCodeBlock code="<template>
  <!-- 全域設定 -->
  <NuxtPage transition=&quot;page&quot; />
</template>

<style>
/* 定義轉場動畫 */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>" lang="vue" />
        </TutorialSection>

    </TutorialPage>
</template>
