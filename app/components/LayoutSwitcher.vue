<script setup lang="ts">
    const currentLayout = ref('default')

    const layouts = {
        default: {
            name: 'default.vue',
            color: 'emerald',
            icon: 'heroicons:window',
            description: 'Standard layout with Header and Footer.'
        },
        auth: {
            name: 'auth.vue',
            color: 'amber',
            icon: 'heroicons:lock-closed',
            description: 'Minimal layout for Login/Register pages.'
        },
        dashboard: {
            name: 'dashboard.vue',
            color: 'sky',
            icon: 'heroicons:squares-2x2',
            description: 'Admin layout with Sidebar and Topbar.'
        }
    }
</script>

<template>
    <div class="grid lg:grid-cols-3 gap-8">
        <!-- Controls -->
        <div class="space-y-6">
            <div class="space-y-3">
                <label class="text-xs font-bold text-slate-400 uppercase">Select Layout</label>
                <div class="space-y-2">
                    <button v-for="(info, key) in layouts" :key="key" @click="currentLayout = key"
                        class="w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 text-left group"
                        :class="currentLayout === key
                            ? `bg-${info.color}-500/10 border-${info.color}-500/50 ring-1 ring-${info.color}-500/20`
                            : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800 hover:border-slate-700'">
                        <div class="p-2 rounded-md"
                            :class="currentLayout === key ? `bg-${info.color}-500/20 text-${info.color}-400` : 'bg-slate-800 text-slate-500'">
                            <Icon :name="info.icon" class="w-5 h-5" />
                        </div>
                        <div>
                            <div class="text-sm font-bold"
                                :class="currentLayout === key ? 'text-white' : 'text-slate-300'">{{ info.name }}</div>
                            <div class="text-xs text-slate-500">{{ info.description }}</div>
                        </div>
                    </button>
                </div>
            </div>

            <div class="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <div class="text-xs font-mono text-slate-500 mb-2">// Usage in Page</div>
                <pre class="text-xs font-mono text-emerald-400 whitespace-pre-wrap">definePageMeta({
  layout: '{{ currentLayout }}'
})</pre>
            </div>
        </div>

        <!-- Visualizer -->
        <div
            class="lg:col-span-2 bg-slate-950 rounded-xl border border-slate-800 p-8 flex items-center justify-center relative overflow-hidden">

            <!-- Layout Container -->
            <div
                class="relative w-full max-w-md aspect-video bg-slate-900 shadow-2xl rounded-lg overflow-hidden border border-slate-700 transition-all duration-500 flex flex-col">

                <!-- Default Layout -->
                <template v-if="currentLayout === 'default'">
                    <div
                        class="h-12 bg-emerald-900/30 border-b border-emerald-500/30 flex items-center px-4 justify-between">
                        <div class="w-20 h-3 rounded bg-emerald-500/20"></div>
                        <div class="flex gap-2">
                            <div class="w-8 h-3 rounded bg-emerald-500/20"></div>
                            <div class="w-8 h-3 rounded bg-emerald-500/20"></div>
                        </div>
                    </div>
                    <div class="flex-1 p-6 bg-slate-900 relative">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-white mb-2">Page Content</div>
                                <div class="text-slate-500 text-sm">&lt;NuxtPage /&gt;</div>
                            </div>
                        </div>
                    </div>
                    <div class="h-16 bg-slate-800 border-t border-slate-700 flex items-center justify-center">
                        <div class="w-32 h-2 rounded bg-slate-700"></div>
                    </div>
                </template>

                <!-- Auth Layout -->
                <template v-if="currentLayout === 'auth'">
                    <div class="flex-1 bg-slate-900 flex items-center justify-center relative overflow-hidden">
                        <div class="absolute inset-0 bg-amber-500/5"></div>
                        <div class="w-64 bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl relative z-10">
                            <div
                                class="w-12 h-12 rounded-full bg-amber-500/20 mx-auto mb-4 flex items-center justify-center">
                                <Icon name="heroicons:lock-closed" class="w-6 h-6 text-amber-400" />
                            </div>
                            <div class="h-4 bg-slate-700 rounded w-3/4 mx-auto mb-6"></div>
                            <div class="space-y-3">
                                <div class="h-8 bg-slate-900 rounded border border-slate-700"></div>
                                <div class="h-8 bg-slate-900 rounded border border-slate-700"></div>
                                <div class="h-8 bg-amber-600 rounded"></div>
                            </div>
                        </div>
                    </div>
                </template>

                <!-- Dashboard Layout -->
                <template v-if="currentLayout === 'dashboard'">
                    <div class="flex h-full">
                        <div
                            class="w-16 bg-sky-900/20 border-r border-sky-500/20 flex flex-col items-center py-4 gap-4">
                            <div class="w-8 h-8 rounded bg-sky-500/20"></div>
                            <div class="w-8 h-8 rounded bg-sky-500/10"></div>
                            <div class="w-8 h-8 rounded bg-sky-500/10"></div>
                            <div class="mt-auto w-8 h-8 rounded-full bg-slate-700"></div>
                        </div>
                        <div class="flex-1 flex flex-col">
                            <div
                                class="h-12 bg-slate-800 border-b border-slate-700 flex items-center px-4 justify-between">
                                <div class="w-24 h-3 rounded bg-slate-700"></div>
                            </div>
                            <div class="flex-1 p-4 bg-slate-900">
                                <div class="grid grid-cols-2 gap-4 h-full">
                                    <div class="bg-slate-800/50 rounded-lg border border-slate-700/50"></div>
                                    <div class="bg-slate-800/50 rounded-lg border border-slate-700/50"></div>
                                    <div class="col-span-2 bg-slate-800/50 rounded-lg border border-slate-700/50"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

            </div>
        </div>
    </div>
</template>
