<script setup lang="ts">
    definePageMeta({
        middleware: [
            function (to) {
                if (to.path === '/docs/guide-getting-started') {
                    return navigateTo('/docs/guide-getting-started/installation')
                }
            }
        ]
    })
</script>
