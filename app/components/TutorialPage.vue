<script setup lang="ts">

    const props = defineProps<{
        title?: string
        description?: string
        badges?: { label: string, color?: string }[]
        sections?: { id: string, title: string }[]
    }>()

    const slots = useSlots()
    const { prev, next, currentGroup, currentPage } = useDocsNavigation()

    // Priority: Props > Navigation Data > Default
    const displayTitle = computed(() => props.title || currentPage.value?.label || '')
    const displayDesc = computed(() => props.description || currentPage.value?.description || '')
    const displayBadges = computed(() => props.badges || currentPage.value?.badges)

    // Automated SEO
    useSeoMeta({
        title: displayTitle,
        ogTitle: displayTitle,
        description: displayDesc,
        ogDescription: displayDesc,
    })
</script>

<template>
    <div class="relative space-y-16 py-8 lg:py-8">
        <!-- Header -->
        <header class="relative space-y-6">
            <!-- Breadcrumbs / Group Info -->
            <div v-if="currentGroup" class="flex items-center gap-2 text-sm font-medium text-emerald-400 mb-6">
                <Icon v-if="currentGroup.icon" :name="currentGroup.icon" size="16" />
                <span>{{ currentGroup.title }}</span>
                <Icon name="heroicons:chevron-right" size="14" class="text-emerald-500/50" />
            </div>

            <div v-if="displayBadges" class="flex flex-wrap gap-3">
                <NuxtBadge v-for="b in displayBadges" :key="b.label"
                    :color="b.color as 'primary' | 'neutral' || 'neutral'" size="md" class="px-3 py-1">
                    {{ b.label }}
                </NuxtBadge>
            </div>

            <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center gap-4">
                <Icon v-if="currentPage?.icon" :name="currentPage.icon" size="40" class="text-emerald-400 shrink-0" />
                <span class="bg-linear-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                    {{ displayTitle }}
                </span>
            </h1>

            <p class="text-slate-400 text-md sm:text-md leading-relaxed max-w-3xl">
                {{ displayDesc }}
            </p>
        </header>

        <!-- Sections -->
        <div class="space-y-24">
            <!-- Default Slot for free-form content -->
            <slot />

            <!-- Dynamic Sections (from props) -->
            <template v-if="sections">
                <section v-for="section in sections" :key="section.id" :id="section.id" class="scroll-mt-32">
                    <h2 class="text-xl font-bold text-white mb-6">
                        {{ section.title }}
                    </h2>
                    <div class="text-slate-400 leading-relaxed">
                        <slot :name="section.id" />
                    </div>
                </section>
            </template>

            <!-- 1. Quick Navigation -->
            <section id="quick-nav" class="scroll-mt-32" v-if="slots['quick-nav']">
                <h2 class="text-xl font-bold text-white mb-8 flex items-center gap-3">
                    <Icon name="heroicons:map" class="text-emerald-400" size="24" />
                    快速導覽
                </h2>

                <NuxtCard class="bg-slate-900/40 backdrop-blur-sm ring-1 ring-slate-800 shadow-xl">
                    <div class="flex flex-col gap-6 p-6">
                        <slot name="quick-nav" />
                    </div>
                </NuxtCard>
            </section>

            <!-- 2. Live Preview -->
            <section id="live-preview" class="scroll-mt-32" v-if="slots.demo">
                <h2 class="text-xl font-bold text-white mb-8 flex items-center gap-3">
                    <Icon name="heroicons:play-circle" class="text-emerald-400" size="24" />
                    實作範例演示
                </h2>

                <div
                    class="relative group rounded-2xl border border-slate-800 bg-slate-950/30 p-8 sm:p-12 transition-all duration-500 hover:border-emerald-500/30 hover:shadow-glow">
                    <div class="absolute top-4 right-4 z-10">
                        <NuxtBadge color="neutral" variant="solid" size="xs"
                            class="bg-slate-800/80 backdrop-blur text-slate-300 border border-slate-700">Live Render
                        </NuxtBadge>
                    </div>

                    <div class="flex flex-col gap-8">
                        <!-- Explanation Area -->
                        <div class="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                            <h3 class="text-sm font-bold text-slate-200 mb-2 flex items-center gap-2">
                                <Icon name="heroicons:information-circle" class="text-emerald-400" size="16" />
                                功能說明
                            </h3>
                            <div class="text-sm text-slate-400 leading-relaxed">
                                <slot name="demo-description">
                                    此範例展示了組件的實際運作效果。
                                </slot>
                            </div>
                        </div>

                        <!-- Component Render Area -->
                        <div class="flex justify-center w-full">
                            <slot name="demo" />
                        </div>
                    </div>
                </div>
            </section>

            <!-- 3. Source Code -->
            <section id="source-code" class="scroll-mt-32" v-if="slots.code">
                <h2 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <Icon name="heroicons:code-bracket" class="text-emerald-400" size="24" />
                    原始碼觀察
                </h2>

                <slot name="code" />
            </section>

            <!-- 4. Sequential Navigation -->
            <nav v-if="prev || next"
                class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12 mt-12 border-t border-slate-800/50">
                <!-- Prev Link -->
                <NuxtLink v-if="prev" :to="prev.to"
                    class="group relative flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/30 p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-slate-900/60 hover:shadow-glow hover:-translate-y-1">
                    <div
                        class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-emerald-400 transition-colors">
                        <Icon name="heroicons:arrow-long-left" size="16"
                            class="group-hover:-translate-x-1 transition-transform" />
                        <span>Previous</span>
                    </div>

                    <div class="flex items-center gap-3">
                        <div
                            class="p-2 rounded-lg bg-slate-800 text-slate-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors flex items-center justify-center">
                            <Icon :name="prev.icon" size="20" />
                        </div>
                        <div class="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">
                            {{ prev.label }}
                        </div>
                    </div>
                </NuxtLink>
                <div v-else class="hidden sm:block"></div>

                <!-- Next Link -->
                <NuxtLink v-if="next" :to="next.to"
                    class="group relative flex flex-col gap-3 items-end rounded-2xl border border-slate-800 bg-slate-900/30 p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-slate-900/60 hover:shadow-glow hover:-translate-y-1 text-right">
                    <div
                        class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-emerald-400 transition-colors">
                        <span>Next</span>
                        <Icon name="heroicons:arrow-long-right" size="16"
                            class="group-hover:translate-x-1 transition-transform" />
                    </div>

                    <div class="flex flex-row-reverse items-center gap-3">
                        <div
                            class="p-2 rounded-lg bg-slate-800 text-slate-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors  flex items-center justify-center">
                            <Icon :name="next.icon" size="20" />
                        </div>
                        <div class="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">
                            {{ next.label }}
                        </div>
                    </div>
                </NuxtLink>
            </nav>
        </div>
    </div>
</template>
