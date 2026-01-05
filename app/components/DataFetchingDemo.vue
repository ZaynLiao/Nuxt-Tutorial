<script setup lang="ts">
    type User = {
        id: number
        name: string
        email: string
    }

    // [重點] 使用 useFetch 獲取資料，並啟用 lazy 模式
    const { data: users, status, error, refresh } = await useFetch<User[]>('https://jsonplaceholder.typicode.com/users', {
        lazy: true,
        transform: (users) => users.slice(0, 4), // [重點] 只取前 4 筆
        key: 'users-list-demo'
    })
</script>

<template>
    <NuxtCard
        class="w-full mx-auto bg-slate-900/60 backdrop-blur-md border-slate-700/50 ring-1 ring-white/5 shadow-2xl transition-all duration-300 hover:shadow-emerald-500/10 hover:border-emerald-500/20">
        <template #header>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <Icon name="heroicons:users" size="20" class="text-emerald-400" />
                    <h3 class="font-bold tracking-wide text-white">使用者列表</h3>
                </div>
                <NuxtButton icon="heroicons:arrow-path" color="neutral" variant="ghost" :loading="status === 'pending'"
                    @click="() => refresh()" aria-label="重新整理"
                    class="hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors cursor-pointer" />
            </div>
        </template>

        <div v-if="error"
            class="text-red-400 text-sm p-4 bg-red-950/30 rounded-lg border border-red-900/30 flex items-start gap-3">
            <Icon name="heroicons:exclamation-circle" class="shrink-0 mt-0.5" size="20" />
            <span>{{ error.message }}</span>
        </div>

        <div v-else class="space-y-3">
            <!-- 載入中骨架屏 -->
            <div v-if="status === 'pending'" class="space-y-3">
                <NuxtSkeleton class="h-16 w-full bg-slate-800/50 rounded-xl" v-for="i in 4" :key="i" />
            </div>

            <!-- 資料列表 -->
            <div v-else v-for="user in users" :key="user.id"
                class="group flex items-center justify-between p-3.5 rounded-xl border border-slate-800/50 bg-slate-900/40 hover:bg-slate-800/60 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 cursor-default">
                <div class="flex items-center gap-4">
                    <NuxtAvatar :alt="user.name" size="md"
                        class="bg-slate-800 text-emerald-400 ring-2 ring-slate-900 group-hover:ring-emerald-500/20 transition-all" />
                    <div>
                        <div class="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{{
                            user.name
                        }}</div>
                        <div class="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{{ user.email
                        }}</div>
                    </div>
                </div>
                <Icon name="heroicons:chevron-right"
                    class="text-slate-600 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                    size="16" />
            </div>
        </div>
    </NuxtCard>
</template>
