<script setup lang="ts">
    definePageMeta({
        middleware: [
            function (to) {
                if (to.path === '/docs/guide-core-concepts') {
                    return navigateTo('/docs/guide-core-concepts/data-fetching')
                }
            }
        ]
    })
</script>
