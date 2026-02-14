<script setup lang="ts">
import Tab from '~/components/molecules/tab.vue'
import NotificationsList from '~/components/organisms/notifications-list/index.vue';
const tabs = ["General", "Submission", "Bookings"]
const activeTab = ref(tabs[0] || '')
</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <Tab :tabs="tabs" :activeTab="activeTab" @change-tab="activeTab = $event" />
        <div class="mt-6 w-full">
            <template v-if="activeTab === tabs[0]">
                <NotificationsList />
            </template>
            <template v-else-if="activeTab === tabs[1]">
                <p class="text-center text-neutral-600">Submission Notifications Content</p>
            </template>
            <template v-else-if="activeTab === tabs[2]">
                <p class="text-center text-neutral-600">Bookings Notifications Content</p>
            </template>
        </div>
    </div>
</template>