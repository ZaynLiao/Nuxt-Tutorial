<template>
    <section class="relative pt-20 pb-32 overflow-hidden">
        <!-- Background Grid -->
        <div class="absolute inset-0 -z-10 bg-slate-950 bg-linear-to-b from-slate-900/50 to-slate-950">
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
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 ring-1 ring-slate-800 backdrop-blur-sm text-xs font-medium text-emerald-400">
                    <span class="relative flex h-2 w-2">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Compatible with v4
                </div>

                <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                    Nuxt 4 <br />
                    <span
                        class="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">實戰學習文件</span>
                </h1>

                <p class="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    包含完整的部落格實作、權限管理與自動化部署流程，協助打造現代化的全端應用程式。
                </p>

                <!-- Prerequisites -->
                <div class="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-slate-500">
                    <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/50 ring-1 ring-white/10">
                        <Icon name="logos:vue" class="w-4 h-4" />
                        <span>Vue 3</span>
                    </div>
                    <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/50 ring-1 ring-white/10">
                        <Icon name="logos:typescript-icon" class="w-4 h-4" />
                        <span>TypeScript</span>
                    </div>
                    <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/50 ring-1 ring-white/10">
                        <Icon name="logos:tailwindcss-icon" class="w-4 h-4" />
                        <span>Tailwind v4</span>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                    <NuxtLink to="/docs"
                        class="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-200 bg-emerald-600 rounded-xl hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-slate-900">
                        <span>開始閱讀</span>
                        <Icon name="heroicons:arrow-right"
                            class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </NuxtLink>

                    <NuxtLink to="https://nuxt.com" target="_blank"
                        class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-slate-300 transition-all duration-200 bg-slate-800/50 rounded-xl border border-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-600 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-slate-900">
                        <Icon name="logos:nuxt-icon" class="w-5 h-5 mr-2 opacity-80" />
                        Nuxt 官方文件
                    </NuxtLink>
                </div>
            </div>

            <!-- Right: Visual -->
            <div class="relative hidden lg:block">
                <!-- Floating Elements -->
                <div
                    class="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none">
                </div>

                <div class="relative transition-transform duration-500 ease-out hover:scale-[1.02]">
                    <AppWindow title="learning-progress" type="code"
                        class="shadow-2xl shadow-emerald-900/20 ring-1 ring-white/10">
                        <template #default>
                            <div class="font-mono text-sm leading-relaxed space-y-2">
                                <div class="flex gap-2">
                                    <span class="text-green-400">➜</span>
                                    <span class="text-blue-400">~</span>
                                    <span class="text-slate-300">nuxi init nuxt-app</span>
                                </div>
                                <div class="text-slate-400 pl-4">Downloading template...</div>
                                <div class="text-slate-400 pl-4">Initializing git repository...</div>
                                <div class="flex gap-2 text-emerald-400 font-bold">
                                    <span>✔</span>
                                    <span>Nuxt project created successfully!</span>
                                </div>
                                <div class="h-4"></div>
                                <div class="flex gap-2">
                                    <span class="text-green-400">➜</span>
                                    <span class="text-blue-400">~</span>
                                    <span class="text-slate-300">cd nuxt-app && pnpm dev</span>
                                </div>
                                <div class="text-slate-400 pl-4">
                                    <span>Now listening on: </span>
                                    <span class="text-cyan-400 underline">http://localhost:3000</span>
                                </div>
                                <div class="h-4"></div>
                                <div
                                    class="flex gap-2 items-center bg-slate-800/50 -mx-4 px-4 py-2 border-t border-slate-700/50 border-b border-dashed">
                                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-emerald-500" />
                                    <span class="text-slate-300">Module 1: Getting Started</span>
                                    <span
                                        class="ml-auto text-xs text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">Completed</span>
                                </div>
                                <div class="flex gap-2 items-center px-0 py-2">
                                    <Icon name="heroicons:play-circle" class="w-5 h-5 text-blue-400 animate-pulse" />
                                    <span class="text-white font-bold">Module 2: Data Fetching</span>
                                    <span
                                        class="ml-auto text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">In
                                        Progress</span>
                                </div>
                                <div class="flex gap-2 items-center px-0 py-2 opacity-50">
                                    <Icon name="heroicons:lock-closed" class="w-5 h-5 text-slate-500" />
                                    <span class="text-slate-400">Module 3: Deployment</span>
                                </div>
                            </div>
                        </template>
                    </AppWindow>

                    <!-- Floating Badge -->
                    <div
                        class="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur border border-slate-800 p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                        <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Icon name="heroicons:rocket-launch" class="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <div class="text-xs text-slate-400 font-bold uppercase">Ready to launch</div>
                            <div class="text-sm font-bold text-white">Production Ready</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
