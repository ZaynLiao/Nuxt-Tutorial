<script setup lang="ts">
    definePageMeta({
        middleware: [
            function (to) {
                if (to.path === '/docs/guide-ui') {
                    return navigateTo('/docs/guide-ui/styling')
                }
            }
        ]
    })
</script>
