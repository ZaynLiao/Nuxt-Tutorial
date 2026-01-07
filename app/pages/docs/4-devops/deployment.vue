<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'why-cloudflare', label: '為什麼選擇 Cloudflare？' },
            { id: 'configuration', label: '專案設定' },
            { id: 'deploy-git', label: 'Git 自動部署' },
            { id: 'troubleshooting', label: '常見問題排除' }
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
    <DocsPage title="部署到 Cloudflare"
        description="Cloudflare Pages 是目前部署 Nuxt 應用程式的最佳選擇之一。它提供了全球 CDN 加速、免費的 HTTPS 與極致的 Edge 運算效能。"
        :badges="[{ label: 'Cloudflare', color: 'primary' }, { label: 'Edge Computing', color: 'neutral' }]">

        <!-- Section 1: Why Cloudflare -->
        <DocsSection id="why-cloudflare" title="為什麼選擇 Cloudflare？" icon="heroicons:globe-asia-australia" separator>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="p-6 rounded-3xl bg-slate-950 border border-slate-800/50">
                    <Icon name="heroicons:bolt" class="w-8 h-8 text-yellow-400 mb-4" />
                    <h3 class="text-lg font-bold text-slate-200 mb-2">極致效能</h3>
                    <p class="text-slate-400 text-sm">
                        您的應用程式將運行在 Cloudflare 的 Edge Network 上，伺服器邏輯會自動複製到全球數百個節點，讓使用者永遠連線到最近的伺服器。
                    </p>
                </div>

                <div class="p-6 rounded-3xl bg-slate-950 border border-slate-800/50">
                    <Icon name="heroicons:currency-dollar" class="w-8 h-8 text-emerald-400 mb-4" />
                    <h3 class="text-lg font-bold text-slate-200 mb-2">免費額度大方</h3>
                    <p class="text-slate-400 text-sm">
                        Cloudflare Pages 提供非常大方的免費方案，包含無限的頻寬與請求次數（有一定限制但對個人專案綽綽有餘）。
                    </p>
                </div>

                <div class="p-6 rounded-3xl bg-slate-950 border border-slate-800/50">
                    <Icon name="heroicons:arrow-path" class="w-8 h-8 text-blue-400 mb-4" />
                    <h3 class="text-lg font-bold text-slate-200 mb-2">Git 整合</h3>
                    <p class="text-slate-400 text-sm">
                        只要將程式碼推送到 GitHub/GitLab，Cloudflare 就會自動觸發建置並部署，並提供預覽網址 (Preview URL)。
                    </p>
                </div>
            </div>
        </DocsSection>

        <!-- Section 2: Configuration -->
        <DocsSection id="configuration" title="專案設定" icon="heroicons:cog-6-tooth" separator>
            <p class="text-slate-400 mb-6">
                雖然 Cloudflare 通常能自動偵測 Nuxt，但為了確保最佳相容性，我們建議在 <code class="text-slate-300">nuxt.config.ts</code> 中明確指定
                Preset。
            </p>

            <UiCodeBlock language="typescript" :code="`export default defineNuxtConfig({
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
        </DocsSection>

        <!-- Section 3: Git Deployment -->
        <DocsSection id="deploy-git" title="Git 自動部署" icon="heroicons:rocket-launch" separator>
            <p class="text-slate-400 mb-6">
                這是最推薦的部署方式。您只需要在 Cloudflare Dashboard 點擊幾下即可完成。
            </p>

            <div class="space-y-6">
                <div class="p-6 rounded-xl bg-slate-950 border border-slate-800/50">
                    <h4 class="text-white font-bold mb-4 flex items-center gap-2">
                        <Icon name="heroicons:adjustments-horizontal" class="w-5 h-5 text-emerald-400" />
                        Build Settings (關鍵設定)
                    </h4>
                    <p class="text-slate-400 text-sm mb-4">
                        在設定專案時，請務必確認以下三個欄位設定正確，否則可能會導致部署失敗或頁面空白。
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                            <div class="text-xs text-slate-500 uppercase font-bold mb-1">Framework Preset</div>
                            <div class="text-emerald-400 font-mono font-bold">Nuxt.js</div>
                        </div>
                        <div class="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                            <div class="text-xs text-slate-500 uppercase font-bold mb-1">Build Command</div>
                            <div class="text-emerald-400 font-mono font-bold">pnpm generate</div>
                            <div class="text-xs text-slate-500 mt-1">或 npm run generate</div>
                        </div>
                        <div class="p-4 rounded-lg bg-slate-900/50 border border-slate-800 ring-1 ring-yellow-500/50">
                            <div class="text-xs text-slate-500 uppercase font-bold mb-1">Build Output Directory</div>
                            <div class="text-yellow-400 font-mono font-bold">dist</div>
                            <div class="text-xs text-yellow-500/80 mt-1">⚠️ 使用 generate 時請設為 dist</div>
                        </div>
                    </div>
                </div>

                <ol class="space-y-4 text-slate-400 list-decimal list-inside marker:text-emerald-500">
                    <li class="pl-2">將您的 Nuxt 專案推送到 <strong>GitHub</strong> 或 <strong>GitLab</strong>。</li>
                    <li class="pl-2">登入 <a href="https://dash.cloudflare.com/" target="_blank"
                            class="text-emerald-400 hover:underline">Cloudflare Dashboard</a>，進入 <strong>Workers &
                            Pages</strong>。</li>
                    <li class="pl-2">點擊 <strong>Create application</strong> > <strong>Pages</strong> > <strong>Connect
                            to Git</strong>。</li>
                    <li class="pl-2">選擇您的儲存庫 (Repository)。</li>
                    <li class="pl-2">填入上方的 <strong>Build Settings</strong> 數值。</li>
                    <li class="pl-2">點擊 <strong>Save and Deploy</strong>。</li>
                </ol>
            </div>
        </DocsSection>

        <!-- Section 4: Troubleshooting -->
        <DocsSection id="troubleshooting" title="常見問題排除" icon="heroicons:exclamation-triangle" separator>
            <div class="space-y-4">
                <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                    <h4 class="text-white font-medium mb-2 flex items-center gap-2">
                        <Icon name="heroicons:document" class="w-5 h-5 text-red-400" />
                        部署成功但頁面空白 (Blank Page)
                    </h4>
                    <p class="text-sm text-slate-400 mb-2">
                        這通常是因為 <strong>Build Output Directory</strong> 設定錯誤。
                    </p>
                    <ul class="list-disc list-inside text-sm text-slate-400 ml-2">
                        <li>若使用 <code class="text-slate-300">pnpm generate</code> (SSG)，輸出目錄應為 <code
                                class="text-slate-300">dist</code>。</li>
                        <li>若使用 <code class="text-slate-300">pnpm build</code> (SSR/Hybrid)，輸出目錄應為 <code
                                class="text-slate-300">.output/public</code>。</li>
                        <li>請回到 Settings > Build & deployments 修改設定並重新部署。</li>
                    </ul>
                </div>

                <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                    <h4 class="text-white font-medium mb-2 flex items-center gap-2">
                        <Icon name="heroicons:server" class="w-5 h-5 text-yellow-400" />
                        500 Server Error
                    </h4>
                    <p class="text-sm text-slate-400 mb-2">
                        如果在執行 API 請求時發生錯誤，請檢查：
                    </p>
                    <ul class="list-disc list-inside text-sm text-slate-400 ml-2">
                        <li>是否在 <code class="text-slate-300">nuxt.config.ts</code> 中設定了 <code
                                class="text-slate-300">nitro.preset: 'cloudflare-pages'</code>。</li>
                        <li>環境變數是否已在 Cloudflare Dashboard 中設定 (Settings > Environment variables)。</li>
                    </ul>
                </div>
            </div>
        </DocsSection>

    </DocsPage>
</template>