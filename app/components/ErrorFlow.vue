<script setup lang="ts">
    const activePath = ref<string[]>([])
    const currentError = ref<string | null>(null)

    const steps = {
        start: { label: 'User Action', icon: 'heroicons:cursor-arrow-rays' },
        api: { label: 'API / Server', icon: 'heroicons:server' },
        page: { label: 'Page / Component', icon: 'heroicons:document-text' },
        boundary: { label: '<NuxtErrorBoundary>', icon: 'heroicons:shield-check' },
        error_page: { label: 'error.vue', icon: 'heroicons:exclamation-triangle' }
    }

    const scenarios = [
        {
            id: '404',
            label: '404 Not Found',
            color: 'amber',
            action: async () => {
                currentError.value = '404'
                activePath.value = []
                await wait(300)
                activePath.value.push('start')
                await wait(500)
                activePath.value.push('api')
                await wait(500)
                activePath.value.push('error_page')
            }
        },
        {
            id: '500',
            label: '500 Server Error',
            color: 'red',
            action: async () => {
                currentError.value = '500'
                activePath.value = []
                await wait(300)
                activePath.value.push('start')
                await wait(500)
                activePath.value.push('api')
                await wait(500)
                activePath.value.push('error_page')
            }
        },
        {
            id: 'client',
            label: 'Client Error (Recoverable)',
            color: 'sky',
            action: async () => {
                currentError.value = 'client'
                activePath.value = []
                await wait(300)
                activePath.value.push('start')
                await wait(500)
                activePath.value.push('page')
                await wait(500)
                activePath.value.push('boundary')
            }
        }
    ]

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
</script>

<template>
    <div class="grid lg:grid-cols-3 gap-8">
        <!-- Controls -->
        <div class="space-y-6">
            <div class="space-y-3">
                <label class="text-xs font-bold text-slate-400 uppercase">Simulate Error</label>
                <div class="space-y-2">
                    <button v-for="scenario in scenarios" :key="scenario.id" @click="scenario.action()"
                        :disabled="activePath.length > 0 && activePath.length < 3"
                        class="w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                        :class="currentError === scenario.id
                            ? `bg-${scenario.color}-500/10 border-${scenario.color}-500/50 ring-1 ring-${scenario.color}-500/20`
                            : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800 hover:border-slate-700'">
                        <div class="p-2 rounded-md"
                            :class="currentError === scenario.id ? `bg-${scenario.color}-500/20 text-${scenario.color}-400` : 'bg-slate-800 text-slate-500'">
                            <Icon :name="scenario.id === 'client' ? 'heroicons:code-bracket' : 'heroicons:server'"
                                class="w-5 h-5" />
                        </div>
                        <div class="font-bold text-sm"
                            :class="currentError === scenario.id ? 'text-white' : 'text-slate-300'">{{ scenario.label }}
                        </div>
                    </button>
                </div>
            </div>

            <div class="p-4 rounded-lg bg-slate-900/50 border border-slate-800 transition-all duration-300"
                :class="{ 'opacity-50': !currentError }">
                <div class="text-xs font-mono text-slate-500 mb-2">// Code Example</div>
                <pre v-if="currentError === '404'" class="text-xs font-mono text-amber-400 whitespace-pre-wrap">throw createError({
  statusCode: 404,
  statusMessage: 'Page Not Found'
})</pre>
                <pre v-else-if="currentError === '500'" class="text-xs font-mono text-red-400 whitespace-pre-wrap">throw createError({
  statusCode: 500,
  statusMessage: 'Internal Server Error',
  fatal: true
})</pre>
                <pre v-else-if="currentError === 'client'" class="text-xs font-mono text-sky-400 whitespace-pre-wrap">&lt;NuxtErrorBoundary&gt;
  &lt;template #error="{ error }"&gt;
    &lt;button @click="error.value = null"&gt;
      Recover
    &lt;/button&gt;
  &lt;/template&gt;
