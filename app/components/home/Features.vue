<template>
    <section class="py-24 relative overflow-hidden">
        <!-- Background Decor -->
        <div
            class="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none">
        </div>

        <div class="max-w-7xl mx-auto px-4 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <div
                    class="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-900/50 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
                    <Icon name="heroicons:beaker" class="w-4 h-4 mr-2" />
                    Real World Projects
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-white">實戰專案與解決方案</h2>
                <p class="text-slate-400 text-lg">
                    跳脫 Hello World，這些是我們將在教學中一同完成的功能模組。
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Project 1: Blog -->
                <NuxtLink to="/docs/3-architecture/seo"
                    class="group p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-300 relative overflow-hidden">

                    <div
                        class="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    </div>

                    <div class="relative z-10">
                        <div
                            class="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ring-1 ring-emerald-500/20">
                            <Icon name="heroicons:document-text" class="w-7 h-7 text-emerald-400" />
                        </div>

                        <h3 class="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            部落格系統實作
                            <Icon name="heroicons:arrow-right"
                                class="w-4 h-4 text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h3>
                        <p class="text-slate-400 leading-relaxed mb-6">
                            從資料獲取 (useFetch) 到 SEO Meta 設定，完整打造一個支援 SSR 的 Markdown 部落格。
                        </p>

                        <ul class="space-y-2 text-sm text-slate-500">
                            <li class="flex items-center gap-2">
                                <Icon name="heroicons:check" class="w-4 h-4 text-emerald-500" />
                                <span>Nuxt Content / API</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <Icon name="heroicons:check" class="w-4 h-4 text-emerald-500" />
                                <span>Dynamic Meta Tags</span>
                            </li>
                        </ul>
                    </div>
                </NuxtLink>

                <!-- Project 2: Listing -->
                <NuxtLink to="/docs/2-core-concepts/data-fetching"
                    class="group p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/30 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 relative overflow-hidden">

                    <div
                        class="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    </div>

                    <div class="relative z-10">
                        <div
                            class="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ring-1 ring-blue-500/20">
                            <Icon name="heroicons:funnel" class="w-7 h-7 text-blue-400" />
                        </div>

                        <h3 class="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            列表篩選與分頁
                            <Icon name="heroicons:arrow-right"
                                class="w-4 h-4 text-blue-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h3>
                        <p class="text-slate-400 leading-relaxed mb-6">
                            處理複雜的 URL Query 狀態同步，實作保留歷史紀錄的高效能列表頁面。
                        </p>

                        <ul class="space-y-2 text-sm text-slate-500">
                            <li class="flex items-center gap-2">
                                <Icon name="heroicons:check" class="w-4 h-4 text-blue-500" />
                                <span>Watchers & Caching</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <Icon name="heroicons:check" class="w-4 h-4 text-blue-500" />
                                <span>Pagination Logic</span>
                            </li>
                        </ul>
                    </div>
                </NuxtLink>

                <!-- Project 3: Deployment -->
                <NuxtLink to="/docs/4-devops/deployment"
                    class="group p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/30 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 relative overflow-hidden">

                    <div
                        class="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    </div>

                    <div class="relative z-10">
                        <div
                            class="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ring-1 ring-purple-500/20">
                            <Icon name="heroicons:cloud-arrow-up" class="w-7 h-7 text-purple-400" />
                        </div>

                        <h3 class="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            自動化部署 CI/CD
                            <Icon name="heroicons:arrow-right"
                                class="w-4 h-4 text-purple-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h3>
                        <p class="text-slate-400 leading-relaxed mb-6">
                            不只寫程式，教你如何將 Nuxt 4 專案自動部署到 Vercel 或 Netlify 平台。
                        </p>

                        <ul class="space-y-2 text-sm text-slate-500">
                            <li class="flex items-center gap-2">
                                <Icon name="heroicons:check" class="w-4 h-4 text-purple-500" />
                                <span>GitHub Actions</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <Icon name="heroicons:check" class="w-4 h-4 text-purple-500" />
                                <span>Environment Config</span>
                            </li>
                        </ul>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
