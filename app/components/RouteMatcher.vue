<script setup lang="ts">
    const inputPath = ref('/users/123')

    type RouteDef = {
        path: string
        file: string
        type: 'static' | 'dynamic' | 'catch-all'
        params?: string[]
    }

    const routes: RouteDef[] = [
        { path: '/', file: 'pages/index.vue', type: 'static' },
        { path: '/about', file: 'pages/about.vue', type: 'static' },
        { path: '/users', file: 'pages/users/index.vue', type: 'static' },
        { path: '/users/:id', file: 'pages/users/[id].vue', type: 'dynamic', params: ['id'] },
        { path: '/posts/:slug', file: 'pages/posts/[slug].vue', type: 'dynamic', params: ['slug'] },
        { path: '/:pathMatch(.*)*', file: 'pages/[...slug].vue', type: 'catch-all', params: ['slug'] }
    ]

    const matchedRoute = computed(() => {
        const path = inputPath.value.replace(/\/$/, '') || '/'

        // 1. Exact match
        const exact = routes.find(r => r.type === 'static' && r.path === path)
        if (exact) return { route: exact, params: {} }

        // 2. Dynamic match (Simple regex for demo)
        // /users/123 -> matches /users/:id
        if (path.startsWith('/users/')) {
            const id = path.split('/')[2]
            if (id) return { route: routes.find(r => r.file === 'pages/users/[id].vue')!, params: { id } }
        }

        if (path.startsWith('/posts/')) {
            const slug = path.split('/')[2]
            if (slug) return { route: routes.find(r => r.file === 'pages/posts/[slug].vue')!, params: { slug } }
        }

        // 3. Catch all
        return {
            route: routes.find(r => r.type === 'catch-all')!,
            params: { slug: path.substring(1).split('/') }
        }
    })
</script>

<template>
    <div class="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl ring-1 ring-white/5">
        <!-- Browser Bar -->
        <div class="flex items-center gap-3 p-3 bg-slate-900/50 border-b border-slate-800">
            <div class="flex gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            </div>
            <div class="flex-1 bg-slate-950 rounded-md border border-slate-800 flex items-center px-3 py-1.5 gap-2">
                <Icon name="heroicons:lock-closed" class="w-3 h-3 text-emerald-500" />
                <span class="text-xs text-slate-500">https://example.com</span>
                <input v-model="inputPath" type="text"
                    class="flex-1 bg-transparent text-white text-sm outline-none font-mono"
                    placeholder="/path/to/page" />
            </div>
        </div>

        <div class="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <!-- File System -->
            <div class="p-6 bg-slate-900/20">
                <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">File System</h4>
                <div class="space-y-2 font-mono text-sm">
                    <div v-for="r in routes" :key="r.file"
                        class="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300"
                        :class="matchedRoute.route.file === r.file ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 opacity-50'">
                        <Icon :name="r.type === 'catch-all' ? 'heroicons:exclamation-triangle' : 'logos:vue'"
                            class="w-4 h-4 shrink-0" />
                        <span>{{ r.file }}</span>
                        <span v-if="matchedRoute.route.file === r.file"
                            class="ml-auto text-[10px] bg-emerald-500 text-emerald-950 px-1.5 rounded font-bold">MATCH</span>
                    </div>
                </div>
            </div>

            <!-- Result -->
            <div class="p-6">
                <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Route Params</h4>

                <div v-if="Object.keys(matchedRoute.params).length > 0" class="space-y-4">
                    <div class="p-4 rounded-lg bg-slate-900 border border-slate-800 font-mono text-sm">
                        <div class="text-slate-400 mb-2">// useRoute().params</div>
                        <div class="text-emerald-300">
                            {{ JSON.stringify(matchedRoute.params, null, 2) }}
                        </div>
                    </div>

                    <div class="flex items-center gap-2 text-xs text-slate-400">
                        <Icon name="heroicons:information-circle" class="w-4 h-4 text-emerald-500" />
                        <span>Dynamic segments are automatically extracted.</span>
                    </div>
                </div>

                <div v-else class="h-full flex flex-col items-center justify-center text-slate-600 gap-2">
                    <Icon name="heroicons:cube-transparent" class="w-8 h-8 opacity-50" />
                    <span class="text-sm">No dynamic parameters</span>
                </div>
            </div>
        </div>
    </div>
</template>
