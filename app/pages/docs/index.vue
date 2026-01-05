<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: sidebarGroups.map(group => ({
            id: group.id || '',
            label: group.title
        })).filter(item => item.id)
    })

    useHead({
        title: '文件導覽',
        meta: [
            { name: 'description', content: 'Nuxt 4 繁體中文教學導覽：從安裝、目錄結構到進階的伺服器路由與 SEO 設定，循序漸進掌握 Nuxt 開發技巧。' }
        ]
    })
</script>

<template>
    <TutorialPage title="Nuxt 文件導覽" description="這是一個參考 Nuxt 官方文件版面所製作的繁體中文教學站，重點是清楚的資訊層級與好讀的暗色介面。"
        :badges="[{ label: 'Nuxt 4', color: 'primary' }, { label: 'Tutorial', color: 'neutral' }]">

        <div v-for="group in sidebarGroups" :key="group.id" :id="group.id" class="mb-16 scroll-mt-24">
            <div class="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                <div class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Icon :name="group.icon || 'heroicons:folder'" class="w-6 h-6" />
                </div>
                <h2 class="text-2xl font-bold text-white">{{ group.title }}</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink v-for="item in group.items" :key="item.to" :to="item.to"
                    class="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-5 hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">

                    <div class="flex items-start justify-between mb-3">
                        <div
                            class="p-2 rounded-lg bg-slate-800 text-slate-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                            <Icon :name="item.icon" class="w-5 h-5" />
                        </div>
                        <Icon name="heroicons:arrow-right"
                            class="w-4 h-4 text-slate-600 group-hover:text-emerald-500 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                    </div>

                    <h3 class="text-lg font-bold text-slate-200 mb-2 group-hover:text-emerald-400 transition-colors">
                        {{ item.label }}
                    </h3>
                    <p class="text-sm text-slate-400 leading-relaxed">
                        {{ item.description }}
                    </p>
                </NuxtLink>
            </div>
        </div>
    </TutorialPage>
</template>
