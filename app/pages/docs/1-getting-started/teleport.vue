<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'problem', label: '為什麼需要它？' },
            { id: 'usage', label: '基本用法' },
            { id: 'ssr', label: 'SSR 注意事項' }
        ]
    })

    useHead({
        title: 'Teleport',
        meta: [
            { name: 'description', content: 'Vue Teleport 教學：如何將 Modal 或 Tooltip 的 DOM 結構傳送到 body 標籤底部，解決 z-index 與 overflow: hidden 的問題。' }
        ]
    })
</script>

<template>
    <TutorialPage title="Teleport"
        description="Teleport 是 Vue 3 的內建元件，允許你將元件的 DOM 結構「傳送」到 DOM Tree 的其他位置（例如 body 標籤底部），這對於 Modal、Tooltip 或 Toast 通知非常有用。"
        :badges="[{ label: 'DOM Portal', color: 'primary' }, { label: 'UI Overlay', color: 'neutral' }]">

        <!-- 1. Concept -->
        <TutorialSection id="concept" title="核心概念" icon="heroicons:paper-airplane" separator>
            <p>
                想像一個「任意門」。你在元件 A 裡面寫了一段 HTML，但你希望它實際出現在網頁的最外層（通常是 <code class="text-emerald-400">&lt;body&gt;</code>）。
                這就是 <code class="text-emerald-400">&lt;Teleport&gt;</code> 的功能。
            </p>

            <AppWindow title="DOM Structure" icon="heroicons:code-bracket" class="w-full">
                <div class="p-6 bg-slate-950 flex flex-col gap-4">
                    <!-- Body -->
                    <div class="border border-slate-700 rounded p-4 relative">
                        <div class="text-xs font-bold text-slate-500 absolute -top-3 left-4 bg-slate-950 px-2">
                            &lt;body&gt;</div>

                        <!-- App -->
                        <div class="border border-slate-700 rounded p-4 mt-2 relative">
                            <div class="text-xs font-bold text-slate-500 absolute -top-3 left-4 bg-slate-950 px-2">#app
                            </div>

                            <!-- Component -->
                            <div class="border border-blue-500/30 bg-blue-950/10 rounded p-4 mt-2 relative">
                                <div class="text-xs font-bold text-blue-400 absolute -top-3 left-4 bg-slate-950 px-2">
                                    MyComponent.vue</div>
                                <div class="text-sm text-blue-300 mb-2">I am here logically.</div>

                                <!-- Teleport Source -->
                                <div
                                    class="border-2 border-dashed border-emerald-500/50 rounded p-2 text-xs text-emerald-400 flex items-center gap-2">
                                    <Icon name="heroicons:paper-airplane" />
                                    &lt;Teleport to="body"&gt;
                                </div>
                            </div>
                        </div>

                        <!-- Teleport Target -->
                        <div
                            class="border-2 border-emerald-500 rounded p-4 mt-4 bg-emerald-950/20 relative shadow-lg shadow-emerald-500/20">
                            <div class="text-xs font-bold text-emerald-500 absolute -top-3 left-4 bg-slate-950 px-2">
                                Rendered Result</div>
                            <div class="text-sm text-emerald-300">I appear here physically! (Modal/Toast)</div>
                        </div>
                    </div>
                </div>
            </AppWindow>
        </TutorialSection>

        <!-- 2. The Problem -->
        <TutorialSection id="problem" title="為什麼需要它？" icon="heroicons:question-mark-circle" separator>
            <p>
                如果沒有 Teleport，當你在一個 <code class="text-red-400">overflow: hidden</code> 或 <code
                    class="text-red-400">z-index</code> 較低的父元件中開啟 Modal 時，
                Modal 可能會被切掉或被其他內容遮住。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- Bad Case -->
                <div class="p-6 rounded-2xl bg-red-950/10 border border-red-500/20 overflow-hidden relative h-48">
                    <div class="text-xs font-bold text-red-400 uppercase mb-4 absolute top-4 left-4 z-10">Without
                        Teleport</div>

                    <!-- Parent with overflow hidden -->
                    <div
                        class="absolute top-12 left-12 w-32 h-24 bg-slate-800 border border-slate-700 overflow-hidden rounded">
                        <div class="p-2 text-xs text-slate-500">Parent (overflow: hidden)</div>

                        <!-- Modal (Clipped) -->
                        <div class="absolute top-8 left-8 w-40 h-32 bg-red-500 text-white p-2 rounded shadow-xl">
                            Clipped Modal
                        </div>
                    </div>
                </div>

                <!-- Good Case -->
                <div class="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/20 relative h-48">
                    <div class="text-xs font-bold text-emerald-500 uppercase mb-4 absolute top-4 left-4 z-10">With
                        Teleport</div>

                    <!-- Parent -->
                    <div
                        class="absolute top-12 left-12 w-32 h-24 bg-slate-800 border border-slate-700 overflow-hidden rounded">
                        <div class="p-2 text-xs text-slate-500">Parent</div>
                    </div>

                    <!-- Modal (Teleported) -->
                    <div
                        class="absolute top-8 left-24 w-40 h-32 bg-emerald-500 text-emerald-950 font-bold p-4 rounded shadow-xl z-50 flex items-center justify-center">
                        Full Visible Modal
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- 3. Usage -->
        <TutorialSection id="usage" title="基本用法" icon="heroicons:code-bracket" separator>
            <p>
                使用 <code class="text-emerald-400">to</code> prop 指定目標選擇器 (通常是 <code
                    class="text-emerald-400">body</code>)。
            </p>

            <AppCodeBlock code="<template>
  <button @click=&quot;open = true&quot;>開啟 Modal</button>

  <!-- 將內容傳送到 body 標籤的最後面 -->
  <Teleport to=&quot;body&quot;>
    <div v-if=&quot;open&quot; class=&quot;fixed inset-0 bg-black/50 flex items-center justify-center z-50&quot;>
      <div class=&quot;bg-slate-900 p-8 rounded border border-slate-700&quot;>
        <h2>我是 Modal</h2>
        <button @click=&quot;open = false&quot;>關閉</button>
      </div>
    </div>
  </Teleport>
</template>" lang="vue" />
        </TutorialSection>

        <!-- 4. SSR Caveat -->
        <TutorialSection id="ssr" title="SSR 注意事項" icon="heroicons:exclamation-triangle">
            <p>
                <code class="text-emerald-400">&lt;Teleport&gt;</code> 只能在客戶端運作（因為伺服器端沒有 DOM）。
                Nuxt 會自動處理這個問題，但為了保險起見，建議將 Teleport 包裹在 <code class="text-emerald-400">&lt;ClientOnly&gt;</code> 中，
                或者確保目標元素在掛載時已經存在。
            </p>

            <AppCodeBlock code="<template>
  <ClientOnly>
    <Teleport to=&quot;body&quot;>
      <Modal />
    </Teleport>
  </ClientOnly>
</template>" lang="vue" />
        </TutorialSection>

    </TutorialPage>
</template>
