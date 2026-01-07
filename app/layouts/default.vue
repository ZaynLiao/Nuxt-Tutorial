<template>
    <div class="flex min-h-screen flex-col">
        <LayoutTopBar />
        <main class="flex-1">
            <slot />
        </main>
        <LayoutFooter />
    </div>
</template>
