<script setup lang="ts">
    const envSecret = ref('sk_prod_88888888')
    const envBase = ref('https://api.production.com')

    const defaultConfig = {
        apiSecret: 'default_dev_secret',
        public: {
            apiBase: '/api/dev'
        }
    }

    const resolvedConfig = computed(() => ({
        apiSecret: envSecret.value || defaultConfig.apiSecret,
        public: {
            apiBase: envBase.value || defaultConfig.public.apiBase
        }
    }))
</script>

<template>
    <div class="grid lg:grid-cols-2 gap-6">
        <!-- Left Column: Configuration Source -->
        <div class="space-y-6">
            <!-- 1. nuxt.config.ts (Static) -->
            <div class="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
                <div class="px-4 py-2 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
                    <span class="text-xs font-bold text-slate-500 uppercase">nuxt.config.ts</span>
                    <span
                        class="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">Default
                        Values</span>
                </div>
                <div class="p-4 font-mono text-xs text-slate-400 leading-relaxed">
                    <span class="text-purple-400">export default</span> <span
                        class="text-blue-400">defineNuxtConfig</span>({<br>
                    &nbsp;&nbsp;runtimeConfig: {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;apiSecret: <span class="text-amber-400">'{{ defaultConfig.apiSecret
                        }}'</span>,<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;public: {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;apiBase: <span class="text-amber-400">'{{
                        defaultConfig.public.apiBase }}'</span><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;}<br>
                    &nbsp;&nbsp;}<br>
                    })
                </div>
            </div>

            <!-- 2. Environment Variables (Editable) -->
            <div
                class="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg ring-1 ring-emerald-500/20">
                <div class="px-4 py-2 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
                    <span class="text-xs font-bold text-emerald-400 uppercase">.env / Environment Variables</span>
                    <span
                        class="text-xs px-1.5 py-0.5 rounded bg-emerald-950/30 text-emerald-400 border border-emerald-500/20">Overrides
                        Defaults</span>
                </div>
                <div class="p-4 space-y-4">
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-slate-500 uppercase">NUXT_API_SECRET</label>
                        <input v-model="envSecret" type="text"
                            class="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs font-mono text-white focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                            placeholder="Leave empty to use default" />
                    </div>
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-slate-500 uppercase">NUXT_PUBLIC_API_BASE</label>
                        <input v-model="envBase" type="text"
                            class="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs font-mono text-white focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                            placeholder="Leave empty to use default" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Column: Resolved Runtime Config -->
        <div class="space-y-6">
            <!-- Server Context -->
            <div class="rounded-xl border border-slate-800 bg-slate-900/20 overflow-hidden">
                <div class="px-4 py-2 border-b border-slate-800 bg-slate-900 flex items-center gap-2">
                    <Icon name="heroicons:server" class="w-4 h-4 text-emerald-500" />
                    <span class="text-xs font-bold text-emerald-500 uppercase">Server Context</span>
                </div>
                <div class="p-4 space-y-3">
                    <div
                        class="flex items-center justify-between p-3 rounded bg-slate-800/50 border border-slate-700/50">
                        <div class="flex flex-col">
                            <span class="text-xs text-slate-500 font-mono">config.apiSecret</span>
                            <span class="text-sm font-mono text-white break-all">{{ resolvedConfig.apiSecret }}</span>
                        </div>
                        <Icon name="heroicons:lock-closed" class="w-4 h-4 text-red-400 opacity-50" />
                    </div>
                    <div
                        class="flex items-center justify-between p-3 rounded bg-slate-800/50 border border-slate-700/50">
                        <div class="flex flex-col">
                            <span class="text-xs text-slate-500 font-mono">config.public.apiBase</span>
                            <span class="text-sm font-mono text-white break-all">{{ resolvedConfig.public.apiBase
                                }}</span>
                        </div>
                        <Icon name="heroicons:globe-alt" class="w-4 h-4 text-sky-400 opacity-50" />
                    </div>
                </div>
            </div>

            <!-- Client Context -->
            <div class="rounded-xl border border-slate-800 bg-slate-900/20 overflow-hidden">
                <div class="px-4 py-2 border-b border-slate-800 bg-slate-900 flex items-center gap-2">
                    <Icon name="heroicons:computer-desktop" class="w-4 h-4 text-sky-500" />
                    <span class="text-xs font-bold text-sky-500 uppercase">Client Context</span>
                </div>
                <div class="p-4 space-y-3">
                    <div
                        class="flex items-center justify-between p-3 rounded bg-slate-800/50 border border-slate-700/50 opacity-50 grayscale">
                        <div class="flex flex-col">
                            <span class="text-xs text-slate-500 font-mono">config.apiSecret</span>
                            <span class="text-sm font-mono text-slate-500">undefined</span>
                        </div>
                        <Icon name="heroicons:no-symbol" class="w-4 h-4 text-red-500" />
                    </div>
                    <div
                        class="flex items-center justify-between p-3 rounded bg-slate-800/50 border border-slate-700/50">
                        <div class="flex flex-col">
                            <span class="text-xs text-slate-500 font-mono">config.public.apiBase</span>
                            <span class="text-sm font-mono text-white break-all">{{ resolvedConfig.public.apiBase
                                }}</span>
                        </div>
                        <Icon name="heroicons:globe-alt" class="w-4 h-4 text-sky-400 opacity-50" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
