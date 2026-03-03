<script setup>
import Sidebar from '~/components/atoms/sidebar.vue';
</script>

<template>
    <div class="flex h-screen overflow-hidden">
        <div class="w-[18%] 4xl:w-[15%] min-w-[180px] h-full bg-primary-200 shrink-0">
            <Sidebar />
        </div>
        <div class="w-full h-full py-8 px-8 overflow-auto">
            <div class="w-full h-full flex flex-col m-auto bg-white rounded-3xl p-8">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped></style>