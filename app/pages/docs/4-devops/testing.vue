<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'why-testing', label: '為什麼要測試？' },
            { id: 'setup', label: '環境建置' },
            { id: 'unit-testing', label: '單元測試' },
            { id: 'e2e-testing', label: 'E2E 測試' }
        ]
    })

    useHead({
        title: '測試 (Testing)',
        meta: [
            { name: 'description', content: 'Nuxt 4 測試指南：使用 Vitest 進行單元測試，以及使用 Playwright 進行端對端 (E2E) 測試，確保應用程式的品質。' }
        ]
    })
</script>

<template>
    <DocsPage title="測試 (Testing)" description="穩健的應用程式建立在可靠的測試之上。Nuxt 提供了官方的測試工具 @nuxt/test-utils，讓測試變得簡單而強大。"
        :badges="[{ label: 'Quality Assurance', color: 'primary' }, { label: 'Vitest', color: 'primary' }]">

        <!-- Section 1: Why Testing -->
        <DocsSection id="why-testing" title="為什麼要測試？" icon="heroicons:check-badge" separator>
            <p class="text-slate-400 leading-relaxed">
                隨著專案規模擴大，手動測試每一個功能變得不可能。自動化測試可以：
            </p>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <li class="flex items-center gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800/50">
                    <Icon name="heroicons:shield-check" class="w-6 h-6 text-emerald-400" />
                    <span class="text-slate-300">防止回歸錯誤 (Regressions)</span>
                </li>
                <li class="flex items-center gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800/50">
                    <Icon name="heroicons:document-text" class="w-6 h-6 text-blue-400" />
                    <span class="text-slate-300">作為活的文件 (Documentation)</span>
                </li>
                <li class="flex items-center gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800/50">
                    <Icon name="heroicons:rocket-launch" class="w-6 h-6 text-purple-400" />
                    <span class="text-slate-300">更有信心地重構程式碼</span>
                </li>
                <li class="flex items-center gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800/50">
                    <Icon name="heroicons:bug-ant" class="w-6 h-6 text-red-400" />
                    <span class="text-slate-300">提早發現潛在 Bug</span>
                </li>
            </ul>
        </DocsSection>

        <!-- Section 2: Setup -->
        <DocsSection id="setup" title="環境建置" icon="heroicons:wrench-screwdriver" separator>
            <p class="text-slate-400 mb-6">
                我們使用 <strong>Vitest</strong> 作為測試執行器，並搭配 <strong>@nuxt/test-utils</strong> 來存取 Nuxt 的運行環境 (Runtime
                Environment)。
            </p>

            <UiCodeBlock title="Terminal"
                code="pnpm add -D vitest @nuxt/test-utils happy-dom @vue/test-utils playwright-core" lang="bash"
                filename="Terminal" />

            <p class="text-slate-400 my-6">接著，在專案根目錄建立 <code class="text-emerald-400">vitest.config.ts</code>：</p>

            <UiCodeBlock code="import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  // 任何額外的 Vitest 設定
  test: {
    environment: 'nuxt', // 模擬 Nuxt 環境
    // 可以在這裡設定 coverage, reporters 等
  }
})" lang="ts" filename="vitest.config.ts" />
        </DocsSection>

        <!-- Section 3: Unit Testing -->
        <DocsSection id="unit-testing" title="單元測試 (Unit Testing)" icon="heroicons:beaker" separator>
            <p class="text-slate-400 mb-6">
                單元測試主要針對獨立的邏輯進行驗證，例如 <code class="text-emerald-400">utils</code> 或 <code
                    class="text-emerald-400">composables</code>。
            </p>

            <div class="space-y-6">
                <UiWindow title="tests/utils.test.ts" type="code" class="mb-4">
                    <UiCodeBlock code="import { describe, it, expect } from 'vitest'
import { formatCurrency } from '../app/utils/format'

describe('Utils: formatCurrency', () => {
  it('should format number to TWD currency', () => {
    const result = formatCurrency(1000)
    expect(result).toBe('NT$1,000.00') // 假設這是預期輸出
  })

  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('NT$0.00')
  })
})" lang="ts" filename="tests/utils.test.ts" />
                </UiWindow>

                <p class="text-slate-400">
                    得益於 <code class="text-emerald-400">@nuxt/test-utils</code>，你甚至可以在測試中直接使用 Auto-imports：
                </p>

                <UiWindow title="tests/hello.test.ts" type="code">
                    <UiCodeBlock code="import { describe, it, expect } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

// 模擬 useRuntimeConfig
mockNuxtImport('useRuntimeConfig', () => {
  return () => ({
    public: { apiBase: 'https://test-api.com' }
  })
})

describe('Composables', () => {
  it('can access runtime config', () => {
    const config = useRuntimeConfig()
    expect(config.public.apiBase).toBe('https://test-api.com')
  })
})" lang="ts" filename="tests/hello.test.ts" />
                </UiWindow>
            </div>
        </DocsSection>

        <!-- Section 4: E2E Testing -->
        <DocsSection id="e2e-testing" title="端對端測試 (E2E)" icon="heroicons:play">
            <p class="text-slate-400 mb-6">
                E2E 測試會啟動真實的瀏覽器，模擬使用者操作。我們先確保安裝了 Playwright 瀏覽器：
            </p>
            <UiCodeBlock code="npx playwright install" lang="bash" filename="Terminal" />

            <p class="text-slate-400 my-6">
                撰寫一個簡單的瀏覽器測試：
            </p>

            <UiCodeBlock code="import { describe, it, expect } from 'vitest'
import { setup, createPage } from '@nuxt/test-utils/e2e'

describe('Home Page', async () => {
  await setup({
    // 會自動啟動 Nuxt server
  })

  it('should have correct title', async () => {
    const page = await createPage('/')
    const text = await page.textContent('h1')
    expect(text).toContain('Nuxt 4 Tutorial')
  })
})" lang="ts" filename="tests/e2e/home.test.ts" />

            <div class="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
                <Icon name="heroicons:light-bulb" class="w-5 h-5 text-amber-500 shrink-0" />
                <p class="text-sm text-amber-200/80">
                    E2E 測試執行速度較慢，但能提供最高的信心保證。建議在 CI/CD 流程中執行。
                </p>
            </div>
        </DocsSection>

    </DocsPage>
</template>