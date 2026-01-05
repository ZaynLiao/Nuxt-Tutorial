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

        <!-- CTA Section -->
        <section class="py-24 border-t border-slate-800/50 relative overflow-hidden">
            <div class="absolute inset-0 bg-emerald-900/5"></div>
            <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">準備好開始了嗎？</h2>
                <p class="text-slate-400 text-lg mb-10">
                    無論你是 Vue 的初學者，還是想從 Nuxt 2/3 升級的老手，這裡都有適合你的內容。
                </p>
                <NuxtLink to="/docs/guide-getting-started/installation"
                    class="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-emerald-600 rounded-full hover:bg-emerald-500 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/40">
                    建立你的第一個專案
                    <Icon name="heroicons:rocket-launch" class="w-6 h-6 ml-2" />
                </NuxtLink>
            </div>
        </section>
    </div>
</template>
