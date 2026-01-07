<script setup lang="ts">
    const currentYear = new Date().getFullYear()
</script>

<template>
    <footer class="border-t border-slate-800/60 bg-slate-950 py-12">
        <div class="mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2 text-slate-200 font-bold">
                    <Icon name="logos:nuxt-icon" class="w-5 h-5" />
                    <span>Nuxt Tutorial</span>
                </div>
                <p class="text-sm text-slate-500">
                    Built with Nuxt 4, Nuxt UI v4 & Tailwind CSS v4.
                </p>
            </div>

            <div class="flex items-center gap-6 text-sm text-slate-400">
                <NuxtLink to="/docs" class="hover:text-emerald-400 transition-colors">文件導覽</NuxtLink>
                <NuxtLink to="https://nuxt.com" target="_blank" class="hover:text-emerald-400 transition-colors">Nuxt
                    Official</NuxtLink>
                <NuxtLink to="https://github.com" target="_blank" class="hover:text-emerald-400 transition-colors">
                    GitHub</NuxtLink>
            </div>

            <div class="text-xs text-slate-600">
                &copy; {{ currentYear }} Nuxt Tutorial. All rights reserved.
            </div>
        </div>
    </footer>
</template>
