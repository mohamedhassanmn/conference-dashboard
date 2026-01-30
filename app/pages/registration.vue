<script setup lang="ts">
import Stepper from '~/components/molecules/stepper.vue'
const activeStep = ref(1);
const steps = [
    { stepCount: 1, stepName: 'Person Info' },
    { stepCount: 2, stepName: 'Registeration Info' },
    { stepCount: 3, stepName: 'Payment' },
];
</script>

<template>
    <Stepper :steps="steps" :activeStep="activeStep" @change-step="activeStep = $event" />
    <div class="min-w-160 w-1/3 mx-auto">
        <template v-if="activeStep == 1">
            <div class="text-center mt-6">Person Info</div>
        </template>
        <template v-else-if="activeStep == 2">
            <div class="text-center mt-6">Registration Info</div>
        </template>
        <template v-else-if="activeStep == 3">
            <div class="text-center mt-6">Payment</div>
        </template>
    </div>
</template>
