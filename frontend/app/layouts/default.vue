<script setup>
import Sidebar from '~/components/atoms/sidebar.vue';
</script>

<template>
    <div class="flex h-screen">
        <div class="w-[15%] h-full bg-primary-200">
            <Sidebar />
        </div>
        <div class="w-full h-full py-8 px-8 overflow-auto">
            <div class="w-full h-full m-auto bg-white rounded-3xl p-8">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>

<style scoped></style>