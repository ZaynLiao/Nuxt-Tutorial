<script setup lang="ts">
    const route = useRoute()

    const toc = computed(() => {
        return route.meta.toc || []
    })
</script>

<template>
    <AppTopBar />
    <div class="flex max-w-7xl mx-auto min-h-dvh">
        <DocsSidebar />

        <main class="min-w-0 flex-1 border-x border-slate-800/40 border-t-2 border-t-emerald-500">
            <div class="mx-auto max-w-4xl px-4 py-8 pb-24 lg:px-10">
                <div
                    class="pointer-events-none absolute -left-20 -top-20 -z-10 h-96 w-96 scale-150 rounded-full bg-emerald-900/20 blur-3xl">
                </div>
                <slot />
            </div>
        </main>

        <DocsToc v-if="toc.length" :items="toc" />
    </div>
</template>
