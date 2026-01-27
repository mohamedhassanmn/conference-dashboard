<script setup lang="ts">
import Stepper from '~/components/molecules/stepper.vue'
import AuthorInfoForm from '~/components/organisms/submission-forms/author-info-form.vue'
import TitleAndAbstractForm from '~/components/organisms/submission-forms/title-and-abstract-form.vue'
import KeywordsForm from '~/components/organisms/submission-forms/keywords-form.vue'
import FilesUploadForm from '~/components/organisms/submission-forms/files-upload-form.vue'
import SummaryForm from '~/components/organisms/submission-forms/summary-form.vue'
const activeStep = ref(1);
const steps = [
    { stepCount: 1, stepName: 'Author Info' },
    { stepCount: 2, stepName: 'Title and Abstract' },
    { stepCount: 3, stepName: 'Keywords' },
    { stepCount: 4, stepName: 'Files' },
    { stepCount: 5, stepName: 'Summary' },
];
</script>

<template>
    <Stepper :steps="steps" :activeStep="activeStep" @change-step="activeStep = $event" />
    <div class="min-w-160 w-1/3 mx-auto">
        <template v-if="activeStep == 1">
            <AuthorInfoForm />
        </template>
        <template v-else-if="activeStep == 2">
            <TitleAndAbstractForm />
        </template>
        <template v-else-if="activeStep == 3">
            <KeywordsForm />
        </template>
        <template v-else-if="activeStep == 4">
            <FilesUploadForm />
        </template>
        <template v-else-if="activeStep == 5">
            <SummaryForm />
        </template>
    </div>
</template>
