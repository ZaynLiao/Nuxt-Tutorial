<script setup lang="ts">
    useHead({
        titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - Nuxt-Tutorial` : 'Nuxt-Tutorial')
    })
</script>

<template>
    <NuxtLoadingIndicator />
    <LayoutBackground />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
