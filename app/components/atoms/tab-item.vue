<script setup lang="ts">
const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <div class="px-2 cursor-pointer">
        <div :class="{ 'bg-neutral-400 text-primary-100 px-2 py-1.5 rounded-3xl text-center': isActive, 'px-2': !isActive }">
            {{ label }}
        </div>
    </div>
</template>