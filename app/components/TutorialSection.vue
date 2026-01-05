<script setup lang="ts">
    defineProps<{
        id: string
        title: string
        icon?: string
        iconColor?: string
        separator?: boolean
    }>()
</script>

<template>
    <section :id="id" class="space-y-8 scroll-mt-32 mb-24">
        <h2 class="text-2xl font-bold text-white flex items-center gap-3 group">
            <div v-if="icon" class="items-center flex" :class="iconColor || 'text-emerald-400'">
                <Icon :name="icon" class="w-6 h-6" />
            </div>
            {{ title }}
        </h2>

        <div class="text-slate-400 leading-relaxed space-y-6">
            <slot />
        </div>

        <hr v-if="separator" class="border-slate-800/50 mt-12" />
    </section>
</template>
