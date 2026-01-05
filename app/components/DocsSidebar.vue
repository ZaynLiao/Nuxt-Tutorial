<script setup lang="ts">
    type SidebarLink = { label: string; to: string; icon: string }
    type SidebarGroup = { title: string; links: SidebarLink[] }

    const route = useRoute()

    const groups: SidebarGroup[] = sidebarGroups

    const isActive = (to: string) => to && route.path === to
</script>

<template>
    <aside class="hidden lg:block lg:w-72 lg:shrink-0 bg-slate-950 border-r border-slate-800/50">
        <div class="sticky top-0 h-screen pt-16 overflow-y-auto px-4 py-8">
            <div class="space-y-8">
                <div v-for="group in groups" :key="group.title" class="space-y-3">
                    <div class="px-3 text-xs font-bold tracking-widest uppercase text-slate-500">
                        {{ group.title }}
                    </div>
                    <nav class="space-y-1">
                        <NuxtLink v-for="link in group.links" :key="link.label" :to="link.to || undefined"
                            class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200"
                            :class="[
                                isActive(link.to)
                                    ? 'bg-emerald-500/10 text-emerald-400 font-medium shadow-sm shadow-emerald-900/20 ring-1 ring-emerald-500/20'
                                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200',
                                !link.to && 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-slate-400'
                            ]">
                            <Icon :name="link.icon" class="h-5 w-5 shrink-0 transition-colors"
                                :class="isActive(link.to) ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'" />
                            <span class="truncate">{{ link.label }}</span>
                        </NuxtLink>
                    </nav>
                </div>

                <div class="pt-6 mt-6 border-t border-slate-800/50 px-3">
                    <div class="flex items-center gap-2 text-xs text-slate-600 font-mono">
                        <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        Nuxt v4.0.0
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>
