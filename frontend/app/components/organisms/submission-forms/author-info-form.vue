<script setup lang="ts">
import TextField from '~/components/atoms/text-field.vue'
import IcArrow from '~/assets/icons/ic-arrow.png'
import { useSubmissionStore } from '~/stores/submissions.store'

const emit = defineEmits(['next'])
const store = useSubmissionStore()
const { saveAuthors } = useSubmission()

const currentAuthorIndex = ref(0)
const currentAuthor = computed(() => store.authors[currentAuthorIndex.value])

const authorWebpage = computed({
    get: () => store.authors[currentAuthorIndex.value]?.webpage ?? '',
    set: (value: string) => {
        if (store.authors[currentAuthorIndex.value]) {
            store.authors[currentAuthorIndex.value]!.webpage = value
        }
    }
})

const prev = () => { if (currentAuthorIndex.value > 0) currentAuthorIndex.value-- }
const next = () => { if (currentAuthorIndex.value < store.authors.length - 1) currentAuthorIndex.value++ }

const addAuthor = () => {
    store.addAuthor()
    currentAuthorIndex.value = store.authors.length - 1
}

const deleteAuthor = () => {
    if (store.authors.length === 1) return
    store.removeAuthor(currentAuthorIndex.value)
    if (currentAuthorIndex.value >= store.authors.length) {
        currentAuthorIndex.value = store.authors.length - 1
    }
}

const saveAndContinue = async () => {
    try {
        await saveAuthors()
        if (!store.error) emit('next')
    } catch { }
}
</script>

<template>
    <div class="w-full pr-8 h-fit overflow-y-auto scrollbar-thin">
        <div v-if="currentAuthor" class="flex justify-between items-center">
            <h2 class="text-xl font-semibold">Author {{ currentAuthorIndex + 1 }}</h2>
            <button v-if="store.authors.length > 1" class="text-red-400 text-sm font-medium hover:underline"
                @click="deleteAuthor">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                </svg>
            </button>
        </div>

        <div v-if="currentAuthor" class="flex flex-col justify-center items-center w-full mt-5">
            <TextField v-model="currentAuthor.first_name" label="First name" placeholder="Eg: Jamie"
                customClass="mt-4" />
            <TextField v-model="currentAuthor.last_name" label="Last name" placeholder="Eg: Lannister"
                customClass="mt-4" />
            <TextField v-model="currentAuthor.email" label="Email" placeholder="jamie.lannister@gmail.com"
                customClass="mt-4" />
            <TextField v-model="currentAuthor.country" label="Country/region" placeholder="Eg: India"
                customClass="mt-4" />
            <TextField v-model="currentAuthor.organization" label="Organization" placeholder="Eg: IIT Delhi"
                customClass="mt-4" />
            <TextField v-model="authorWebpage" label="Web page" placeholder="Eg: https://www.example.com/"
                customClass="mt-4" />

            <div class="w-full mt-8 flex justify-between items-center">
                <img :src="IcArrow" alt="Prev" class="cursor-pointer w-6 h-fit"
                    :class="currentAuthorIndex === 0 ? 'opacity-30 pointer-events-none' : ''" @click="prev" />
                <div>
                    <span class="text-lg font-semibold text-neutral-400">{{ currentAuthorIndex + 1 }}</span>
                    <span class="text-neutral-200">/{{ store.authors.length }}</span>
                </div>
                <img :src="IcArrow" alt="Next" class="cursor-pointer rotate-180 w-6 h-fit"
                    :class="currentAuthorIndex === store.authors.length - 1 ? 'opacity-30 pointer-events-none' : ''"
                    @click="next" />
            </div>

            <div class="w-full flex justify-end items-center mt-2">
                <button class="text-neutral-500 font-medium underline" @click="addAuthor">
                    + add more authors
                </button>
            </div>

            <button
                class="bg-neutral-400 text-primary-100 font-semibold px-11 py-3.5 rounded-14 mt-8 hover:underline disabled:opacity-50"
                :disabled="store.isLoading" @click="saveAndContinue">
                {{ store.isLoading ? 'Saving...' : 'Save and Continue' }}
            </button>
        </div>
    </div>
</template>