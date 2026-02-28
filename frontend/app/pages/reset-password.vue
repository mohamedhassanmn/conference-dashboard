<script setup lang="ts">
import TextField from '~/components/atoms/text-field.vue';
definePageMeta({
    layout: 'no-default-fullscreen',
});
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
                        See what is going on with your business
                    </div>
                </div>
                <div class="w-full flex flex-col justify-between items-start space-y-4">
                    <TextField label="Password" placeholder="" customClass="mt-7" inputClass="text-xl py-4" />
                    <TextField label="Confirm Password" placeholder="" customClass="mt-7" inputClass="text-xl py-4" />
                </div>
                <div class="mt-9 w-full flex justify-end">
                    <div class="flex justify-end items-center space-x-9">
                        <div class="text-neutral-700 text-xl bg-primary-700 px-8 py-3.5 rounded-2xl font-medium">
                            Update Password
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute right-0 top-0 w-full flex items-start justify-end">
            <NuxtImg src="/images/css-cross-pattern.png" alt="CSS PATTERN" class="w-1/4 rotate-180 z-0" />
        </div>
    </div>
</template>