<template>
    <section class="py-10 border-y border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4">
            <p class="text-center text-sm font-medium text-slate-500 mb-8 uppercase tracking-widest">
                Powered by Modern Stack
            </p>
            <div
                class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
                <!-- Nuxt -->
                <div class="flex flex-col items-center gap-2 group">
                    <Icon name="logos:nuxt-icon" class="w-10 h-10 group-hover:scale-110 transition-transform" />
                    <span class="text-xs text-slate-500 font-medium group-hover:text-emerald-400 transition-colors">Nuxt
                        4</span>
                </div>

                <!-- Vue -->
                <div class="flex flex-col items-center gap-2 group">
                    <Icon name="logos:vue" class="w-10 h-10 group-hover:scale-110 transition-transform" />
                    <span class="text-xs text-slate-500 font-medium group-hover:text-emerald-400 transition-colors">Vue
                        3</span>
                </div>

                <!-- TypeScript -->
                <div class="flex flex-col items-center gap-2 group">
                    <Icon name="logos:typescript-icon" class="w-10 h-10 group-hover:scale-110 transition-transform" />
                    <span
                        class="text-xs text-slate-500 font-medium group-hover:text-blue-400 transition-colors">TypeScript</span>
                </div>

                <!-- Tailwind -->
                <div class="flex flex-col items-center gap-2 group">
                    <Icon name="logos:tailwindcss-icon" class="w-10 h-10 group-hover:scale-110 transition-transform" />
                    <span class="text-xs text-slate-500 font-medium group-hover:text-sky-400 transition-colors">Tailwind
                        v4</span>
                </div>

                <!-- Vite -->
                <div class="flex flex-col items-center gap-2 group">
                    <Icon name="logos:vitejs" class="w-10 h-10 group-hover:scale-110 transition-transform" />
                    <span
                        class="text-xs text-slate-500 font-medium group-hover:text-purple-400 transition-colors">Vite</span>
                </div>
            </div>
        </div>
    </section>
</template>
