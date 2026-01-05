<script setup lang="ts">
    definePageMeta({
        middleware: [
            function (to) {
                if (to.path === '/docs/guide-architecture') {
                    return navigateTo('/docs/guide-architecture/route-middleware')
                }
            }
        ]
    })
</script>
