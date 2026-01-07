<script setup lang="ts">
    const method = ref('GET')
    const url = ref('/api/demo')
    const requestBody = ref('{\n  "name": "Nuxt User",\n  "role": "Developer"\n}')

    const response = ref<any>(null)
    const status = ref<number | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const executeRequest = async () => {
        loading.value = true
        response.value = null
        error.value = null
        status.value = null

        try {
            const res = await $fetch.raw(url.value, {
                method: method.value as any,
                body: method.value === 'POST' ? JSON.parse(requestBody.value) : undefined
            })
            response.value = res._data
            status.value = res.status
        } catch (err: any) {
            error.value = err.message
            status.value = err.response?.status || 500
            response.value = err.response?._data
        } finally {
            loading.value = false
        }
    }
</script>

<template>
    <div class="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl ring-1 ring-white/5">
        <!-- Toolbar -->
        <div class="flex items-center gap-2 p-3 bg-slate-900/50 border-b border-slate-800">
            <select v-model="method"
                class="bg-slate-800 text-white text-sm font-bold rounded px-2 py-1.5 border border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer">
                <option value="GET">GET</option>
                <option value="POST">POST</option>
            </select>

            <input v-model="url" type="text"
                class="flex-1 bg-slate-900 text-slate-300 text-sm rounded px-3 py-1.5 border border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none font-mono" />

            <button @click="executeRequest" :disabled="loading"
                class="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                <Icon v-if="loading" name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
                <span v-else>Send</span>
            </button>
        </div>

        <div class="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 h-80">
            <!-- Request Body (Only for POST) -->
            <div class="flex flex-col">
                <div class="px-4 py-2 text-xs font-bold text-slate-500 bg-slate-900/30 border-b border-slate-800/50">
                    Request Body (JSON)
                </div>
                <div class="relative flex-1">
                    <textarea v-if="method === 'POST'" v-model="requestBody"
                        class="w-full h-full bg-slate-950 p-4 text-sm font-mono text-slate-300 resize-none focus:outline-none"
                        spellcheck="false"></textarea>
                    <div v-else class="flex items-center justify-center h-full text-slate-600 text-sm italic">
                        No body for GET requests
                    </div>
                </div>
            </div>

            <!-- Response -->
            <div class="flex flex-col bg-slate-900/20">
                <div class="px-4 py-2 flex justify-between items-center border-b border-slate-800/50 bg-slate-900/30">
                    <span class="text-xs font-bold text-slate-500">Response</span>
                    <span v-if="status" :class="[
                        'text-xs font-mono px-2 py-0.5 rounded',
                        status >= 200 && status < 300 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    ]">
                        {{ status }}
                    </span>
                </div>
                <div class="flex-1 overflow-auto p-4">
                    <pre v-if="response"
                        class="text-xs font-mono text-emerald-300 leading-relaxed">{{ JSON.stringify(response, null, 2) }}</pre>
                    <div v-else-if="error" class="text-xs font-mono text-red-400">{{ error }}</div>
                    <div v-else class="flex items-center justify-center h-full text-slate-600 text-sm">
                        Ready to send request...
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
