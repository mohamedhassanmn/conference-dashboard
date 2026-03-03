<script setup lang="ts">
import { useSubmissionStore } from '~/stores/submissions.store'

const store = useSubmissionStore()
const { submitSubmission } = useSubmission()

const handleSubmit = async () => {
    try {
        await submitSubmission()
    } catch { }
}
</script>

<template>
    <div class="w-full h-full flex flex-col items-center">

        <!-- Submitted success state -->
        <template v-if="store.isSubmitted">
            <div class="flex-1 flex flex-col items-center justify-center">
                <div class="relative w-64 h-64">
                    <!-- illustration placeholder — replace src with your actual asset -->
                    <NuxtImg src="/images/img-form-submission-illustration.png" alt="Submitted"
                        class="w-full h-full object-contain" />
                </div>
                <h2 class="text-2xl font-bold text-neutral-600 mt-6">Submitted Successfully</h2>
            </div>
        </template>

        <!-- Summary state -->
        <template v-else>
            <div class="w-full pr-8 flex-1 overflow-y-auto scrollbar-thin">
                <h2 class="text-xl font-semibold">Submission detail:</h2>
                <div class="border border-neutral-200 rounded-xl px-4 py-3 mt-1">
                    <div class="flex justify-between mt-6">
                        <div class="font-medium mr-4 w-32">Title</div>
                        <div class="w-96 text-sm leading-relaxed">{{ store.title }}</div>
                    </div>
                    <div class="flex justify-between mt-6">
                        <div class="font-medium mr-4 w-32">Keywords</div>
                        <div class="w-96 text-sm leading-relaxed">{{ store.keywords.join(', ') }}</div>
                    </div>
                    <div class="flex justify-between mt-6">
                        <div class="font-medium mr-4 w-32">Abstract</div>
                        <div class="w-96 text-sm leading-relaxed">
                            {{ store.abstract_file_key ? 'File uploaded ✓' : 'No file uploaded' }}
                        </div>
                    </div>
                    <div class="flex justify-between mt-6">
                        <div class="font-medium mr-4 w-32">Supplementary</div>
                        <div class="w-96 text-sm leading-relaxed">
                            {{ store.supplementary_file_key ? 'File uploaded ✓' : 'No file uploaded' }}
                        </div>
                    </div>
                </div>

                <h2 class="text-xl mt-8 font-semibold">Authors detail:</h2>
                <div class="border border-neutral-200 rounded-xl px-4 py-3 mt-1">
                    <div v-for="(author, i) in store.authors" :key="i" class="flex justify-between mt-6">
                        <div class="font-medium mr-4 w-32">Author {{ i + 1 }}</div>
                        <div class="w-96 text-sm leading-relaxed">
                            <div class="flex justify-between mt-2">
                                <div class="font-medium w-2/5">First name</div>
                                <div class="w-3/5">{{ author.first_name }}</div>
                            </div>
                            <div class="flex justify-between mt-2">
                                <div class="font-medium w-2/5">Last name</div>
                                <div class="w-3/5">{{ author.last_name }}</div>
                            </div>
                            <div class="flex justify-between mt-2">
                                <div class="font-medium w-2/5">Email</div>
                                <div class="w-3/5">{{ author.email }}</div>
                            </div>
                            <div class="flex justify-between mt-2">
                                <div class="font-medium w-2/5">Country</div>
                                <div class="w-3/5">{{ author.country }}</div>
                            </div>
                            <div class="flex justify-between mt-2">
                                <div class="font-medium w-2/5">Organization</div>
                                <div class="w-3/5">{{ author.organization }}</div>
                            </div>
                            <div v-if="author.webpage" class="flex justify-between mt-2">
                                <div class="font-medium w-2/5">Web page</div>
                                <div class="w-3/5">{{ author.webpage }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="store.error" class="text-red-500 text-sm mt-2">{{ store.error }}</div>

            <button
                class="bg-neutral-400 text-primary-100 font-semibold px-11 py-3.5 rounded-14 mt-8 hover:underline disabled:opacity-50"
                :disabled="store.isLoading" @click="handleSubmit">
                {{ store.isLoading ? 'Submitting...' : 'Submit and Complete' }}
            </button>
        </template>

    </div>
</template>