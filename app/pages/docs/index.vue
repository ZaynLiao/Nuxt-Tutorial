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
    <DocsPage title="Nuxt 文件導覽" description="這是一個參考 Nuxt 官方文件版面所製作的繁體中文教學站，重點是清楚的資訊層級與好讀的暗色介面。"
        :badges="[{ label: 'Nuxt 4', color: 'primary' }, { label: 'Tutorial', color: 'neutral' }]">

        <div v-for="group in sidebarGroups" :key="group.id" :id="group.id" class="mb-16 scroll-mt-24">
            <div class="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                <h2 class="text-2xl font-bold flex items-center gap-3 group">
                    <Icon :name="group.icon || 'heroicons:folder'" class="w-6 h-6 text-emerald-400" />
                    {{ group.title }}
                </h2>

            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink v-for="item in group.items" :key="item.to" :to="item.to"
                    class="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-5 hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col h-full">
                    <Icon name="heroicons:arrow-right"
                        class="w-4 h-4 text-slate-600 group-hover:text-emerald-500 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all mb-2 self-end" />
                    <div class="flex items-center mb-3 gap-2">
                        <div
                            class="rounded-lg group-hover:text-emerald-400 transition-colors flex items-center justify-center">
                            <Icon :name="item.icon" class="w-5 h-5" />
                        </div>
                        <h3 class="text-lg font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                            {{ item.label }}
                        </h3>
                    </div>
                    <p class="text-sm text-slate-400 leading-relaxed">
                        {{ item.description }}
                    </p>
                </NuxtLink>
            </div>
        </div>
    </DocsPage>
</template>
