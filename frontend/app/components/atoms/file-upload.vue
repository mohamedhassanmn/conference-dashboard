<script setup lang="ts">
import IcFileUpload from '~/assets/icons/ic-file-upload.png'
import IcFilePdf from '~/assets/icons/ic-file-pdf.png'
import IcClose from '~/assets/icons/ic-close.png'
import { useSubmissionStore } from '~/stores/submissions.store'

defineProps({
    label: { type: String, default: 'Label' },
    customClass: { type: String, default: '' },
    existingFileName: { type: String, default: '' },
})

const store = useSubmissionStore()
const emit = defineEmits(['file-selected'])
const fileInput = ref<HTMLInputElement | null>(null)
const fileName = ref('')

const triggerFileInput = () => fileInput.value?.click()

const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement | null
    const file = target?.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
        store.setError('Only PDF files are accepted')
        fileName.value = ''
        if (fileInput.value) fileInput.value.value = ''
        emit('file-selected', null)
        return
    }

    store.setError(null)
    fileName.value = file.name
    emit('file-selected', file)
}

const clearFile = () => {
    fileName.value = ''
    if (fileInput.value) fileInput.value.value = ''
    emit('file-selected', null)
}
</script>

<template>
    <div :class="`w-full ${customClass}`">
        <label class="block font-medium text-neutral-500">{{ label }}</label>
        <div class="mt-1">
            <input ref="fileInput" type="file" class="hidden" @change="onFileChange" accept=".pdf" />
            <button type="button" class="w-full px-4 py-11 rounded-xl border border-dashed border-neutral-400"
                @click="triggerFileInput">
                <img :src="IcFileUpload" alt="File Upload" class="inline-block mr-2 cursor-pointer w-16 h-fit" />
                <div class="text-center font-semibold mt-8">
                    <p class="text-lg text-neutral-600">Upload your file here</p>
                    <p class="text-sm text-neutral-400 mt-3.5 mb-1.5">Maximum file size: 50MB</p>
                    <p class="text-sm text-neutral-400">Supported format: .pdf</p>
                </div>
            </button>

            <!-- Newly selected file -->
            <div v-if="fileName"
                class="w-full rounded-2xl border border-neutral-200 p-5 mt-1 flex justify-between items-center">
                <div class="flex flex-start items-center">
                    <img :src="IcFilePdf" alt="PDF" class="inline-block mr-2 cursor-pointer w-9 h-fit" />
                    <p class="text-sm font-semibold">{{ fileName }}</p>
                </div>
                <img :src="IcClose" alt="Remove" class="inline-block mr-2 cursor-pointer w-5 h-fit"
                    @click="clearFile" />
            </div>

            <!-- Already uploaded file from server -->
            <div v-else-if="existingFileName"
                class="w-full rounded-2xl border border-green-200 bg-green-50 p-5 mt-1 flex justify-between items-center">
                <div class="flex flex-start items-center">
                    <img :src="IcFilePdf" alt="PDF" class="inline-block mr-2 cursor-pointer w-9 h-fit" />
                    <p class="text-sm font-semibold text-green-700">{{ existingFileName }}</p>
                </div>
            </div>
        </div>
    </div>
</template>