<template>
    <div class="relative w-full h-full">
        <div class="absolute w-48 top-24 left-1/2 -translate-x-1/2">
            <NuxtLink :to="ROUTES.HOME">
                <NuxtImg src="/images/icpp_logo.png" alt="ICPP Logo" class="w-full" />
            </NuxtLink>
        </div>
        <div class="flex flex-col justify-center h-full">
            <NuxtLink v-for="item in navigation.main" :key="item.label" :to="item.to"
                class="p-2 pl-9 text-sm font-bold hover:bg-primary-400" active-class="bg-primary-600 hover:bg-primary-600">
                {{ item.label }}
            </NuxtLink>
        </div>
    </div>
</template>
<script setup>
import { ROUTES } from '~/utils/routes.ts';
const appConfig = useAppConfig();
const navigation = appConfig.navigation;
</script>
<style scoped></style>