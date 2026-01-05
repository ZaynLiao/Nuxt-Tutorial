<script setup lang="ts">
    type TocItem = { id: string; label: string }

    const props = defineProps<{ items: TocItem[] }>()

    const activeIds = ref<Set<string>>(new Set())
    let observer: IntersectionObserver | null = null

    const startObserving = () => {
        if (observer) observer.disconnect()
        activeIds.value.clear()

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.id
                    if (entry.isIntersecting) {
                        activeIds.value.add(id)
                    } else {
                        activeIds.value.delete(id)
                    }
                })
                activeIds.value = new Set(activeIds.value)
            },
            {
                rootMargin: '-60px 0px 0px 0px',
                threshold: 0
            }
        )

        nextTick(() => {
            for (const item of props.items) {
                const el = document.getElementById(item.id)
                if (el) observer?.observe(el)
            }
        })
    }

    onMounted(startObserving)

    watch(() => props.items, startObserving, { deep: true })

    onBeforeUnmount(() => {
        observer?.disconnect()
        observer = null
    })

    const isActive = (id: string) => activeIds.value.has(id)
</script>

<template>
    <aside class="hidden xl:block xl:w-64 xl:shrink-0 bg-slate-900/50">
        <div class="sticky top-24 overflow-auto px-6 py-6">
            <div class="flex items-center gap-2 mb-4">
                <Icon name="heroicons:list-bullet" class="text-emerald-400" size="20" />
                <div class="text-sm font-bold tracking-widest uppercase text-slate-500">本頁內容</div>
            </div>
            <nav class="relative">
                <!-- Base Line -->
                <div class="absolute left-0 top-0 bottom-0 w-px bg-slate-800/50"></div>

                <a v-for="item in items" :key="item.id" :href="`#${item.id}`"
                    class="block text-sm leading-6 transition-all duration-300 py-1.5 pl-4 border-l-2 -ml-px" :class="isActive(item.id)
                        ? 'text-emerald-400 border-emerald-500 font-medium'
                        : 'text-slate-400 hover:text-slate-200 border-transparent hover:border-slate-600'">
                    {{ item.label }}
                </a>
            </nav>
        </div>
    </aside>
</template>
