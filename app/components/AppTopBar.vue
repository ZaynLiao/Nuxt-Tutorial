<template>
    <header
        class="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md shadow-lg shadow-emerald-900/5">
        <div class="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 justify-between">
            <!-- Logo -->
            <NuxtLink to="/"
                class="flex items-center gap-3 font-semibold text-slate-200 hover:text-white transition-colors group shrink-0">
                <div
                    class="p-1.5 rounded-lg bg-linear-to-br from-emerald-500/20 to-emerald-600/20 ring-1 ring-white/10 group-hover:ring-emerald-500/50 transition-all">
                    <Icon name="logos:nuxt-icon" class="w-6 h-6" aria-label="Nuxt Logo" />
                </div>
                <span class="text-lg tracking-tight font-bold hidden sm:block">Nuxt Tutorial</span>
                <NuxtBadge color="primary" size="xs" class="font-bold ring-1 ring-emerald-500/20">v4
                </NuxtBadge>
            </NuxtLink>

            <!-- Navigation -->
            <nav class="hidden md:flex items-center gap-1">
                <NuxtLink to="/docs/1-getting-started/installation"
                    class="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
                    基礎入門
                </NuxtLink>
                <NuxtLink to="/docs/2-core-concepts/data-fetching"
                    class="px-4 py-2 text-sm font-bold text-slate-200 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors flex items-center gap-1.5 group">
                    <Icon name="heroicons:star-solid"
                        class="w-4 h-4 text-emerald-400 group-hover:text-yellow-400 transition-colors" />
                    核心修練
                </NuxtLink>
                <NuxtLink to="/docs/3-architecture/route-middleware"
                    class="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
                    進階架構
                </NuxtLink>
                <NuxtLink to="/docs/4-devops/typescript"
                    class="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
                    工程筆記
                </NuxtLink>
            </nav>

            <!-- Actions -->
            <div class="flex items-center gap-2">
                <NuxtButton icon="heroicons:magnifying-glass" color="neutral" variant="ghost" aria-label="搜尋"
                    class="hover:bg-slate-800/50 text-slate-400 hover:text-white" />
                <div class="w-px h-4 bg-slate-800 mx-1 hidden sm:block"></div>
                <NuxtButton to="https://github.com/nuxt/nuxt" target="_blank" icon="simple-icons:github" color="neutral"
                    variant="ghost" aria-label="GitHub" class="hover:bg-slate-800/50 text-slate-400 hover:text-white" />
            </div>
        </div>
    </header>
</template>
