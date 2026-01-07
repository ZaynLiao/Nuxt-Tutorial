<script setup lang="ts">
    // Local State (isolated)
    const localCountA = ref(0)
    const localCountB = ref(0)

    // Shared State (synced)
    const sharedCount = useState('demo-shared-count', () => 0)

    // Animation trigger
    const justUpdated = ref(false)
    watch(sharedCount, () => {
        justUpdated.value = true
        setTimeout(() => justUpdated.value = false, 500)
    })
</script>

<template>
    <div class="grid md:grid-cols-2 gap-6">
        <!-- Component A -->
        <div class="relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 ring-1 ring-white/5">
            <div
                class="absolute -top-3 left-4 px-2 py-0.5 rounded text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                Component A
            </div>

            <div class="space-y-6 mt-2">
                <!-- Local -->
                <div class="p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-xs font-medium text-slate-400">Local State (ref)</span>
                        <span class="text-xs text-slate-600 font-mono">Isolated</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-2xl font-bold text-white">{{ localCountA }}</span>
                        <button @click="localCountA++"
                            class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors cursor-pointer">
                            +1
                        </button>
                    </div>
                </div>

                <!-- Shared -->
                <div class="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/20 relative overflow-hidden">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-xs font-bold text-emerald-400">Shared State (useState)</span>
                        <Icon name="heroicons:arrows-right-left" class="w-4 h-4 text-emerald-500/50" />
                    </div>
                    <div class="flex items-center justify-between relative z-10">
                        <span class="text-2xl font-bold text-emerald-100">{{ sharedCount }}</span>
                        <button @click="sharedCount++"
                            class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer">
                            Global +1
                        </button>
                    </div>
                    <!-- Pulse Effect -->
                    <div v-if="justUpdated" class="absolute inset-0 bg-emerald-500/10 animate-pulse"></div>
                </div>
            </div>
        </div>

        <!-- Component B -->
        <div class="relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 ring-1 ring-white/5">
            <div
                class="absolute -top-3 left-4 px-2 py-0.5 rounded text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                Component B
            </div>

            <div class="space-y-6 mt-2">
                <!-- Local -->
                <div class="p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-xs font-medium text-slate-400">Local State (ref)</span>
                        <span class="text-xs text-slate-600 font-mono">Isolated</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-2xl font-bold text-white">{{ localCountB }}</span>
                        <button @click="localCountB++"
                            class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors cursor-pointer">
                            +1
                        </button>
                    </div>
                </div>

                <!-- Shared -->
                <div class="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/20 relative overflow-hidden">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-xs font-bold text-emerald-400">Shared State (useState)</span>
                        <Icon name="heroicons:link" class="w-4 h-4 text-emerald-500/50" />
                    </div>
                    <div class="flex items-center justify-between relative z-10">
                        <span class="text-2xl font-bold text-emerald-100">{{ sharedCount }}</span>
                        <div class="text-xs text-emerald-500/70 font-mono">
                            Auto-synced
                        </div>
                    </div>
                    <!-- Pulse Effect -->
                    <div v-if="justUpdated" class="absolute inset-0 bg-emerald-500/10 animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
</template>
