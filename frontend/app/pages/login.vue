<script setup lang="ts">
import IcGoogle from '~/assets/icons/ic-google.png';
import TextField from '~/components/atoms/text-field.vue';

definePageMeta({
    layout: false,
});

const api = useApi();
const { setToken } = useAuth();
const router = useRouter();

const form = reactive({
    email: '',
    password: '',
});

const error = ref<string | null>(null);
const pending = ref(false);

const submit = async () => {
    try {
        pending.value = true;
        error.value = null;

        const result = await api.post<{ token: string; user: unknown }>('/auth/login', {
            email: form.email,
            password: form.password,
        });

        setToken(result.token);
        await router.push('/');

    } catch {
        error.value = 'Invalid email or password';
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <div class="w-full h-full flex space-x-3">
        <div class="w-1/3 flex items-end justify-start mb-16">
            <NuxtImg src="/images/img-login-graphics-1.png" alt="CSS PATTERN" class="w-2/3 z-0" />
        </div>

        <div class="w-1/3 flex flex-col items-center justify-center">
            <NuxtImg src="/images/icpp-logo-outlined.png" alt="logo" class="w-2/3 4xl:w-103.5 z-10" />

            <div class="w-full 4xl:w-3/4 mt-16 bg-white rounded-3xl p-6 flex flex-col items-center justify-center z-10">
                <div class="space-y-3 flex flex-col items-center justify-center">
                    <div class="text-neutral-400 font-medium text-3xl 4xl:text-4xl space-x-2 tracking-wider">
                        <span>Login</span>
                        <span>to</span>
                        <span>your</span>
                        <span>Account</span>
                    </div>
                    <div class="text-neutral-300 text-base 4xl:text-lg tracking-wider font-medium">
                        See what is going on with your business
                    </div>
                </div>

                <div class="flex justify-center items-center my-12">
                    <img :src="IcGoogle" alt="google-icon" class="w-8 h-8" />
                    <div class="ml-3.5 text-xl text-neutral-400 font-medium">Continue with Google</div>
                </div>

                <div class="text-neutral-300">------------- or Sign in with Email -------------</div>

                <div v-if="error" class="mt-4 text-red-500 text-sm w-full text-center">
                    {{ error }}
                </div>

                <TextField v-model="form.email" label="Email" placeholder="Enter your email" customClass="mt-7"
                    inputClass="text-xl py-4" />
                <TextField v-model="form.password" type="password" label="Password" placeholder="******"
                    customClass="mt-7" inputClass="text-xl py-4" />

                <div class="flex justify-between items-center w-full mt-4">
                    <div class="flex justify-center items-center">
                        <input type="checkbox" class="mr-2 h-4 w-4" id="remember-me" />
                        <label for="remember-me" class="text-neutral-400 text-lg">Remember Me</label>
                    </div>
                    <NuxtLink :to="ROUTES.FORGOT_PASSWORD" class="text-neutral-400 cursor-pointer">
                        Forgot Password?
                    </NuxtLink>
                </div>

                <div class="mt-9 w-full flex justify-end">
                    <div class="flex justify-end items-center space-x-9">
                        <NuxtLink :to="ROUTES.REGISTER" class="text-neutral-700 text-xl font-medium cursor-pointer">
                            Create account
                        </NuxtLink>
                        <button :disabled="pending"
                            class="text-neutral-700 text-xl bg-primary-700 px-8 py-2.5 rounded-2xl font-medium disabled:opacity-50 cursor-pointer"
                            @click="submit">
                            {{ pending ? 'Signing in...' : 'Login' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-1/3 flex items-start justify-end mt-12">
            <NuxtImg src="/images/img-login-graphics-2.png" alt="CSS PATTERN" class="w-2/3 z-0" />
        </div>
    </div>
</template>