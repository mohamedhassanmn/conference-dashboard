<script setup lang="ts">
import IcClose from '~/assets/icons/ic-close.png';

const props = defineProps({
    modelValue: {
        type: Array as () => string[],
        default: () => [],
    },
    label: {
        type: String,
        default: 'Label'
    },
    placeholder: {
        type: String,
        default: 'Enter text here'
    },
    customClass: {
        type: String,
        default: ''
    },
})

const emit = defineEmits(['update:modelValue'])

const textInput = ref<HTMLInputElement | null>(null);
const input = ref('');

const addKeyword = () => {
    const value = input.value.trim()
    if (!value) return
    if (props.modelValue.includes(value)) return  // no duplicates
    emit('update:modelValue', [...props.modelValue, value])
    input.value = ''
};

const removeKeyword = (word: string) => {
    emit('update:modelValue', props.modelValue.filter(k => k !== word))
};
</script>

<template>
    <div :class="`w-full ${customClass}`">
        <label class="block font-medium text-neutral-500">{{ label }}</label>
        <div class="border border-neutral-400 h-125 rounded px-3 py-2 w-full" @click="textInput?.focus()">
            <div class="w-full flex flex-wrap gap-2 items-start justify-start">
                <span v-for="word in modelValue" :key="word"
                    class="flex items-center gap-1 bg-primary-400 text-neutral-700 py-1.5 px-2 rounded-3xl h-8">
                    <span>{{ word }}</span>
                    <button type="button" class="w-4.5 h-4.5 flex justify-center items-center"
                        @click="removeKeyword(word)">
                        <img :src="IcClose" alt="Close icon" class="inline-block cursor-pointer w-full h-full" />
                    </button>
                </span>
                <input ref="textInput" v-model="input" @keydown.enter.prevent="addKeyword"
                    placeholder="Type and press Enter" class="outline-none" />
            </div>
        </div>
    </div>
</template>