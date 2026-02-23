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
    labelClass: {
        type: String,
        default: '',
    },
    inputClass: {
        type: String,
        default: '',
    },
});
</script>
<template>
    <div :class="`w-full ${customClass}`">
        <label class="block font-medium text-neutral-500 mb-1" :class="labelClass">{{ label }}</label>
        <input type="text" class="border border-neutral-400 rounded-lg px-3 py-2 w-full placeholder:text-neutral-300"
            :class="inputClass" :placeholder="placeholder" />
    </div>
</template>