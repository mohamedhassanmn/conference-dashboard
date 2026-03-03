<script setup>
import Sidebar from '~/components/atoms/sidebar.vue';
</script>

<template>
    <div class="flex h-screen overflow-hidden">
        <div class="w-[18%] 4xl:w-[15%] min-w-[180px] h-full bg-primary-200 shrink-0">
            <Sidebar />
        </div>
        <div class="flex-1 px-5 overflow-y-auto scrollbar-thin min-w-0">
            <NuxtPage />
        </div>
    </div>
</template>

<style scoped></style>