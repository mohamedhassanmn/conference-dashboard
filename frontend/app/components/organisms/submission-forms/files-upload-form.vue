<script setup lang="ts">
import FileUpload from '~/components/atoms/file-upload.vue'
import { useSubmissionStore } from '~/stores/submissions.store'

const emit = defineEmits(['next'])
const store = useSubmissionStore()
const { saveSupplementary } = useSubmission()

const supplementaryFile = ref<File | null>(null)

const saveAndContinue = async () => {
    try {
        if (supplementaryFile.value) {
            await saveSupplementary(supplementaryFile.value)
        }
        if (!store.error) emit('next')
    } catch { }
}
</script>

<template>
    <div class="w-full pr-8 h-fit overflow-y-auto scrollbar-thin">
        <h2 class="text-xl font-semibold">Files</h2>
        <div class="flex flex-col justify-center items-center w-full mt-5">
            <FileUpload label="Upload Supplementary File (optional)" customClass="mt-4"
                :existing-file-name="store.supplementary_file_key ? 'Supplementary file uploaded' : ''"
                @file-selected="supplementaryFile = $event" />
            <button
                class="bg-neutral-400 text-primary-100 font-semibold px-11 py-3.5 rounded-14 mt-8 hover:underline disabled:opacity-50"
                :disabled="store.isLoading" @click="saveAndContinue">
                {{ store.isLoading ? 'Saving...' : 'Save and Continue' }}
            </button>
        </div>
    </div>
</template>