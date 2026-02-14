<script setup>
const props = defineProps({
    stepCount: {
        type: Number,
        required: true,
    },
    stepName: {
        type: String,
        required: true,
    },
    activeState: {
        type: Boolean,
        default: false,
    },
    hideDivider: {
        type: Boolean,
        default: true,
    },
})

const emit = defineEmits(['step-click'])
</script>

<template>
    <div class="flex space-x-4 items-center cursor-pointer font-semibold p-4" @click="emit('step-click')">
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-primary-100"
            :class="activeState ? 'bg-neutral-400' : 'bg-neutral-200'">
            {{ stepCount }}
        </div>

        <div class="font-bold" :class="activeState ? 'text-neutral-400' : 'text-neutral-200'">
            {{ stepName }}
        </div>
    </div>

    <hr v-if="hideDivider" class="w-16 border-neutral-200" />
</template>