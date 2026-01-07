<script setup lang="ts">
    const { currentGroup } = useDocsNavigation()

    // 判斷是否為「目前群組」
    const isActive = (groupId?: string) => {
        return currentGroup.value?.id === groupId
    }
</script>
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
                <span class="text-lg tracking-tight font-bold hidden sm:block">Nuxt-Tutorial</span>
                <NuxtBadge color="primary" size="sm" class="font-bold ring-1 ring-emerald-500/20">v4
                </NuxtBadge>
            </NuxtLink>

            <!-- Navigation -->
            <nav class="hidden md:flex items-center gap-2">
                <NuxtLink v-for="group in sidebarGroups" :key="group.id" :to="group.items[0]?.to"
                    class="relative px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-300" :class="[
                        isActive(group.id)
                            ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 shadow-sm shadow-emerald-900/20'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                    ]">
                    {{ group.title }}
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
