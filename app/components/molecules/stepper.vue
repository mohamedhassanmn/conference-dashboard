<script setup lang="ts">
import StepperItem from '~/components/atoms/stepper-item.vue'

const props = defineProps({
    steps: {
        type: Array as () => Array<{ stepCount: number; stepName: string }>,
        required: true,
    },
    activeStep: {
        type: Number,
        required: true,
    },
})

const emit = defineEmits(['change-step'])
</script>

<template>
    <div class="flex w-fit max-w-[80%] mx-auto justify-between items-center bg-primary-100 rounded-2xl">
        <StepperItem v-for="(step, index) in steps" :key="step.stepCount" :stepCount="step.stepCount"
            :stepName="step.stepName" :activeState="step.stepCount === activeStep"
            :hideDivider="steps.length - 1 !== index" @step-click="emit('change-step', step.stepCount)" />
    </div>
</template>
