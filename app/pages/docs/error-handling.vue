<script setup lang="ts">
definePageMeta({
  layout: 'docs',
  toc: [
    { id: 'overview', label: '錯誤處理流程' },
    { id: 'throwing', label: '拋出錯誤' },
    { id: 'boundary', label: '錯誤邊界' },
    { id: 'error-page', label: '全域錯誤頁面' }
  ]
})

useHead({
  title: '錯誤處理 (Error Handling)',
  meta: [
    { name: 'description', content: 'Nuxt 4 錯誤處理全攻略：從 API 錯誤到客戶端崩潰，掌握 createError, showError 與 NuxtErrorBoundary。' }
  ]
})
</script>

<template>
  <TutorialPage 
    title="錯誤處理" 
    description="在全端應用程式中，錯誤可能發生在伺服器端 (API, Middleware) 或客戶端 (Vue Components)。Nuxt 提供了一套完整的機制來捕捉並優雅地處理這些錯誤。"
    :badges="[{ label: 'Resilience', color: 'primary' }, { label: 'UX', color: 'neutral' }]"
  >

    <!-- 1. Overview -->
    <TutorialSection id="overview" title="錯誤處理流程" icon="heroicons:arrow-path-rounded-square" separator>
      <p class="mb-6">
        理解錯誤發生的位置至關重要。伺服器端錯誤通常需要顯示全頁錯誤畫面 (Full Page Error)，而客戶端錯誤則可以透過錯誤邊界 (Error Boundary) 進行局部處理，避免整個頁面崩潰。
      </p>
      
      <ErrorFlow class="mb-8" />
    </TutorialSection>

    <!-- 2. Throwing Errors -->
    <TutorialSection id="throwing" title="拋出錯誤" icon="heroicons:exclamation-triangle" separator>
      <p>
        使用 <code class="text-emerald-400">createError</code> 來建立錯誤物件。這在 API 路由或 Middleware 中特別有用。
      </p>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <div class="flex items-center justify-between px-2">
            <span class="text-xs font-bold text-slate-500 uppercase">server/api/test.ts</span>
          </div>
          <AppCodeBlock code="export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID is required'
    })
  }
})" lang="typescript" filename="server/api/test.ts" />
        </div>

        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <h4 class="font-bold text-white mb-2">createError vs showError</h4>
            <ul class="space-y-2 text-sm text-slate-400">
              <li class="flex gap-2">
                <Icon name="heroicons:check" class="w-5 h-5 text-emerald-500 shrink-0" />
                <span><strong>createError</strong>: 建立錯誤物件，通常用於 throw 或返回。</span>
              </li>
              <li class="flex gap-2">
                <Icon name="heroicons:check" class="w-5 h-5 text-emerald-500 shrink-0" />
                <span><strong>showError</strong>: 立即導航到錯誤頁面 (Client-side)。</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </TutorialSection>

    <!-- 3. Error Boundary -->
    <TutorialSection id="boundary" title="錯誤邊界" icon="heroicons:shield-check" separator>
      <p>
        <code class="text-emerald-400">&lt;NuxtErrorBoundary&gt;</code> 允許你捕捉元件樹中的錯誤，並顯示備用 UI (Fallback)，而不是讓整個應用程式崩潰。
      </p>

      <AppCodeBlock code="<template>
  <NuxtErrorBoundary>
    <!-- 可能出錯的元件 -->
    <VideoPlayer />

    <!-- 錯誤發生時顯示的內容 -->
    <template #error=&quot;{ error, clearError }&quot;>
      <div class=&quot;error-card&quot;>
        <p>影片載入失敗: {{ error.message }}</p>
        <button @click=&quot;clearError&quot;>重試</button>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>" lang="vue" />
    </TutorialSection>

    <!-- 4. Error Page -->
    <TutorialSection id="error-page" title="全域錯誤頁面" icon="heroicons:document-minus">
      <p>
        當發生未捕獲的致命錯誤 (Fatal Error) 時，Nuxt 會渲染 <code class="text-white">error.vue</code>。
        這是一個位於專案根目錄的特殊頁面。
      </p>

      <AppCodeBlock code="<script setup lang=&quot;ts&quot;>
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class=&quot;h-screen flex flex-col items-center justify-center&quot;>
    <h1 class=&quot;text-9xl font-bold text-emerald-500&quot;>{{ error.statusCode }}</h1>
    <p class=&quot;text-xl text-slate-400 mt-4&quot;>{{ error.statusMessage }}</p>
    <button @click=&quot;handleError&quot; class=&quot;mt-8 btn-primary&quot;>
      Go Home
    </button>
  </div>
</template>" lang="vue" filename="error.vue" />
    </TutorialSection>

  </TutorialPage>
</template>
