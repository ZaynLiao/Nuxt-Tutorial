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
    <TutorialPage title="測試 (Testing)" description="穩健的應用程式建立在可靠的測試之上。Nuxt 提供了官方的測試工具 @nuxt/test-utils，讓測試變得簡單而強大。"
        :badges="[{ label: 'Quality Assurance', color: 'primary' }, { label: 'Vitest', color: 'primary' }]">

        <!-- Section 1: Why Testing -->
        <TutorialSection id="why-testing" title="為什麼要測試？" icon="heroicons:check-badge" separator>
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
        </TutorialSection>

        <!-- Section 2: Setup -->
        <TutorialSection id="setup" title="環境建置" icon="heroicons:wrench-screwdriver" separator>
            <p class="text-slate-400 mb-6">
                我們推薦使用 <strong class="text-emerald-400">Vitest</strong> 作為測試執行器，因為它與 Vite 原生整合，速度極快。
            </p>

            <AppCodeBlock language="bash" :code="`# 安裝測試依賴
pnpm add -D vitest @nuxt/test-utils happy-dom @vue/test-utils`" filename="Terminal" />

            <p class="text-slate-400 my-6">
                接著在專案根目錄建立 <code class="text-slate-300">vitest.config.ts</code>：
            </p>

            <AppCodeBlock language="typescript" :code="`import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    // 使用 happy-dom 模擬瀏覽器環境
    environmentOptions: {
      nuxt: {
        domEnvironment: 'happy-dom'
      }
    }
  }
})`" filename="vitest.config.ts" />
        </TutorialSection>

        <!-- Section 3: Unit Testing -->
        <TutorialSection id="unit-testing" title="單元測試 (Unit Testing)" icon="heroicons:beaker" separator>
            <p class="text-slate-400 mb-6">
                單元測試專注於測試個別的函數、Composables 或元件。
            </p>

            <AppCodeBlock language="typescript" :code="`// tests/utils.test.ts
import { describe, it, expect } from 'vitest'
import { add } from '~/utils/math'

describe('Math Utils', () => {
  it('should add two numbers correctly', () => {
    expect(add(1, 2)).toBe(3)
  })
})`" filename="tests/utils.test.ts" />

            <p class="text-slate-400 my-6">
                測試 Vue 元件：
            </p>

            <AppCodeBlock language="typescript" :code="`// tests/components/AppButton.test.ts
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppButton from '~/components/AppButton.vue'

describe('AppButton', () => {
  it('renders default slot content', async () => {
    const component = await mountSuspended(AppButton, {
      slots: {
        default: () => 'Click me'
      }
    })
    
    expect(component.text()).toContain('Click me')
  })
})`" filename="tests/components/AppButton.test.ts" />
        </TutorialSection>

        <!-- Section 4: E2E Testing -->
        <TutorialSection id="e2e-testing" title="E2E 測試" icon="heroicons:video-camera" separator>
            <p class="text-slate-400 mb-6">
                端對端 (End-to-End) 測試會模擬真實使用者的操作，測試整個應用程式的流程。Nuxt 官方推薦使用 <strong>Playwright</strong>。
            </p>

            <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                <p class="text-slate-400 text-sm">
                    由於 E2E 測試設定較為複雜，建議參考 <a href="https://nuxt.com/docs/getting-started/testing" target="_blank"
                        class="text-emerald-400 hover:underline">Nuxt 官方文件</a> 進行完整配置。
                </p>
            </div>
        </TutorialSection>

    </TutorialPage>
</template>