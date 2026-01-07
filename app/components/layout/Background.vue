<script setup lang="ts">
    interface Firefly {
        id: number
        style: {
            left: string
            top: string
            animationDelay: string
            animationDuration: string
            '--move-x': string
            '--move-y': string
            width: string
            height: string
        }
    }

    const fireflies = ref<Firefly[]>([])

    onMounted(() => {
        fireflies.value = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            style: {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 20}s`,
                '--move-x': `${(Math.random() - 0.5) * 300}px`,
                '--move-y': `${(Math.random() - 0.5) * 300}px`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`
            }
        }))
    })
</script>

<template>
    <div class="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-slate-950" aria-hidden="true">
        <!-- Ambient Gradients -->
        <div class="absolute top-0 left-0 w-full h-full animate-pulse bg-glow-primary">
        </div>
        <div class="absolute bottom-0 right-0 w-full h-full animate-pulse delay-1000 bg-glow-secondary">
        </div>

        <!-- Fireflies -->
        <div v-for="fly in fireflies" :key="fly.id"
            class="absolute rounded-full bg-emerald-300 blur-sm shadow-lg shadow-emerald-500/30 animate-pulse opacity-20"
            :style="fly.style"></div>
    </div>
</template>
