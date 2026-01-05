<script setup lang="ts">
    definePageMeta({
        middleware: [
            function (to) {
                if (to.path === '/docs/guide-features') {
                    return navigateTo('/docs/guide-features/seo')
                }
            }
        ]
    })
</script>
