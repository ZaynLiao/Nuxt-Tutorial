<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'prerequisites', label: '環境準備' },
            { id: 'why-nuxt4', label: '為什麼選擇 Nuxt 4？' },
            { id: 'init-project', label: '初始化專案' },
            { id: 'project-structure', label: '關鍵設定' },
            { id: 'development', label: '啟動開發' }
        ]
    })

    useHead({
        title: '安裝與啟動 (Installation)',
        meta: [
            { name: 'description', content: '從零開始建立 Nuxt 4 專案，了解環境需求、初始化流程與關鍵配置。' }
        ]
    })

    const activeTab = ref<'pnpm' | 'npm' | 'yarn'>('pnpm')

    const installCommands = {
        pnpm: 'pnpm dlx nuxi@latest init <project-name>',
        npm: 'npx nuxi@latest init <project-name>',
        yarn: 'yarn dlx nuxi@latest init <project-name>'
    }

    const installDepsCommands = {
        pnpm: 'pnpm install',
        npm: 'npm install',
        yarn: 'yarn install'
    }

    const runDevCommands = {
        pnpm: 'pnpm dev',
        npm: 'npm run dev',
        yarn: 'yarn dev'
    }
</script>

<template>
    <TutorialPage title="安裝與啟動" description="跟隨本指南，在幾分鐘內建立一個現代化、高效能的 Nuxt 4 應用程式。我們強烈建議使用 pnpm 以獲得最佳體驗。"
        :badges="[{ label: 'Core', color: 'primary' }, { label: 'Setup', color: 'neutral' }]">

        <!-- 1. Prerequisites -->
        <TutorialSection id="prerequisites" title="環境準備" icon="heroicons:clipboard-document-check" separator>
            <div class="grid md:grid-cols-2 gap-6">
                <!-- Node.js -->
                <div
                    class="relative group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Icon name="logos:nodejs-icon"
                            class="w-20 h-20 grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <h3 class="text-xl font-bold text-emerald-400 mb-2">Node.js</h3>
                    <p class="text-sm text-slate-500 mb-4 font-mono">Runtime Environment</p>
                    <div class="text-slate-300 text-sm leading-relaxed">
                        Nuxt 4 需要 <strong class="text-white">Node.js 18.0.0</strong> 或更高版本。
                        <br>建議使用 <span class="text-emerald-400">LTS (Long Term Support)</span> 版本以確保穩定性。
                    </div>
                </div>

                <!-- Package Manager -->
                <div
                    class="relative group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/30 transition-all">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Icon name="logos:pnpm" class="w-20 h-20 grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <h3 class="text-xl font-bold text-sky-400 mb-2">Package Manager</h3>
                    <p class="text-sm text-slate-500 mb-4 font-mono">Dependency Management</p>
                    <div class="text-slate-300 text-sm leading-relaxed">
                        雖然 npm 與 yarn 也能運作，但我們強烈推薦使用 <strong class="text-white">pnpm</strong>。
                        <br>它能大幅節省磁碟空間並加快安裝速度。
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- 2. Why Nuxt 4 -->
        <TutorialSection id="why-nuxt4" title="為什麼選擇 Nuxt 4？" icon="heroicons:sparkles" iconColor="text-amber-400"
            separator>
            <div class="flex flex-col gap-6">
                <p class="leading-relaxed">
                    Nuxt 4 引入了 <code class="text-amber-400">compatibilityVersion: 4</code>，這是一個重大的架構升級。
                    它將應用程式源碼集中於 <code class="text-emerald-400">app/</code> 目錄，讓專案根目錄更加乾淨。
                </p>

                <AppWindow title="Project Structure Evolution" icon="heroicons:folder-open" class="w-full">
                    <div class="grid grid-cols-2 divide-x divide-slate-800">
                        <!-- Nuxt 3 -->
                        <div class="p-6 space-y-4">
                            <div class="text-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Nuxt
                                3 (Legacy)
                            </div>
                            <div class="font-mono text-sm text-slate-400 space-y-2 pl-4">
                                <div class="flex items-center gap-2">
                                    <Icon name="heroicons:cube" class="w-4 h-4" /> components/
                                </div>
                                <div class="flex items-center gap-2">
                                    <Icon name="heroicons:view-columns" class="w-4 h-4" /> layouts/
                                </div>
                                <div class="flex items-center gap-2">
                                    <Icon name="heroicons:document-duplicate" class="w-4 h-4" /> pages/
                                </div>
                                <div class="flex items-center gap-2">
                                    <Icon name="heroicons:photo" class="w-4 h-4" /> public/
                                </div>
                                <div class="flex items-center gap-2">
                                    <Icon name="heroicons:server-stack" class="w-4 h-4" /> server/
                                </div>
                                <div class="flex items-center gap-2 text-slate-600">...還有更多散落在根目錄</div>
                            </div>
                        </div>

                        <!-- Nuxt 4 -->
                        <div class="p-6 space-y-4 bg-emerald-950/5">
                            <div class="text-center text-xs font-bold text-emerald-500 uppercase tracking-wider mb-4">
                                Nuxt 4 (Modern)
                            </div>
                            <AppFileTree :files="[
                                {
                                    name: 'app/',
                                    icon: 'heroicons:folder-open',
                                    color: 'emerald',
                                    children: [
                                        { name: 'components/', icon: 'heroicons:cube' },
                                        { name: 'layouts/', icon: 'heroicons:view-columns' },
                                        { name: 'pages/', icon: 'heroicons:document-duplicate' }
                                    ]
                                },
                                { name: 'server/', icon: 'heroicons:server-stack' },
                                { name: 'nuxt.config.ts', icon: 'logos:nuxt-icon' }
                            ]" />
                        </div>
                    </div>
                </AppWindow>
            </div>
        </TutorialSection>

        <!-- 3. Init Project -->
        <TutorialSection id="init-project" title="初始化專案" icon="heroicons:command-line" separator>
            <AppWindow :no-padding="true" type="code" title="Terminal">
                <template #header>
                    <div class="flex border-r border-slate-800">
                        <button v-for="pm in ['pnpm', 'npm', 'yarn']" :key="pm" @click="activeTab = pm as any"
                            class="px-4 py-2 text-xs font-medium transition-colors border-b-2 hover:bg-slate-800/50"
                            :class="activeTab === pm ? 'text-emerald-400 border-emerald-400 bg-emerald-500/5' : 'text-slate-500 border-transparent'">
                            {{ pm }}
                        </button>
                    </div>
                </template>

                <div class="p-6 space-y-6">
                    <!-- Step 1 -->
                    <div class="space-y-2">
                        <div class="text-xs font-bold text-slate-500 uppercase">1. 建立專案</div>
                        <div class="font-mono text-sm text-slate-300">
                            <span class="text-emerald-400">$</span> {{ installCommands[activeTab] }}
                        </div>
                    </div>

                    <!-- Step 2 -->
                    <div class="space-y-2">
                        <div class="text-xs font-bold text-slate-500 uppercase">2. 進入目錄</div>
                        <div class="font-mono text-sm text-slate-300">
                            <span class="text-emerald-400">$</span> cd &lt;project-name&gt;
                        </div>
                    </div>

                    <!-- Step 3 -->
                    <div class="space-y-2">
                        <div class="text-xs font-bold text-slate-500 uppercase">3. 安裝依賴</div>
                        <div class="font-mono text-sm text-slate-300">
                            <span class="text-emerald-400">$</span> {{ installDepsCommands[activeTab] }}
                        </div>
                    </div>
                </div>
            </AppWindow>
        </TutorialSection>

        <!-- 4. Project Structure Config -->
        <TutorialSection id="project-structure" title="關鍵設定" icon="heroicons:cog-6-tooth" separator>
            <p>
                為了啟用 Nuxt 4 的目錄結構，你必須在 <code class="text-emerald-400">nuxt.config.ts</code> 中明確宣告。
            </p>

            <div class="relative group">
                <div
                    class="absolute -inset-1 bg-linear-to-r from-emerald-500/20 to-sky-500/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000">
                </div>
                <AppCodeBlock code="export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  }
})" lang="ts" filename="nuxt.config.ts" />
            </div>

            <div class="flex items-start gap-4 p-4 rounded-xl bg-amber-950/20 border border-amber-900/30">
                <Icon name="heroicons:light-bulb" class="w-6 h-6 text-amber-400 shrink-0" />
                <div class="text-sm text-amber-200/80 leading-relaxed">
                    <strong class="text-amber-400 block mb-1">為什麼要手動設定？</strong>
                    目前 Nuxt 4 仍處於過渡期。這個設定告訴 Nuxt 掃描 <code class="font-mono">app/</code> 目錄而非根目錄，讓你能提早享受未來的專案架構。
                </div>
            </div>
        </TutorialSection>

        <!-- 5. Development -->
        <TutorialSection id="development" title="啟動開發" icon="heroicons:rocket-launch">
            <div class="grid md:grid-cols-2 gap-8 items-center">
                <div class="space-y-4">
                    <p class="leading-relaxed">
                        一切就緒！現在啟動開發伺服器，Nuxt 會自動開啟瀏覽器並啟用 HMR (熱模組替換)。
                    </p>
                    <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm text-slate-300">
                        <span class="text-emerald-400">$</span> {{ runDevCommands[activeTab] }}
                    </div>
                    <div class="flex items-center gap-2 text-sm text-slate-500">
                        <Icon name="heroicons:check-circle" class="text-emerald-500" />
                        <span>預設網址: http://localhost:3000</span>
                    </div>
                </div>

                <AppWindow title="Browser Preview" class="w-full shadow-2xl shadow-emerald-900/20">
                    <div
                        class="h-48 flex flex-col items-center justify-center bg-slate-900/50 relative overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                            <Icon name="logos:nuxt-icon" class="w-1/2 h-1/2 grayscale" />
                        </div>
                        <h1 class="text-2xl font-bold text-white mb-2 relative z-10">Welcome to Nuxt!</h1>
                        <p class="text-slate-400 text-sm relative z-10">Your application is running.</p>
                        <div class="mt-6 flex gap-2 relative z-10">
                            <div class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                            <div class="w-3 h-3 rounded-full bg-emerald-500/50 animate-pulse delay-75"></div>
                            <div class="w-3 h-3 rounded-full bg-emerald-500/20 animate-pulse delay-150"></div>
                        </div>
                    </div>
                </AppWindow>
            </div>
        </TutorialSection>

    </TutorialPage>
</template>
