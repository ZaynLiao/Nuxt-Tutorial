<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'structure', label: '目錄結構' },
            { id: 'usage', label: '使用方式' },
            { id: 'dynamic', label: '動態切換' }
        ]
    })

    useHead({
        title: '佈局系統 (Layouts)',
        meta: [
            { name: 'description', content: 'Nuxt 4 佈局系統教學：如何建立可重複使用的頁面骨架，管理 Header、Footer 與側邊欄。' }
        ]
    })
</script>

<template>
    <DocsPage title="佈局系統" description="Layouts 是 Nuxt 應用程式的骨架。它們允許你定義跨頁面共用的結構（如導覽列、側邊欄、頁尾），避免在每個頁面重複撰寫相同的程式碼。"
        :badges="[{ label: 'UI Architecture', color: 'primary' }, { label: 'DRY Principle', color: 'neutral' }]">

        <!-- 1. Concept: Anatomy of a Layout -->
        <DocsSection id="concept" title="核心概念" icon="heroicons:cube-transparent" separator>
            <p>
                佈局 (Layout) 是一個<strong>包覆器 (Wrapper)</strong>。它將頁面內容 (Page Content) 包裹在共用的 UI 結構中。
                關鍵在於 <code class="text-emerald-400">&lt;slot /&gt;</code>，這是頁面內容被注入的地方。
            </p>

            <UiWindow title="Layout Anatomy" icon="heroicons:eye" class="w-full">
                <div class="p-8 bg-slate-950 flex justify-center">
                    <!-- Visual Representation -->
                    <div
                        class="w-full max-w-md aspect-video bg-slate-900 rounded-xl border border-slate-800 flex flex-col overflow-hidden shadow-2xl relative">

                        <!-- Header -->
                        <div class="h-12 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2">
                            <div class="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div class="w-20 h-2 rounded-full bg-slate-700 ml-4"></div>
                            <div class="absolute right-4 top-4 text-xs font-mono text-slate-500">Header</div>
                        </div>

                        <div class="flex-1 flex">
                            <!-- Sidebar -->
                            <div
                                class="w-16 bg-slate-800/50 border-r border-slate-700 flex flex-col items-center py-4 gap-3">
                                <div class="w-8 h-8 rounded bg-slate-700/50"></div>
                                <div class="w-8 h-8 rounded bg-slate-700/50"></div>
                                <div class="w-8 h-8 rounded bg-slate-700/50"></div>
                                <div class="mt-auto text-xs font-mono text-slate-500 -rotate-90 whitespace-nowrap">
                                    Sidebar</div>
                            </div>

                            <!-- Page Content (Slot) -->
                            <div class="flex-1 p-4 bg-slate-950/50 relative group">
                                <div
                                    class="absolute inset-0 border-2 border-dashed border-emerald-500/30 m-2 rounded-lg flex flex-col items-center justify-center bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors">
                                    <Icon name="heroicons:arrow-down-tray"
                                        class="w-8 h-8 text-emerald-500 mb-2 mx-auto text-xl" />
                                    <div class="text-center">
                                        <span class="text-emerald-400 font-bold font-mono">&lt;slot /&gt;</span>
                                        <p class="text-xs text-emerald-300/70 mt-1">Page Content Injected Here</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div class="h-8 bg-slate-800 border-t border-slate-700 flex items-center justify-center">
                            <div class="w-32 h-1.5 rounded-full bg-slate-700"></div>
                            <div class="absolute right-4 bottom-2 text-xs font-mono text-slate-500">Footer</div>
                        </div>
                    </div>
                </div>
            </UiWindow>
        </DocsSection>

        <!-- 2. Directory Structure -->
        <DocsSection id="structure" title="目錄結構" icon="heroicons:folder" separator>
            <p>
                Nuxt 會自動掃描 <code class="text-emerald-400">layouts/</code> 目錄。
                <code class="text-white">default.vue</code> 是預設佈局，會自動應用於所有未指定佈局的頁面。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <UiWindow title="File Structure" type="code" class="h-full">
                    <div class="p-2">
                        <UiFileTree :files="[
                            {
                                name: 'app/',
                                icon: 'heroicons:folder-open',
                                color: 'slate',
                                children: [
                                    {
                                        name: 'layouts/',
                                        icon: 'heroicons:folder-open',
                                        color: 'emerald',
                                        children: [
                                            { name: 'default.vue', icon: 'logos:vue', badge: { text: '預設佈局', color: 'slate' } },
                                            { name: 'auth.vue', icon: 'logos:vue', badge: { text: '登入/註冊專用', color: 'slate' } },
                                            { name: 'docs.vue', icon: 'logos:vue', badge: { text: '文件專用', color: 'slate' } }
                                        ]
                                    }
                                ]
                            }
                        ]" />
                    </div>
                </UiWindow>

                <div class="space-y-4">
                    <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                        <h4 class="font-bold text-white mb-2 flex items-center gap-2">
                            <Icon name="heroicons:information-circle" class="text-emerald-400" />
                            命名規則
                        </h4>
                        <p class="text-sm text-slate-400">
                            佈局檔案名稱即為其 ID。例如 <code
                                class="text-xs bg-slate-800 px-1 rounded">layouts/custom-layout.vue</code>
                            的 ID 為 <code class="text-emerald-400">'custom-layout'</code>。
                        </p>
                    </div>
                    <div class="p-4 rounded-xl bg-amber-950/10 border border-amber-500/20">
                        <h4 class="font-bold text-amber-400 mb-2 flex items-center gap-2">
                            <Icon name="heroicons:exclamation-triangle" />
                            注意
                        </h4>
                        <p class="text-sm text-amber-200/70">
                            佈局檔案中<strong>必須</strong>包含單一根元素 (Single Root Element)，且必須包含 <code
                                class="text-xs bg-amber-900/50 px-1 rounded">&lt;slot /&gt;</code>。
                        </p>
                    </div>
                </div>
            </div>
        </DocsSection>

        <!-- 3. Usage -->
        <DocsSection id="usage" title="使用方式" icon="heroicons:code-bracket" separator>
            <p>
                在頁面元件中使用 <code class="text-emerald-400">definePageMeta</code> 來指定該頁面要使用的佈局。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- Layout Definition -->
                <div class="space-y-2">
                    <div class="flex items-center justify-between px-2">
                        <span class="text-xs font-bold text-slate-500 uppercase">layouts/auth.vue</span>
                    </div>
                    <UiCodeBlock code="<template>
  <div class=&quot;h-screen flex items-center justify-center bg-slate-900&quot;>
    <div class=&quot;w-full max-w-md p-8 bg-slate-800 rounded-xl&quot;>
      <!-- 這裡插入登入表單 -->
      <slot />
    </div>
  </div>
