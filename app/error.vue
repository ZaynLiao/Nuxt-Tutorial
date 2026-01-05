<script setup lang="ts">
    import type { NuxtError } from '#app'

    const props = defineProps<{
        error: NuxtError
    }>()

    const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <div
        class="relative flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white overflow-hidden">
        <div class="text-center relative z-10">
            <h1 class="text-9xl font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-slate-500">{{
                error.statusCode }}</h1>
            <p class="mt-8 text-3xl font-bold text-white">{{ error.message }}</p>
            <p class="mt-4 text-lg text-slate-400">抱歉，發生了一些錯誤。</p>

            <div class="mt-12">
                <NuxtButton @click="handleError" color="primary" variant="solid" size="xl"
                    class="font-bold cursor-pointer px-8">
                    回首頁
                </NuxtButton>
            </div>
        </div>
    </div>
</template>
