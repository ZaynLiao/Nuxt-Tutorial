<template>
    <section class="py-24 relative">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h2 class="text-3xl font-bold text-white">為什麼選擇這份教學？</h2>
                <p class="text-slate-400">
                    我們不只是翻譯官方文件，而是將多年的開發經驗濃縮成易懂的圖解與範例。
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div
                    class="group p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 hover:bg-slate-900 transition-all duration-300 relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Icon name="heroicons:eye" class="w-24 h-24 text-emerald-500" />
                    </div>

                    <div
                        class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon name="heroicons:presentation-chart-line" class="w-6 h-6 text-emerald-400" />
                    </div>

                    <h3 class="text-xl font-bold text-white mb-3">視覺化學習</h3>
                    <p class="text-slate-400 leading-relaxed">
                        複雜的概念（如 Hydration、SSR 流程）皆透過精美的圖解呈現，讓你一眼就懂，不再憑空想像。
                    </p>
                </div>

                <!-- Feature 2 -->
                <div
                    class="group p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 hover:bg-slate-900 transition-all duration-300 relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Icon name="heroicons:code-bracket-square" class="w-24 h-24 text-blue-500" />
                    </div>

                    <div
                        class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon name="heroicons:cursor-arrow-rays" class="w-6 h-6 text-blue-400" />
                    </div>

                    <h3 class="text-xl font-bold text-white mb-3">實戰導向</h3>
                    <p class="text-slate-400 leading-relaxed">
                        提供可直接複製的程式碼片段與真實場景範例，從目錄結構到部署設定，手把手帶你完成。
                    </p>
                </div>

                <!-- Feature 3 -->
                <div
                    class="group p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/30 hover:bg-slate-900 transition-all duration-300 relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Icon name="heroicons:shield-check" class="w-24 h-24 text-purple-500" />
                    </div>

                    <div
                        class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon name="heroicons:academic-cap" class="w-6 h-6 text-purple-400" />
                    </div>

                    <h3 class="text-xl font-bold text-white mb-3">最佳實踐</h3>
                    <p class="text-slate-400 leading-relaxed">
                        嚴格遵循 Nuxt 4 與 Vue 3 的 Style Guide。不只教你寫出來，更教你寫出好維護、高效能的程式碼。
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
