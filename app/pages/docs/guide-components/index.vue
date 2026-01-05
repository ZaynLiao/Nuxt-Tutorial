<script setup lang="ts">
    definePageMeta({
        middleware: [
            function (to) {
                if (to.path === '/docs/guide-components') {
                    return navigateTo('/docs/guide-components/nuxt-link')
                }
            }
        ]
    })
</script>
