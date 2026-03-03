<script setup lang="ts">
import KeywordsTextField from '~/components/atoms/keywords-text-field.vue'
import { useSubmissionStore } from '~/stores/submissions.store'

const emit = defineEmits(['next'])
const store = useSubmissionStore()
const { saveKeywords } = useSubmission()

const keywords = ref<string[]>([...store.keywords])

watch(() => store.keywords, (val) => { keywords.value = [...val] }, { immediate: true })

const saveAndContinue = async () => {
    if (keywords.value.length === 0) return store.setError('At least one keyword is required')
    try {
        await saveKeywords(keywords.value)
        if (!store.error) emit('next')
    } catch (err: any) {
        store.setError(err.message)
    }
}
</script>

<template>
    <div class="w-full pr-8 h-fit overflow-y-auto scrollbar-thin">
        <h2 class="text-xl font-semibold">Keywords</h2>
        <div class="flex flex-col justify-center items-center w-full mt-5">
            <KeywordsTextField v-model="keywords" label="Type in the keywords"
                placeholder="Enter keywords and press enter" customClass="mt-4" />
            <button
                class="bg-neutral-400 text-primary-100 font-semibold px-11 py-3.5 rounded-14 mt-8 hover:underline disabled:opacity-50"
                :disabled="store.isLoading" @click="saveAndContinue">
                {{ store.isLoading ? 'Saving...' : 'Save and Continue' }}
            </button>
        </div>
    </div>
</template>