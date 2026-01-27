<script setup lang="ts">
    import TabItem from '~/components/atoms/tab-item.vue'
    const props = defineProps({
        tabs: {
            type: Array as () => string[],
            required: true
        },
        activeTab: {
            type: String,
            required: true
        }
    });
    const emit = defineEmits(['change-tab']);
</script>

<template>
    <div class="flex items-center py-2 px-0.5 bg-primary-100 rounded-3xl w-fit">
        <TabItem v-for="tab in tabs" :key="tab" :label="tab" :isActive="tab === activeTab" @click="emit('change-tab', tab)" />
    </div>
</template>