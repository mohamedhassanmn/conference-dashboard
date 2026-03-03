<script setup>
const props = defineProps({
    stepCount: { type: Number, required: true },
    stepName: { type: String, required: true },
    activeState: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    hideDivider: { type: Boolean, default: true },
})

const emit = defineEmits(['step-click'])
</script>

<template>
    <div class="flex space-x-4 items-center cursor-pointer font-semibold text-sm 3xl:text-base p-4"
        @click="emit('step-click')">
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-primary-100"
            :class="completed ? 'bg-primary-700' : activeState ? 'bg-neutral-400' : 'bg-neutral-200'">
            <svg v-if="completed" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                    clip-rule="evenodd" />
            </svg>
            <span v-else>{{ stepCount }}</span>
        </div>
        <div class="font-bold whitespace-nowrap"
            :class="activeState || completed ? 'text-neutral-400' : 'text-neutral-200'">
            {{ stepName }}
        </div>
    </div>
    <hr v-if="hideDivider" class="w-10 3xl:w-16 border-neutral-200" />
</template>