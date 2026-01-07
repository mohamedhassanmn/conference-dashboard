<template>
    <div class="w-full">
        <div class="mx-auto my-6 w-48">
            <NuxtImg src="/images/icpp_logo.png" alt="ICPP Logo" class="w-full" />
        </div>
        <div v-for="item in navigation.main" class="flex flex-col p-2 pl-7" :key="item.label">
            <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
        </div>
    </div>
</template>
<script setup>
const appConfig = useAppConfig();
const navigation = appConfig.navigation;
</script>
<style scoped></style>