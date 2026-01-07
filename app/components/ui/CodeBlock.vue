<script setup lang="ts">
    // 直接解構並給預設值，Vue 3.5 之後會自動處理響應
    const {
        code,
        lang = 'typescript',
        filename,
        icon
    } = defineProps<{
        code: string
        lang?: BundledLanguage | 'text' | 'plain'
        filename?: string
        icon?: string
    }>()

    const copied = ref(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            copied.value = true
            setTimeout(() => {
                copied.value = false
            }, 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }
</script>

<template>
    <UiWindow :title="filename" :icon="icon" :no-padding="true" type="code">
        <template #header>
            <button @click="handleCopy"
                class="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-300">
                <Icon :name="copied ? 'heroicons:check' : 'heroicons:clipboard'" size="14" />
                <span class="hidden sm:inline">{{ copied ? 'Copied!' : 'Copy' }}</span>
            </button>
        </template>

        <div class="relative p-4 text-sm font-mono leading-relaxed">
            <Shiki :code="code" :lang="lang" class="whitespace-pre-wrap break-words" />
        </div>
    </UiWindow>
</template>
