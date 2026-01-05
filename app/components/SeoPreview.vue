<script setup lang="ts">
    const title = ref('My Awesome Nuxt App')
    const description = ref('Build modern web applications with Nuxt 4. Fast, intuitive, and powerful.')
    const image = ref('https://nuxt.com/assets/design-kit/icon-green.png')

    const ogImageStyle = computed(() => ({
        backgroundImage: `url(${image.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }))
</script>

<template>
    <div class="grid lg:grid-cols-2 gap-8">
        <!-- Editor -->
        <div class="space-y-6">
            <div class="space-y-2">
                <label class="text-xs font-bold text-slate-400 uppercase">Title</label>
                <input v-model="title" type="text"
                    class="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
            </div>

            <div class="space-y-2">
                <label class="text-xs font-bold text-slate-400 uppercase">Description</label>
                <textarea v-model="description" rows="3"
                    class="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"></textarea>
            </div>

            <div class="space-y-2">
                <label class="text-xs font-bold text-slate-400 uppercase">OG Image URL</label>
                <input v-model="image" type="text"
                    class="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-mono text-xs" />
            </div>

            <div class="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <div class="text-xs font-mono text-slate-500 mb-2">// Generated Code</div>
                <pre class="text-xs font-mono text-emerald-400 whitespace-pre-wrap">useSeoMeta({
  title: '{{ title }}',
  ogTitle: '{{ title }}',
  description: '{{ description }}',
  ogDescription: '{{ description }}',
  ogImage: '{{ image }}',
  twitterCard: 'summary_large_image'
})</pre>
            </div>
        </div>

        <!-- Preview -->
        <div class="space-y-6">
            <div class="text-xs font-bold text-slate-400 uppercase text-center">Social Card Preview</div>

            <!-- Facebook / OG Card -->
            <div class="rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shadow-2xl max-w-sm mx-auto">
                <div class="h-48 bg-slate-900 relative overflow-hidden">
                    <img :src="image" class="w-full h-full object-cover" alt="Preview"
                        onerror="this.style.display='none'" />
                    <div class="absolute inset-0 flex items-center justify-center text-slate-600 bg-slate-900 -z-10">
                        <Icon name="heroicons:photo" class="w-12 h-12" />
                    </div>
                </div>
                <div class="p-4 bg-slate-800">
                    <div class="text-xs text-slate-400 uppercase mb-1">EXAMPLE.COM</div>
                    <div class="font-bold text-white text-lg leading-tight mb-2 line-clamp-2">{{ title }}</div>
                    <div class="text-sm text-slate-400 line-clamp-2">{{ description }}</div>
                </div>
            </div>

            <!-- Twitter Card (Small) -->
            <div
                class="rounded-xl overflow-hidden bg-black border border-slate-800 shadow-xl max-w-sm mx-auto flex items-center p-3 gap-3">
                <div class="w-12 h-12 rounded bg-slate-900 shrink-0 overflow-hidden relative">
                    <img :src="image" class="w-full h-full object-cover" alt="Preview"
                        onerror="this.style.display='none'" />
                </div>
                <div class="min-w-0">
                    <div class="text-sm font-bold text-white truncate">{{ title }}</div>
                    <div class="text-xs text-slate-500 truncate">example.com</div>
                </div>
            </div>
        </div>
    </div>
</template>