</template>" lang="vue" filename="layouts/auth.vue" />
                </div>

                <!-- Page Usage -->
                <div class="space-y-2">
                    <div class="flex items-center justify-between px-2">
                        <span class="text-xs font-bold text-emerald-500 uppercase">pages/login.vue</span>
                    </div>
                    <UiCodeBlock code="<script setup>
definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <form>
    <h1>Login</h1>
    <!-- ... -->
  </form>
</template>" lang="vue" filename="pages/login.vue" />
                </div>
            </div>
        </DocsSection>

        <!-- 4. Dynamic Switching -->
        <DocsSection id="dynamic" title="動態切換" icon="heroicons:arrow-path">
            <p class="mb-6">
                有時你需要根據使用者狀態（例如是否登入）來動態改變佈局。
                可以使用 <code class="text-emerald-400">setPageLayout</code> 函式。
                試著點擊下方的按鈕，觀察佈局如何即時切換：
            </p>

            <DemoLayoutSwitcher class="mb-8" />

            <UiCodeBlock code="<script setup>
const user = useUser()

function toggleLayout() {
  // 動態切換佈局
  setPageLayout(user.value.isLoggedIn ? 'default' : 'auth')
}
</script>

<template>
  <div>
    <button @click=&quot;toggleLayout&quot;>
      Switch Layout
    </button>
  </div>
</template>" lang="vue" />

            <div class="mt-6 p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex gap-4">
                <div class="p-2 bg-slate-800 rounded-lg h-fit">
                    <Icon name="heroicons:light-bulb" class="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                    <h4 class="font-bold text-white mb-1">進階技巧：Per-Component Layout</h4>
                    <p class="text-sm text-slate-400 mb-2">
                        如果你需要完全控制佈局的渲染位置，可以使用 <code class="text-emerald-400">&lt;NuxtLayout&gt;</code> 元件。
                        這在處理巢狀佈局或複雜的轉場動畫時非常有用。
                    </p>
                    <UiCodeBlock code="<template>
  <NuxtLayout name=&quot;custom&quot;>
    <template #header>...</template>
    <SomeComponent />
  </NuxtLayout>
</template>" lang="vue" class="mt-2" />
                </div>
            </div>
        </DocsSection>

    </DocsPage>
</template>
