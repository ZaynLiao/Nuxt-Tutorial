<script setup lang="ts">
    defineProps<{
        title?: string
        icon?: string
        noPadding?: boolean
        type?: 'default' | 'code'
    }>()
</script>

<template>
    <div class="group relative overflow-hidden rounded-xl border bg-slate-950 shadow-xl ring-1 ring-white/5" :class="[
        type === 'code' ? 'border-slate-800' : 'border-slate-700/50'
    ]">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-3" :class="[
            type === 'code'
                ? 'border-b border-slate-800 bg-slate-900/50'
                : 'bg-slate-900/30 border-b border-white/5'
        ]">
            <div class="flex items-center gap-3">
                <!-- Tech Dots (Code Mode) -->
                <div v-if="type === 'code'" class="flex gap-1.5">
                    <div class="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
                    <div class="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
                    <div class="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></div>
                </div>

                <!-- Window Icon (Default Mode) -->
                <div v-else
                    class="flex items-center justify-center w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                    <Icon :name="icon || 'heroicons:window'" size="14" />
                </div>

                <!-- Title -->
                <div v-if="title" class="flex items-center gap-2 text-xs font-mono" :class="[
                    type === 'code' ? 'ml-2 text-slate-400' : 'text-slate-200 font-bold tracking-wide'
                ]">
                    <Icon v-if="type === 'code' && icon" :name="icon" size="14" />
                    <span>{{ title }}</span>
                </div>
            </div>

            <!-- Header Actions -->
            <div class="flex items-center gap-2">
                <slot name="header" />
                <!-- Default Mode Decoration -->
                <div v-if="type !== 'code' && !$slots.header" class="flex gap-1 opacity-50">
                    <div class="w-1 h-1 rounded-full bg-slate-600"></div>
                    <div class="w-1 h-1 rounded-full bg-slate-600"></div>
                    <div class="w-1 h-1 rounded-full bg-slate-600"></div>
                </div>
            </div>
        </div>

        <!-- Content -->
        <div :class="[noPadding ? '' : 'p-4']">
            <slot />
        </div>
    </div>
</template>
