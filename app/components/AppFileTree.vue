<script setup lang="ts">
    interface FileNode {
        id?: string
        name: string
        type?: 'file' | 'folder'
        icon?: string
        color?: string // 'emerald' | 'sky' | 'amber' | 'slate' | 'rose' | 'primary' | 'neutral' or raw classes
        children?: FileNode[]
        highlight?: boolean
        description?: string
        badge?: {
            text: string
            color: string
        }
        [key: string]: any
    }

    const props = withDefaults(defineProps<{
        files: FileNode[]
        modelValue?: string
        interactive?: boolean
        root?: boolean
    }>(), {
        interactive: false,
        root: true
    })

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void
        (e: 'select', node: FileNode): void
    }>()

    const isSelected = (item: FileNode) => {
        if (!props.interactive) return false
        return props.modelValue === item.id
    }

    const handleSelect = (item: FileNode) => {
        if (!props.interactive) return
        if (item.id) {
            emit('update:modelValue', item.id)
        }
        emit('select', item)
    }

    const getColorClasses = (color?: string) => {
        if (!color) return 'text-slate-500'

        // Presets
        const presets: Record<string, string> = {
            emerald: 'text-emerald-400',
            sky: 'text-sky-400',
            amber: 'text-amber-400',
            slate: 'text-slate-500',
            rose: 'text-rose-400',
            primary: 'text-emerald-400',
            neutral: 'text-slate-400',
            blue: 'text-blue-400'
        }

        return presets[color] || color // Return preset or raw class
    }

    const getIndicatorColor = (color?: string) => {
        const map: Record<string, string> = {
            emerald: 'bg-emerald-500',
            sky: 'bg-sky-500',
            amber: 'bg-amber-500',
            rose: 'bg-rose-500',
            blue: 'bg-blue-500',
            primary: 'bg-emerald-500',
        }
        return map[color || ''] || 'bg-slate-500'
    }

    const getBadgeClasses = (color?: string) => {
        const map: Record<string, string> = {
            emerald: 'border-emerald-500/30 text-emerald-400',
            sky: 'border-sky-500/30 text-sky-400',
            amber: 'border-amber-500/30 text-amber-400',
            slate: 'border-slate-500/30 text-slate-400',
        }
        return map[color || ''] || 'border-slate-500/30 text-slate-400'
    }
</script>

<template>
    <ul :class="[root ? 'space-y-0.5 font-mono text-sm' : 'pl-4 ml-2.5 border-l border-slate-800 mt-1 space-y-0.5']">
        <li v-for="(item, index) in files" :key="item.id || item.name + index">
            <div @click="handleSelect(item)"
                class="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-md transition-all duration-200 group"
                :class="[
                    interactive ? 'cursor-pointer' : 'cursor-default',
                    isSelected(item) ? 'bg-slate-800 text-white shadow-sm' : (interactive ? 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200' : 'text-slate-400'),
                    item.highlight ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20' : ''
                ]">
                <!-- Icon -->
                <Icon :name="item.icon || (item.children ? 'heroicons:folder' : 'heroicons:document')"
                    class="w-4 h-4 transition-colors flex-shrink-0" :class="[
                        isSelected(item) ? getColorClasses(item.color) : (item.highlight ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'),
                        // Override if color is provided and not selected/highlighted logic above overrides it
                        (!isSelected(item) && !item.highlight && item.color) ? getColorClasses(item.color) : ''
                    ]" />

                <!-- Name -->
                <span :class="[item.highlight ? 'font-bold' : '']">{{ item.name }}</span>

                <!-- Badge -->
                <span v-if="item.badge" class="ml-auto text-xs border px-1.5 rounded"
                    :class="getBadgeClasses(item.badge.color)">
                    {{ item.badge.text }}
                </span>

                <!-- Active Indicator (Interactive only) -->
                <div v-if="interactive && isSelected(item)" class="ml-auto w-1.5 h-1.5 rounded-full"
                    :class="getIndicatorColor(item.color)">
                </div>
            </div>

            <!-- Recursion -->
            <AppFileTree v-if="item.children" :files="item.children" :root="false" :interactive="interactive"
                :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)"
                @select="$emit('select', $event)" />
        </li>
    </ul>
</template>
