<script setup lang="ts">
    useHead({
        title: '首頁',
        meta: [
            { name: 'description', content: 'Nuxt 4 繁體中文教學網站：透過視覺化圖解與實戰範例，帶你掌握現代化全端開發的最佳實踐。' }
        ]
    })
</script>

<template>
    <div class="min-h-screen">
        <HomeHero />
        <HomeTechStack />
        <HomeFeatures />
        <HomeCta />
    </div>
</template>
