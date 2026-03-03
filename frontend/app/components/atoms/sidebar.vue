<template>
    <div class="w-full h-full flex flex-col overflow-hidden">
        <div class="px-2 4xl:px-4 py-5 mt-20 shrink-0">
            <NuxtLink :to="ROUTES.HOME" class="flex justify-center items-center">
                <NuxtImg src="/images/icpp-logo.png" alt="ICPP Logo" class="w-4/5" />
            </NuxtLink>
        </div>

        <div class="flex flex-col justify-center flex-1 xl:mb-40">
            <NuxtLink v-for="item in navigation.main" :key="item.label" :to="item.to"
                class="p-2 pl-9 text-sm font-bold hover:bg-primary-400"
                active-class="bg-primary-600 hover:bg-primary-600">
                {{ item.label }}
            </NuxtLink>
            <button class="p-2 pl-9 text-sm font-medium text-warning-red hover:bg-red-100 text-left w-full"
                @click="logout">
                Sign Out
            </button>
        </div>
    </div>
</template>

<script setup>
import { ROUTES } from '~/utils/routes.ts';
const appConfig = useAppConfig();
const navigation = appConfig.navigation;
const { logout } = useAuth();
</script>