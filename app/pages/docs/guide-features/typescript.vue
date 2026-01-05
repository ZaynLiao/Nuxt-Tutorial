<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'why-ts', label: '為什麼選擇 TypeScript？' },
            { id: 'type-check', label: '型別檢查' },
            { id: 'api-typing', label: 'API 型別安全' },
            { id: 'component-props', label: '元件 Props' }
        ]
    })

    useHead({
        title: 'TypeScript 支援',
        meta: [
            { name: 'description', content: 'Nuxt 4 TypeScript 指南：全端型別安全、API 回傳值自動推斷、以及如何在 Vue 元件中正確定義 Props 型別。' }
        ]
    })
</script>

<template>
    <TutorialPage title="TypeScript 支援"
        description="Nuxt 4 是用 TypeScript 構建的，並提供了一流的 TypeScript 支援。從自動生成的型別定義到全端型別安全，讓您的開發體驗更上一層樓。"
        :badges="[{ label: 'Strict Mode', color: 'primary' }, { label: 'Type Safety', color: 'neutral' }]">

        <!-- Section 1: Why TS -->
        <TutorialSection id="why-ts" title="為什麼選擇 TypeScript？" icon="logos:typescript-icon" separator>
            <p class="text-slate-400 leading-relaxed mb-6">
                TypeScript 不僅僅是為了找 Bug，它提供了強大的 IDE 支援 (自動完成、重構)，讓開發過程更加流暢。Nuxt 會自動生成 <code
                    class="text-emerald-400">.nuxt/tsconfig.json</code>，為您的專案提供完整的環境型別。
            </p>

            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800/50">
                <h4 class="text-white font-medium mb-2 text-sm">Takeover Mode</h4>
                <p class="text-sm text-slate-400">
                    為了獲得最佳效能，建議在 VS Code 中啟用 <strong class="text-emerald-400">Volar (Vue Language Features)</strong>
                    擴充套件，並停用內建的 TypeScript 服務 (Takeover Mode)。
                </p>
            </div>
        </TutorialSection>

        <!-- Section 2: Type Check -->
        <TutorialSection id="type-check" title="型別檢查" icon="heroicons:check-badge" separator>
            <p class="text-slate-400 mb-6">
                Nuxt 的開發伺服器預設不會執行型別檢查 (為了速度)。要啟用即時型別檢查或在建置時檢查，請安裝 <code class="text-emerald-400">vue-tsc</code>。
            </p>

            <AppCodeBlock language="bash" :code="`pnpm add -D vue-tsc typescript`" filename="Terminal" />

            <p class="text-slate-400 my-4">
                在 <code class="text-emerald-400">nuxt.config.ts</code> 中啟用：
            </p>

            <AppCodeBlock language="typescript" :code="`export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
    strict: true
  }
})`" filename="nuxt.config.ts" />
        </TutorialSection>

        <!-- Section 3: API Typing -->
        <TutorialSection id="api-typing" title="API 型別安全" icon="heroicons:server-stack" separator>
            <p class="text-slate-400 mb-6">
                這是 Nuxt 最強大的功能之一。當您使用 <code class="text-emerald-400">useFetch</code> 呼叫內部 API 時，Nuxt
                會自動推斷回傳值的型別，無需手動定義介面。
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div class="text-xs font-mono text-slate-500 mb-2">server/api/user.ts</div>
                    <AppCodeBlock language="typescript" :code="`export default defineEventHandler(() => {
  return {
    id: 1,
    name: 'Zayn',
    role: 'admin' as const
  }
})`" filename="Server" />
                </div>
                <div>
                    <div class="text-xs font-mono text-slate-500 mb-2">app.vue</div>
                    <AppCodeBlock language="typescript" :code="`const { data } = await useFetch('/api/user')

// IDE 會自動提示 data.value.name (string)
// data.value.role 的型別是 'admin'
console.log(data.value?.name)`" filename="Client" />
                </div>
            </div>
        </TutorialSection>

        <!-- Section 4: Component Props -->
        <TutorialSection id="component-props" title="元件 Props" icon="heroicons:code-bracket" separator>
            <p class="text-slate-400 mb-6">
                使用 <code class="text-emerald-400">defineProps</code> 搭配 TypeScript 介面，可以獲得完美的 Props 型別提示。
            </p>

            <AppCodeBlock language="vue" :code="`<script setup lang=&quot;ts&quot;>
interface Props {
  title: string
  count?: number
  user: {
    id: number
    name: string
  }
}

// 使用 withDefaults 設定預設值
const props = withDefaults(defineProps<Props>(), {
  count: 0
})
</script>`" filename="components/MyComponent.vue" />
        </TutorialSection>

    </TutorialPage>
</template>