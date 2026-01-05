<template>
    <div class="flex min-h-screen flex-col">
        <AppTopBar />
        <main class="flex-1">
            <slot />
        </main>
        <AppFooter />
    </div>
</template>
