<script setup lang="ts">
import TextField from '~/components/atoms/text-field.vue';

definePageMeta({
    layout: false,
});

const api = useApi();
const router = useRouter();
const route = useRoute();

const form = reactive({
    password: '',
    confirmPassword: '',
});

const error = ref<string | null>(null);
const pending = ref(false);

// token comes from the email link query param
const token = computed(() => route.query.token as string);

const submit = async () => {
    if (form.password !== form.confirmPassword) {
        error.value = 'Passwords do not match';
        return;
    }

    try {
        pending.value = true;
        error.value = null;

        await api.post('/auth/reset-password', {
            token: token.value,
            password: form.password,
            confirmPassword: form.confirmPassword,
        });

        await router.push('/login');

    } catch {
        error.value = 'Invalid or expired reset link. Please request a new one.';
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <div class="w-full h-full relative">
        <div class="absolute left-0 bottom-0 w-full flex items-end justify-start">
            <NuxtImg src="/images/img-reset-graphics.png" alt="CSS PATTERN" class="w-1/4 z-0" />
        </div>

        <div class="m-auto w-1/3 4xl:w-1/3 h-full flex flex-col items-center justify-center">
            <NuxtImg src="/images/icpp-logo-outlined.png" alt="logo" class="w-2/3 4xl:w-103.5 z-10" />

            <div
                class="relative w-full mt-16 bg-white rounded-3xl p-6 flex flex-col items-center justify-center z-10 mb-44">
                <div class="space-y-3 flex flex-col items-center justify-center">
                    <div class="text-neutral-400 font-medium text-3xl 4xl:text-4xl space-x-2 tracking-wider">
                        <span>Reset</span>
                        <span>your</span>
                        <span>Account</span>
                        <span>password</span>
                    </div>
                    <div class="text-neutral-300 text-base 4xl:text-lg tracking-wider font-medium">
                        Enter your new password
                    </div>
                </div>

                <div v-if="error" class="mt-4 text-red-500 text-sm w-full text-center">
                    {{ error }}
                </div>

                <!-- no token in URL -->
                <div v-if="!token" class="mt-7 text-red-500 text-center">
                    Invalid reset link.
                    <NuxtLink to="/forgot-password" class="underline">Request a new one</NuxtLink>
                </div>

                <template v-else>
                    <div class="w-full flex flex-col justify-between items-start space-y-4">
                        <TextField v-model="form.password" type="password" label="Password" placeholder="********"
                            customClass="mt-7" inputClass="text-xl py-4" />
                        <TextField v-model="form.confirmPassword" type="password" label="Confirm Password"
                            placeholder="********" customClass="mt-7" inputClass="text-xl py-4" />
                    </div>

                    <div class="mt-9 w-full flex justify-end">
                        <div class="flex justify-end items-center space-x-9">
                            <NuxtLink to="/login" class="text-neutral-500 text-xl font-medium cursor-pointer">
                                Back to login
                            </NuxtLink>
                            <button :disabled="pending"
                                class="text-neutral-700 text-xl bg-primary-700 px-8 py-3.5 rounded-2xl font-medium disabled:opacity-50 cursor-pointer"
                                @click="submit">
                                {{ pending ? 'Updating...' : 'Update Password' }}
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