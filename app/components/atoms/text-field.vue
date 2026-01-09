<script setup lang="ts">
defineProps({
    label: {
        type: String,
        default: 'Label',
    },
    placeholder: {
        type: String,
        default: 'Enter text here',
    },
    customClass: {
        type: String,
        default: '',
    },
});
</script>
<template>
    <div :class="`w-full ${customClass}`">
        <label class="block font-medium text-neutral-500">{{ label }}</label>
        <input
            type="text"
            class="border border-gray-300 rounded px-3 py-2 w-full placeholder:text-neutral-300"
            :placeholder="placeholder"
        />
    </div>
</template>