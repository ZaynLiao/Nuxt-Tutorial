<script setup lang="ts">
    useHead({
        titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - Nuxt 教學` : 'Nuxt 教學')
    })
</script>

<template>
    <NuxtLoadingIndicator color="var(--color-emerald-500)" />
    <AppBackground />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
