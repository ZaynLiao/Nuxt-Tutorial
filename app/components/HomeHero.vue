<template>
    <section class="relative pt-20 pb-32 overflow-hidden">
        <!-- Background Grid -->
        <div class="absolute inset-0 -z-10 bg-slate-950 bg-gradient-to-b from-slate-900/50 to-slate-950">
        </div>

        <!-- Glow Effects -->
        <div
            class="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-3/4 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none">
        </div>
        <div
            class="absolute bottom-0 right-0 -z-10 w-3/4 h-96 bg-blue-500/10 blur-3xl rounded-full pointer-events-none">
        </div>

        <div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <!-- Left: Content -->
            <div class="space-y-8 text-center lg:text-left relative z-10">
                <div
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-sm text-xs font-medium text-emerald-400 animate-fade-in-up">
                    <span class="relative flex h-2 w-2">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Updated for Nuxt 4
                </div>

                <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                    Master <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Nuxt
                        4</span>
                    <br />
                    <span class="text-slate-500 text-4xl sm:text-5xl lg:text-6xl">The Visual Way</span>
                </h1>

                <p class="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    不再是枯燥的文字文件。透過豐富的圖解、互動式範例與最佳實踐，
                    帶你從零打造現代化的全端應用程式。
                </p>

                <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <NuxtLink to="/docs"
                        class="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-200 bg-emerald-600 rounded-lg hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-slate-900">
                        開始閱讀
                        <Icon name="heroicons:arrow-right"
                            class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </NuxtLink>

                    <NuxtLink to="https://github.com/nuxt/nuxt" target="_blank"
                        class="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-slate-300 transition-all duration-200 bg-slate-800/50  rounded-lg hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-slate-900">
                        <Icon name="simple-icons:github" class="w-5 h-5 mr-2 text-white" />
                        GitHub
                    </NuxtLink>
                </div>
            </div>

            <!-- Right: Visual -->
            <div class="relative hidden lg:block">
                <!-- Floating Elements -->
                <div
                    class="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl rotate-12 blur-xl opacity-20 animate-pulse">
                </div>

                <div class="relative transition-transform duration-500 ease-out hover:scale-105 hover:-translate-y-2">
                    <AppCodeBlock filename="app.vue"
                        class="shadow-2xl shadow-emerald-900/20 border-slate-700/50 bg-slate-900/90 backdrop-blur-xl"
                        code="<script setup lang=&quot;ts&quot;>
const { data } = await useFetch('/api/hello')

useSeoMeta({
  title: 'Nuxt 4 Tutorial',
  description: 'Master the framework.'
})
</script>

<template>
  <div class=&quot;layout&quot;>
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </div>
</template>" lang="vue" />

                    <!-- Floating Badge -->
                    <div
                        class="absolute -bottom-6 -left-6 bg-slate-800/90 backdrop-blur border border-slate-700 p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                        <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Icon name="heroicons:bolt" class="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <div class="text-xs text-slate-400 font-bold uppercase">Performance</div>
                            <div class="text-sm font-bold text-white">Zero-Config</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
