<script setup lang="ts">
import TextField from '~/components/atoms/text-field.vue';

definePageMeta({
    layout: false,
});

const api = useApi();
const email = ref('');
const error = ref<string | null>(null);
const pending = ref(false);
const success = ref(false);

const submit = async () => {
    try {
        pending.value = true;
        error.value = null;

        await api.post('/auth/forgot-password', { email: email.value });

        success.value = true;
    } catch {
        error.value = 'Something went wrong. Please try again.';
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <div class="w-full h-full relative">
        <div class="absolute left-0 bottom-0 w-full flex items-end justify-start">
            <NuxtImg src="/images/img-find-your-account-graphics.png" alt="CSS PATTERN" class="w-1/4 z-0" />
        </div>

        <div class="mx-auto w-1/3 4xl:w-1/3 h-full flex flex-col items-center justify-center">
            <NuxtImg src="/images/icpp-logo-outlined.png" alt="logo" class="w-2/3 4xl:w-103.5 z-10" />

            <div
                class="relative w-full mt-16 bg-white rounded-3xl p-6 flex flex-col items-center justify-center z-10 mb-44">
                <div class="space-y-3 flex flex-col items-center justify-center">
                    <div class="text-neutral-400 font-medium text-3xl 4xl:text-4xl space-x-2 tracking-wider">
                        <span>Find</span>
                        <span>your</span>
                        <span>Account</span>
                    </div>
                    <div class="text-neutral-300 text-base 4xl:text-lg tracking-wider font-medium">
                        Enter your email address
                    </div>
                </div>

                <!-- success state -->
                <div v-if="success" class="mt-7 w-full text-center text-green-500 font-medium">
                    If that email exists you will receive a reset link shortly.
                </div>

                <template v-else>
                    <div v-if="error" class="mt-4 text-red-500 text-sm w-full text-center">
                        {{ error }}
                    </div>

                    <div class="w-full">
                        <TextField v-model="email" label="Email" placeholder="email@bc.com" customClass="mt-7"
                            inputClass="text-xl py-4" />
                    </div>

                    <div class="mt-9 w-full flex justify-end">
                        <div class="flex justify-end items-center space-x-9">
                            <NuxtLink to="/login" class="text-neutral-500 text-xl font-medium cursor-pointer">
                                Back to login
                            </NuxtLink>
                            <button :disabled="pending"
                                class="text-neutral-700 text-xl bg-primary-700 px-8 py-3.5 rounded-2xl font-medium disabled:opacity-50 cursor-pointer"
                                @click="submit">
                                {{ pending ? 'Sending...' : 'Continue' }}
                            </button>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <div class="absolute right-0 top-0 w-full flex items-start justify-end">
            <NuxtImg src="/images/css-cross-pattern.png" alt="CSS PATTERN" class="w-1/4 rotate-180 z-0" />
        </div>
    </div>
</template>