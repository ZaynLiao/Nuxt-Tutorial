<script setup lang="ts">
    const isAuthenticated = ref(false)
    const currentPath = ref('/')
    const logs = ref<string[]>([])
    const isNavigating = ref(false)

    const addLog = (msg: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
        logs.value.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`)
        if (logs.value.length > 6) logs.value.pop()
    }

    const navigate = async (path: string) => {
        if (isNavigating.value) return
        if (path === currentPath.value) return

        isNavigating.value = true
        addLog(`Navigating to ${path}...`, 'info')

        // Simulate Network/Processing Delay
        await new Promise(r => setTimeout(r, 600))

        // Middleware Logic
        addLog(`Executing middleware 'auth'...`, 'warning')
        await new Promise(r => setTimeout(r, 400))

        if (path === '/dashboard' && !isAuthenticated.value) {
            addLog(`⛔ Blocked: User not authenticated`, 'error')
            addLog(`🔀 Redirecting to /login`, 'warning')
            currentPath.value = '/login'
        } else if (path === '/login' && isAuthenticated.value) {
            addLog(`ℹ️ Note: Already logged in`, 'info')
            addLog(`🔀 Redirecting to /dashboard`, 'warning')
            currentPath.value = '/dashboard'
        } else {
            addLog(`✅ Access Granted`, 'success')
            currentPath.value = path
        }

        isNavigating.value = false
    }

    const clearLogs = () => {
        logs.value = []
    }
</script>

<template>
    <div class="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl ring-1 ring-white/5">
        <!-- Header / Toolbar -->
        <div
            class="p-4 border-b border-slate-800 bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <!-- User State Toggle -->
            <div class="flex items-center gap-3 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                <button @click="isAuthenticated = false" class="px-3 py-1.5 rounded text-xs font-bold transition-all"
                    :class="!isAuthenticated ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'">
                    Guest
                </button>
                <button @click="isAuthenticated = true" class="px-3 py-1.5 rounded text-xs font-bold transition-all"
                    :class="isAuthenticated ? 'bg-emerald-600 text-white shadow' : 'text-slate-500 hover:text-slate-300'">
                    Logged In
                </button>
            </div>

            <!-- Current Path Display -->
            <div class="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-950 border border-slate-800">
                <span class="text-xs text-slate-500 uppercase font-bold">Current Path:</span>
                <code class="text-sm font-mono text-emerald-400">{{ currentPath }}</code>
            </div>
        </div>

        <div class="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <!-- Navigation Controls -->
            <div class="p-6 space-y-6 bg-slate-900/20">
                <div class="space-y-2">
                    <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Navigation Menu</h4>
                    <div class="grid gap-2">
                        <button @click="navigate('/')" :disabled="isNavigating"
                            class="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:border-slate-700 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                            :class="{ 'ring-1 ring-emerald-500/50 border-emerald-500/50 bg-emerald-500/10': currentPath === '/' }">
                            <div class="flex items-center gap-3">
                                <Icon name="heroicons:home"
                                    class="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                                <span class="text-sm font-medium text-slate-300 group-hover:text-white">Home</span>
                            </div>
                            <span
                                class="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 border border-slate-700">Public</span>
                        </button>

                        <button @click="navigate('/login')" :disabled="isNavigating"
                            class="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:border-slate-700 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                            :class="{ 'ring-1 ring-emerald-500/50 border-emerald-500/50 bg-emerald-500/10': currentPath === '/login' }">
                            <div class="flex items-center gap-3">
                                <Icon name="heroicons:arrow-right-on-rectangle"
                                    class="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                                <span class="text-sm font-medium text-slate-300 group-hover:text-white">Login</span>
                            </div>
                            <span
                                class="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 border border-slate-700">Guest
                                Only</span>
                        </button>

                        <button @click="navigate('/dashboard')" :disabled="isNavigating"
                            class="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:border-slate-700 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                            :class="{ 'ring-1 ring-emerald-500/50 border-emerald-500/50 bg-emerald-500/10': currentPath === '/dashboard' }">
                            <div class="flex items-center gap-3">
                                <Icon name="heroicons:squares-2x2"
                                    class="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                                <span class="text-sm font-medium text-slate-300 group-hover:text-white">Dashboard</span>
                            </div>
                            <span
                                class="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Protected</span>
                        </button>
                    </div>
                </div>

                <div class="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                    <strong class="text-emerald-400 block mb-1">Middleware Logic:</strong>
                    <ul class="list-disc list-inside space-y-1">
                        <li>If accessing <code class="text-amber-400">/dashboard</code> without login → Redirect to
                            <code class="text-slate-300">/login</code></li>
                        <li>If accessing <code class="text-slate-300">/login</code> while logged in → Redirect to <code
                                class="text-amber-400">/dashboard</code></li>
                    </ul>
                </div>
            </div>

            <!-- Console / Logs -->
            <div class="flex flex-col h-80 md:h-auto bg-slate-950">
                <div class="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/30">
                    <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Middleware Logs</span>
                    <button @click="clearLogs"
                        class="text-[10px] text-slate-500 hover:text-white transition-colors">Clear</button>
                </div>
                <div class="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
                    <div v-if="logs.length === 0"
                        class="h-full flex flex-col items-center justify-center text-slate-600 gap-2">
                        <Icon name="heroicons:command-line" class="w-8 h-8 opacity-50" />
                        <span>Waiting for navigation...</span>
                    </div>
                    <transition-group name="list">
                        <div v-for="(log, index) in logs" :key="index"
                            class="flex gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                            <span class="text-slate-600 shrink-0">></span>
                            <span class="text-slate-300 break-all">{{ log }}</span>
                        </div>
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
</template>
