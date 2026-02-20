<script setup lang="ts">
import IcFileUpload from '~/assets/icons/ic-file-upload.png';
import IcFilePdf from '~/assets/icons/ic-file-pdf.png';
import IcClose from '~/assets/icons/ic-close.png';

defineProps({
    label: {
        type: String,
        default: 'Label',
    },
    customClass: {
        type: String,
        default: '',
    },

});
const fileInput = ref<HTMLInputElement | null>(null)
const fileName = ref('')

const triggerFileInput = () => {
    fileInput.value?.click()
}

const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement | null
    const file = target?.files?.[0]
    if (!file) return
    fileName.value = file.name
}
</script>

<template>
    <div :class="`w-full ${customClass}`">
        <label class="block font-medium text-neutral-500">{{ label }}</label>
        <div class="mt-1">
            <input ref="fileInput" type="file" class="hidden" @change="onFileChange" accept=".pdf,.doc,.docx" />

            <button type="button" class="w-full px-4 py-11 rounded-xl border border-dashed border-neutral-400"
                @click="triggerFileInput">
                <img :src="IcFileUpload" alt="File Upload" class="inline-block mr-2 cursor-pointer w-16 h-fit" />
                <div class="text-center font-semibold mt-8">
                    <p class="text-lg text-neutral-600">Upload your abstract here</p>
                    <p class="text-sm text-neutral-400 mt-3.5 mb-1.5">Maximum file size: 50MB</p>
                    <p class="text-sm text-neutral-400">Supported format: .pdf</p>
                </div>
            </button>

            <div v-if="fileName"
                class="w-full rounded-2xl border border-neutral-200 p-5 mt-1 flex justify-between items-center">
                <div class="flex flex-start items-center">
                    <img :src="IcFilePdf" alt="File PDF" class="inline-block mr-2 cursor-pointer w-9 h-fit" />
                    <div>
                        <p class="text-sm font-semibold">
                            {{ fileName }}
                        </p>
                        <div class="flex flex-start items-center text-2xs">
                            <p>PDF</p>
                            <p class="mx-1">&middot;</p>
                            <p>25 MB</p>
                        </div>
                    </div>
                </div>
                <img :src="IcClose" alt="File PDF" class="inline-block mr-2 cursor-pointer w-5 h-fit" />
            </div>
        </div>
    </div>
</template>