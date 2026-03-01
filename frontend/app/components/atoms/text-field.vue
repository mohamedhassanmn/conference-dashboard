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
    type: {
        type: String,
        default: 'text',
    },
    modelValue: {
        type: String,
        default: '',
    },
});

defineEmits(['update:modelValue']);
</script>

<template>
    <div :class="`w-full ${customClass}`">
        <label class="block font-medium text-neutral-500 mb-1" :class="labelClass">{{ label }}</label>
        <input :type="type" :value="modelValue" :placeholder="placeholder" :class="inputClass"
            class="border border-neutral-400 rounded-lg px-3 py-2 w-full placeholder:text-neutral-300"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    </div>
</template>