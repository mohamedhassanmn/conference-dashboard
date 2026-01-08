<script setup lang="ts">
import Stepper from '~/components/molecules/stepper.vue'

const activeStep = ref(1)

const steps = [
    { stepCount: 1, stepName: 'Author Info' },
    { stepCount: 2, stepName: 'Title and Abstract' },
    { stepCount: 3, stepName: 'Keywords' },
    { stepCount: 4, stepName: 'Files' },
    { stepCount: 5, stepName: 'Summary' },
]
</script>

<template>
    <Stepper :steps="steps" :activeStep="activeStep" @change-step="activeStep = $event" />
</template>
