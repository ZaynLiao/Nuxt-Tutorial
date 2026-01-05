<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'why-cloudflare', label: '為什麼選擇 Cloudflare？' },
            { id: 'configuration', label: '專案設定' },
            { id: 'deploy-git', label: 'Git 自動部署' },
            { id: 'local-preview', label: '本地預覽 (Wrangler)' }
        ]
    })

    useHead({
        title: '部署到 Cloudflare',
        meta: [
            { name: 'description', content: 'Nuxt 4 部署教學：教您如何將 Nuxt 應用程式部署至 Cloudflare Pages，享受全球 Edge Network 的極致效能。' }
        ]
    })
</script>

<template>
    <TutorialPage title="部署到 Cloudflare"
        description="Cloudflare Pages 是目前部署 Nuxt 應用程式的最佳選擇之一。它提供了全球 CDN 加速、免費的 HTTPS 與極致的 Edge 運算效能。"
        :badges="[{ label: 'Cloudflare', color: 'primary' }, { label: 'Edge Computing', color: 'primary' }]">

        <!-- Section 1: Why Cloudflare -->
        <TutorialSection id="why-cloudflare" title="為什麼選擇 Cloudflare？" icon="heroicons:globe-asia-australia" separator>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="p-6 rounded-3xl bg-slate-950 border border-slate-800/50">
                    <UIcon name="heroicons:bolt" class="w-8 h-8 text-yellow-400 mb-4" />
                    <h3 class="text-lg font-bold text-slate-200 mb-2">極致效能</h3>
                    <p class="text-slate-400 text-sm">
                        您的應用程式將運行在 Cloudflare 的 Edge Network 上，伺服器邏輯會自動複製到全球數百個節點，讓使用者永遠連線到最近的伺服器。
                    </p>
                </div>

                <div class="p-6 rounded-3xl bg-slate-950 border border-slate-800/50">
                    <UIcon name="heroicons:currency-dollar" class="w-8 h-8 text-emerald-400 mb-4" />
                    <h3 class="text-lg font-bold text-slate-200 mb-2">免費額度大方</h3>
                    <p class="text-slate-400 text-sm">
                        Cloudflare Pages 提供非常大方的免費方案，包含無限的頻寬與請求次數（有一定限制但對個人專案綽綽有餘）。
                    </p>
                </div>

                <div class="p-6 rounded-3xl bg-slate-950 border border-slate-800/50">
                    <UIcon name="heroicons:arrow-path" class="w-8 h-8 text-blue-400 mb-4" />
                    <h3 class="text-lg font-bold text-slate-200 mb-2">Git 整合</h3>
                    <p class="text-slate-400 text-sm">
                        只要將程式碼推送到 GitHub/GitLab，Cloudflare 就會自動觸發建置並部署，並提供預覽網址 (Preview URL)。
                    </p>
                </div>
            </div>
        </TutorialSection>

        <!-- Section 2: Configuration -->
        <TutorialSection id="configuration" title="專案設定" icon="heroicons:cog-6-tooth" separator>
            <p class="text-slate-400 mb-6">
                雖然 Cloudflare 通常能自動偵測 Nuxt，但為了確保最佳相容性，我們建議在 <code class="text-slate-300">nuxt.config.ts</code> 中明確指定
                Preset。
            </p>

            <AppCodeBlock language="typescript" :code="`export default defineNuxtConfig({
  nitro: {
    // 明確指定使用 Cloudflare Pages 預設配置
    preset: 'cloudflare-pages'
  }
})`" filename="nuxt.config.ts" />

            <div class="mt-6 p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                <h4 class="font-bold text-slate-200 mb-2">Node.js 版本相容性</h4>
                <p class="text-slate-400 text-sm">
                    請確保您的專案在 Cloudflare 建置環境中使用 <code class="text-emerald-400">Node.js 18+</code> 或 <code
                        class="text-emerald-400">20+</code>。
                    您可以在專案根目錄建立 <code class="text-slate-300">.nvmrc</code> 檔案來指定版本。
                </p>
            </div>
        </TutorialSection>

        <!-- Section 3: Git Deployment -->
        <TutorialSection id="deploy-git" title="Git 自動部署" icon="heroicons:rocket-launch" separator>
            <p class="text-slate-400 mb-6">
                這是最推薦的部署方式。您只需要在 Cloudflare Dashboard 點擊幾下即可完成。
            </p>

            <ol class="space-y-4 text-slate-400 list-decimal list-inside marker:text-emerald-500">
                <li class="pl-2">將您的 Nuxt 專案推送到 <strong>GitHub</strong> 或 <strong>GitLab</strong>。</li>
                <li class="pl-2">登入 <a href="https://dash.cloudflare.com/" target="_blank"
                        class="text-emerald-400 hover:underline">Cloudflare Dashboard</a>，進入 <strong>Workers &
                        Pages</strong>。</li>
                <li class="pl-2">點擊 <strong>Create application</strong> > <strong>Pages</strong> > <strong>Connect to
                        Git</strong>。</li>
                <li class="pl-2">選擇您的儲存庫 (Repository)。</li>
                <li class="pl-2">
                    在 <strong>Build settings</strong> 中：
                    <ul class="pl-6 mt-2 space-y-2 list-disc text-sm">
                        <li><strong>Framework preset</strong>: 選擇 <code
                                class="bg-slate-950 px-1 py-0.5 rounded text-emerald-400">Nuxt.js</code></li>
                        <li><strong>Build command</strong>: <code
                                class="bg-slate-950 px-1 py-0.5 rounded text-emerald-400">npm run build</code> (或 pnpm
                            build)</li>
                        <li><strong>Build output directory</strong>: <code
                                class="bg-slate-950 px-1 py-0.5 rounded text-emerald-400">dist</code> (Nuxt 預設會輸出到
                            .output/public，但 Cloudflare preset 會自動處理)</li>
                    </ul>
                </li>
                <li class="pl-2">點擊 <strong>Save and Deploy</strong>。</li>
            </ol>
        </TutorialSection>

        <!-- Section 4: Local Preview -->
        <TutorialSection id="local-preview" title="本地預覽 (Wrangler)" icon="heroicons:eye" separator>
            <p class="text-slate-400 mb-6">
                由於 Cloudflare Workers 的執行環境 (Edge Runtime) 與標準 Node.js 不同，強烈建議在部署前使用 <code
                    class="text-emerald-400">wrangler</code> 進行本地模擬。
            </p>

            <AppCodeBlock language="bash" :code="`# 1. 安裝 Wrangler CLI
pnpm add -D wrangler

# 2. 建置專案
pnpm build

# 3. 預覽 Cloudflare Pages 環境
npx wrangler pages dev .output/public`" filename="Terminal" />

            <div class="p-4 mt-6 rounded-lg bg-amber-950/30 border border-amber-900/50 flex gap-4">
                <UIcon name="heroicons:exclamation-triangle" class="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <div>
                    <h4 class="font-bold text-amber-400 mb-1">注意</h4>
                    <p class="text-amber-200/70 text-sm">
                        某些 Node.js 專屬的 API (如 <code class="text-amber-400">fs</code> 模組) 在 Edge 環境中無法使用。
                        使用 Wrangler 預覽可以幫助您提早發現這些相容性問題。
                    </p>
                </div>
            </div>
        </TutorialSection>

    </TutorialPage>
</template>