&lt;/NuxtErrorBoundary&gt;</pre>
                <pre v-else class="text-xs font-mono text-slate-600">Select a scenario...</pre>
            </div>
        </div>

        <!-- Flowchart -->
        <div
            class="lg:col-span-2 bg-slate-950 rounded-xl border border-slate-800 p-8 relative overflow-hidden flex items-center justify-center">

            <div class="relative z-10 flex flex-col gap-8 w-full max-w-sm">

                <!-- Start -->
                <div class="flex justify-center">
                    <div class="px-6 py-3 rounded-full border transition-all duration-500 flex items-center gap-3"
                        :class="activePath.includes('start') ? 'bg-slate-800 border-slate-600 text-white shadow-lg shadow-emerald-500/10 scale-110' : 'bg-slate-900 border-slate-800 text-slate-500'">
                        <Icon :name="steps.start.icon" class="w-5 h-5" />
                        <span class="font-bold text-sm">{{ steps.start.label }}</span>
                    </div>
                </div>

                <!-- Path Split -->
                <div class="grid grid-cols-2 gap-8 relative">
                    <!-- Connecting Lines -->
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-px h-8 bg-slate-800">
                        <div class="absolute inset-0 bg-emerald-500 transition-all duration-500"
                            :style="{ height: activePath.includes('start') ? '100%' : '0%' }"></div>
                    </div>

                    <!-- Left: API -->
                    <div class="flex flex-col items-center gap-4">
                        <div class="w-px h-8 bg-slate-800 relative">
                            <div class="absolute top-0 left-0 w-full bg-emerald-500 transition-all duration-500"
                                :style="{ height: activePath.includes('api') ? '100%' : '0%' }"></div>
                        </div>
                        <div class="px-6 py-4 rounded-xl border transition-all duration-500 w-full text-center"
                            :class="activePath.includes('api') ? 'bg-slate-800 border-slate-600 text-white shadow-lg' : 'bg-slate-900 border-slate-800 text-slate-500'">
                            <Icon :name="steps.api.icon" class="w-6 h-6 mb-2 mx-auto" />
                            <div class="font-bold text-sm">{{ steps.api.label }}</div>
                        </div>
                    </div>

                    <!-- Right: Page -->
                    <div class="flex flex-col items-center gap-4">
                        <div class="w-px h-8 bg-slate-800 relative">
                            <div class="absolute top-0 left-0 w-full bg-emerald-500 transition-all duration-500"
                                :style="{ height: activePath.includes('page') ? '100%' : '0%' }"></div>
                        </div>
                        <div class="px-6 py-4 rounded-xl border transition-all duration-500 w-full text-center"
                            :class="activePath.includes('page') ? 'bg-slate-800 border-slate-600 text-white shadow-lg' : 'bg-slate-900 border-slate-800 text-slate-500'">
                            <Icon :name="steps.page.icon" class="w-6 h-6 mb-2 mx-auto" />
                            <div class="font-bold text-sm">{{ steps.page.label }}</div>
                        </div>
                    </div>
                </div>

                <!-- Outcomes -->
                <div class="grid grid-cols-2 gap-8 relative">
                    <!-- Left: Error Page -->
                    <div class="flex flex-col items-center gap-4">
                        <div class="w-px h-8 bg-slate-800 relative">
                            <div class="absolute top-0 left-0 w-full bg-emerald-500 transition-all duration-500"
                                :style="{ height: activePath.includes('error_page') ? '100%' : '0%' }"></div>
                        </div>
                        <div class="px-6 py-4 rounded-xl border-2 border-dashed transition-all duration-500 w-full text-center relative overflow-hidden"
                            :class="activePath.includes('error_page') ? 'bg-red-500/10 border-red-500 text-red-400 shadow-lg shadow-red-500/20' : 'bg-slate-900/50 border-slate-800 text-slate-600'">
                            <Icon :name="steps.error_page.icon" class="w-6 h-6 mb-2 mx-auto" />
                            <div class="font-bold text-sm">{{ steps.error_page.label }}</div>
                            <div v-if="activePath.includes('error_page')" class="text-xs mt-1 opacity-75">Full Page
                                Reload</div>
                        </div>
                    </div>

                    <!-- Right: Boundary -->
                    <div class="flex flex-col items-center gap-4">
                        <div class="w-px h-8 bg-slate-800 relative">
                            <div class="absolute top-0 left-0 w-full bg-emerald-500 transition-all duration-500"
                                :style="{ height: activePath.includes('boundary') ? '100%' : '0%' }"></div>
                        </div>
                        <div class="px-6 py-4 rounded-xl border-2 border-dashed transition-all duration-500 w-full text-center"
                            :class="activePath.includes('boundary') ? 'bg-sky-500/10 border-sky-500 text-sky-400 shadow-lg shadow-sky-500/20' : 'bg-slate-900/50 border-slate-800 text-slate-600'">
                            <Icon :name="steps.boundary.icon" class="w-6 h-6 mb-2 mx-auto" />
                            <div class="font-bold text-sm">{{ steps.boundary.label }}</div>
                            <div v-if="activePath.includes('boundary')" class="text-xs mt-1 opacity-75">Component
                                Fallback</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
