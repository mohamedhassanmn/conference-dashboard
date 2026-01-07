<template>
    <div class="flex h-screen">
        <div class="w-[15%] h-full bg-primary-200">
            <Sidebar />
        </div>
        <div class="w-full h-full p-4">
            <NuxtPage />
        </div>
    </div>
</template>

<script setup>
import Sidebar from '~/components/atoms/sidebar.vue';

</script>

<style scoped></style>