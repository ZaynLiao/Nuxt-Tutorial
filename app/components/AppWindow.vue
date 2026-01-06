<script setup lang="ts">
    defineProps<{
        title?: string
        icon?: string
        noPadding?: boolean
        type?: 'default' | 'code' | 'construction'
    }>()
</script>

<template>
    <div class="group relative overflow-hidden rounded-xl border bg-slate-950 shadow-xl ring-1 ring-white/5" :class="[
        type === 'code' ? 'border-slate-800' : 'border-slate-700/50',
        type === 'construction' ? 'border-yellow-500/20 bg-yellow-500/5' : ''
    ]">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-3" :class="[
            type === 'code'
                ? 'border-b border-slate-800 bg-slate-900/50'
                : type === 'construction'
                    ? 'border-b border-yellow-500/10 bg-yellow-500/10'
                    : 'bg-slate-900/30 border-b border-white/5'
        ]">
            <div class="flex items-center gap-3">
                <!-- Tech Dots (Code Mode) -->
                <div v-if="type === 'code'" class="flex gap-1.5">
                    <div class="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
                    <div class="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
                    <div class="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></div>
                </div>

                <!-- Construction Mode -->
                <div v-else-if="type === 'construction'"
                    class="flex items-center justify-center w-6 h-6 rounded-md bg-yellow-500/10 text-yellow-400 ring-1 ring-yellow-500/20">
                    <Icon name="heroicons:wrench-screwdriver" class="w-4 h-4" />
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
            <slot>
                <!-- Default Construction Content -->
                <div v-if="type === 'construction'"
                    class="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div class="relative mb-6">
                        <div class="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full"></div>
                        <Icon name="heroicons:wrench-screwdriver" class="relative w-16 h-16 text-yellow-500" />
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">內容撰寫中</h3>
                    <p class="text-slate-400 max-w-sm">
                        此章節正在趕工中，我們將盡快補上完整教學內容。
                    </p>
                </div>
            </slot>
        </div>
    </div>
</template>
