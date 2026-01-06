<script setup lang="ts">
    // 定義 API 回傳的資料型別
    type User = {
        id: number
        name: string
        email: string
        username: string
        website: string
    }

    useHead({ title: '使用者列表範例' })

    // 使用 useFetch 獲取資料
    const { data: users, status, error, refresh } = await useFetch<User[]>('https://jsonplaceholder.typicode.com/users', {
        lazy: true,
        transform: (users) => users.slice(0, 6), // 取前 6 筆
        key: 'users-demo'
    })
</script>

<template>
    <div class="relative min-h-screen py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <!-- Background Decoration -->
        <div class="absolute top-0 left-1/2 -z-10 -translate-x-1/2 translate-y-0">
            <div class="h-96 w-96 rounded-full bg-emerald-500/10 blur-4xl"></div>
        </div>

        <div class="max-w-5xl mx-auto space-y-12">
            <!-- Header -->
            <div class="text-center space-y-4">
                <div
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium ring-1 ring-emerald-500/20">
                    <Icon name="heroicons:cloud-arrow-down" size="16" />
                    <span>Live Demo</span>
                </div>
                <h1
                    class="text-4xl sm:text-5xl font-bold tracking-tight bg-linear-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                    使用者列表
                </h1>
                <p class="text-slate-400 text-lg max-w-2xl mx-auto">
                    此頁面展示了 <code class="text-emerald-400 font-mono">useFetch</code> 的實際應用，包含 Lazy Loading、錯誤處理與資料轉換。
                </p>
            </div>

            <!-- Controls -->
            <div class="flex justify-center">
                <NuxtButton @click="refresh()" :loading="status === 'pending'" color="neutral" variant="outline"
                    size="md">
                    <template #leading>
                        <Icon name="heroicons:arrow-path" />
                    </template>
                    重新整理資料
                </NuxtButton>
            </div>

            <!-- Content Area -->
            <div class="min-h-100">
                <!-- Loading State -->
                <div v-if="status === 'pending'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="i in 6" :key="i"
                        class="h-40 rounded-2xl bg-slate-900/50 border border-slate-800 p-6 animate-pulse space-y-4">
                        <div class="flex items-center gap-4">
                            <div class="h-12 w-12 rounded-full bg-slate-800"></div>
                            <div class="space-y-2 flex-1">
                                <div class="h-4 w-24 bg-slate-800 rounded"></div>
                                <div class="h-3 w-32 bg-slate-800 rounded"></div>
                            </div>
                        </div>
                        <div class="space-y-2 pt-2">
                            <div class="h-3 w-full bg-slate-800 rounded"></div>
                            <div class="h-3 w-2/3 bg-slate-800 rounded"></div>
                        </div>
                    </div>
                </div>

                <!-- Error State -->
                <div v-else-if="error"
                    class="flex flex-col items-center justify-center py-12 text-center space-y-4 rounded-2xl border border-red-900/30 bg-red-950/10 p-8">
                    <div class="p-3 rounded-full bg-red-500/10 text-red-400">
                        <Icon name="heroicons:exclamation-triangle" size="32" />
                    </div>
                    <h3 class="text-lg font-bold text-red-200">無法載入資料</h3>
                    <p class="text-red-200/60 max-w-md">{{ error.message }}</p>
                    <NuxtButton @click="refresh()" color="error" variant="soft" size="sm">重試</NuxtButton>
                </div>

                <!-- Data State -->
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="user in users" :key="user.id"
                        class="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-slate-900/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/10">

                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-teal-600 text-white font-bold text-lg shadow-lg shadow-emerald-900/20">
                                    {{ user.name.charAt(0) }}
                                </div>
                                <div>
                                    <h3 class="font-bold text-slate-100 group-hover:text-white transition-colors">{{
                                        user.name }}
                                    </h3>
                                    <p class="text-xs text-slate-500 font-mono">@{{ user.username }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-3 text-sm text-slate-400">
                            <div class="flex items-center gap-2.5">
                                <Icon name="heroicons:envelope"
                                    class="text-slate-600 group-hover:text-emerald-500/70 transition-colors" />
                                <span class="truncate">{{ user.email }}</span>
                            </div>
                            <div class="flex items-center gap-2.5">
                                <Icon name="heroicons:globe-alt"
                                    class="text-slate-600 group-hover:text-emerald-500/70 transition-colors" />
                                <span class="truncate text-emerald-400/80">{{ user.website }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer Navigation -->
            <div class="flex justify-center pt-12 border-t border-slate-800/50">
                <NuxtLink to="/docs/2-core-concepts/data-fetching"
                    class="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-emerald-500/50 hover:bg-slate-800 transition-all">
                    <Icon name="heroicons:arrow-left" size="16"
                        class="group-hover:-translate-x-0.5 transition-transform" />
                    <span>返回教學文件</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
