<script setup lang="ts">
import IcClose from '~/assets/icons/ic-close.png';

const props = defineProps({
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

const textInput = ref<HTMLInputElement | null>(null);
const input = ref('');
const keywords = ref<Set<string>>(new Set());

const keywordList = computed(() => [...keywords.value]);

const addKeyword = () => {
    const value = input.value.trim()
    if (!value) return

    keywords.value.add(value)
    input.value = ''
};

const removeKeyword = (word: string) => {
    keywords.value.delete(word)
};
</script>

<template>
    <div :class="`w-full ${customClass}`">
        <label class="block font-medium text-neutral-500">{{ label }}</label>

        <div class="border border-neutral-400 h-125 rounded px-3 py-2 w-full" @click="textInput?.focus()">
            <div class="w-full flex flex-wrap gap-2 items-start justify-start">
                <span v-for="word in keywordList" :key="word"
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
