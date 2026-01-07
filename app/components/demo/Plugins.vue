<script setup lang="ts">
    type ToastType = 'success' | 'error' | 'info'
    interface Toast {
        id: number
        message: string
        type: ToastType
    }

    const toasts = ref<Toast[]>([])
    const logs = ref<string[]>([])
    let idCounter = 0

    // Simulated Plugin Injection
    const $toast = {
        success: (msg: string) => addToast(msg, 'success'),
        error: (msg: string) => addToast(msg, 'error'),
        info: (msg: string) => addToast(msg, 'info')
    }

    const addToast = (message: string, type: ToastType) => {
        const id = idCounter++
        toasts.value.push({ id, message, type })

        // Log the internal action
        logs.value.unshift(`[Plugin: $toast] ${type}('${message}') called`)
        if (logs.value.length > 5) logs.value.pop()

        setTimeout(() => {
            toasts.value = toasts.value.filter((t: { id: number }) => t.id !== id)
        }, 3000)
    }

    const clearLogs = () => logs.value = []
</script>

<template>
    <div class="grid md:grid-cols-2 gap-6">
        <!-- Interactive App View -->
        <div
            class="relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl ring-1 ring-white/5 h-80 flex flex-col">
            <!-- Fake Browser Header -->
            <div class="h-10 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                <div class="flex gap-1.5">
                    <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div class="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                </div>
                <div
                    class="ml-4 flex-1 bg-slate-950 h-6 rounded border border-slate-800 flex items-center px-3 text-xs text-slate-500 font-mono">
                    localhost:3000
                </div>
            </div>

            <!-- App Content -->
            <div class="flex-1 p-6 relative">
                <div class="text-center space-y-6">
                    <h4 class="text-slate-200 font-bold">My Nuxt App</h4>
                    <p class="text-xs text-slate-500">Click buttons to trigger the injected plugin.</p>

                    <div class="flex flex-wrap justify-center gap-3">
                        <button @click="$toast.success('Profile saved!')"
                            class="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all active:scale-95">
                            Save Profile
                        </button>
                        <button @click="$toast.error('Connection failed')"
                            class="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all active:scale-95">
                            Delete Item
                        </button>
                        <button @click="$toast.info('New update available')"
                            class="px-4 py-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold hover:bg-sky-500/20 transition-all active:scale-95">
                            Check Update
                        </button>
                    </div>
                </div>

                <!-- Toast Container (Simulated) -->
                <div class="absolute bottom-4 right-4 flex flex-col gap-2 pointer-events-none">
                    <TransitionGroup enter-active-class="transition duration-300 ease-out"
                        enter-from-class="translate-x-full opacity-0" enter-to-class="translate-x-0 opacity-100"
                        leave-active-class="transition duration-200 ease-in"
                        leave-from-class="translate-x-0 opacity-100" leave-to-class="translate-x-full opacity-0">
                        <div v-for="toast in toasts" :key="toast.id"
                            class="px-4 py-3 rounded-lg shadow-lg border backdrop-blur-md flex items-center gap-3 min-w-52"
                            :class="{
                                'bg-emerald-950/80 border-emerald-500/30 text-emerald-400': toast.type === 'success',
                                'bg-red-950/80 border-red-500/30 text-red-400': toast.type === 'error',
                                'bg-sky-950/80 border-sky-500/30 text-sky-400': toast.type === 'info',
                            }">
                            <Icon
                                :name="toast.type === 'success' ? 'heroicons:check-circle' : toast.type === 'error' ? 'heroicons:exclamation-circle' : 'heroicons:information-circle'"
                                class="w-5 h-5 shrink-0" />
                            <span class="text-xs font-bold">{{ toast.message }}</span>
                        </div>
                    </TransitionGroup>
                </div>
            </div>
        </div>

        <!-- Code / Logs View -->
        <div class="flex flex-col gap-4">
            <!-- Plugin Definition -->
            <div class="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-bold text-slate-500 uppercase">plugins/toast.ts</span>
                    <Icon name="logos:typescript-icon" class="w-3 h-3 opacity-50" />
                </div>
                <pre class="font-mono text-xs leading-relaxed text-slate-300 overflow-x-auto">export default defineNuxtPlugin(() => {
  return {
    provide: {
      toast: {
        success: (msg) => { ... },
        error: (msg) => { ... }
      }
    }
  }
})</pre>
            </div>

            <!-- Console -->
            <div class="flex-1 rounded-xl border border-slate-800 bg-slate-950 flex flex-col overflow-hidden">
                <div class="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/30">
                    <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Console</span>
                    <button @click="clearLogs"
                        class="text-xs text-slate-500 hover:text-white transition-colors">Clear</button>
                </div>
                <div class="flex-1 p-4 font-mono text-xs space-y-2 overflow-y-auto">
                    <div v-if="logs.length === 0" class="text-slate-700 italic">No events yet...</div>
                    <div v-for="(log, i) in logs" :key="i"
                        class="text-emerald-400/80 border-l-2 border-emerald-500/20 pl-2">
                        {{ log }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
