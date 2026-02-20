<script setup>
import Sidebar from '~/components/atoms/sidebar.vue';
</script>

<template>
    <div class="flex h-screen">
        <div class="w-[15%] h-full bg-primary-200">
            <Sidebar />
        </div>
        <div class="w-full h-full py-10 px-5">
            <NuxtPage />
        </div>
    </div>
</template>

<style scoped></style>