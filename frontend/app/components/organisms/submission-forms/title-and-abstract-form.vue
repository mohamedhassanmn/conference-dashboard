<script setup lang="ts">
import TextField from '~/components/atoms/text-field.vue'
import FileUpload from '~/components/atoms/file-upload.vue'
import { useSubmissionStore } from '~/stores/submissions.store'

const emit = defineEmits(['next'])
const store = useSubmissionStore()
const { saveTitleAndAbstract, getErrorMessage } = useSubmission()

const title = ref(store.title)
const abstractFile = ref<File | null>(null)

watch(() => store.title, (val) => { title.value = val }, { immediate: true })

const saveAndContinue = async () => {
    try {
        await saveTitleAndAbstract(title.value, abstractFile.value ?? undefined)
        if (!store.error) emit('next')
    } catch (err: any) {
        store.setError(getErrorMessage(err))
    }
}
</script>

<template>
    <div class="w-full pr-8 h-fit overflow-y-auto scrollbar-thin">
        <h2 class="text-xl font-semibold">Title and Abstract</h2>
        <div class="flex flex-col justify-center items-center w-full mt-5">
            <TextField v-model="title" label="Title" placeholder="Enter your paper title" customClass="mt-4" />
            <FileUpload label="Upload Abstract File" customClass="mt-4"
                :existing-file-name="store.abstract_file_key ? 'Abstract uploaded' : ''"
                @file-selected="abstractFile = $event" />
            <button
                class="bg-neutral-400 text-primary-100 font-semibold px-11 py-3.5 rounded-14 mt-8 hover:underline disabled:opacity-50"
                :disabled="store.isLoading" @click="saveAndContinue">
                {{ store.isLoading ? 'Saving...' : 'Save and Continue' }}
            </button>
        </div>
    </div>
</template>