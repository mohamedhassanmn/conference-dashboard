<script setup lang="ts">
import TextField from '~/components/atoms/text-field.vue';
definePageMeta({
    layout: 'no-default-fullscreen',
});
</script>

<template>
    <div class="w-full h-full relative">
        <div class="absolute left-0 bottom-0 w-full flex items-end justify-start">
            <NuxtImg src="/images/css-cross-pattern.png" alt="CSS PATTERN" class="w-1/4 z-0" />
        </div>
        <div class="m-auto w-2/3 4xl:w-1/2 h-full flex flex-col items-center justify-center">
            <NuxtImg src="/images/icpp-logo-outlined.png" alt="logo" class="w-1/3 4xl:w-103.5 z-10" />
            <div class="relative w-full mt-16 bg-white rounded-3xl p-6 flex flex-col items-center justify-center z-10">
                <NuxtImg src="/images/img-create-your-account-graphics.png" alt="logo"
                    class="absolute -top-44 -right-14 4xl:-top-64 4xl:-right-28 w-3/12 4xl:w-103.5 z-10" />
                <div class="space-y-3 flex flex-col items-center justify-center">
                    <div class="text-neutral-400 font-medium text-3xl 4xl:text-4xl space-x-2 tracking-wider">
                        <span>Create</span>
                        <span>your</span>
                        <span>Account</span>
                    </div>
                    <div class="text-neutral-300 text-base 4xl:text-lg tracking-wider font-medium">
                        See what is going on with your business
                    </div>
                </div>
                <div class="w-full flex justify-between items-start space-x-3">
                    <div class="w-1/2">
                        <TextField label="First name" placeholder="name" customClass="mt-7" inputClass="text-xl py-4" />
                        <TextField label="Email" placeholder="email@bc.com" customClass="mt-7"
                            inputClass="text-xl py-4" />
                        <TextField label="Country / region" placeholder="Eg: India" customClass="mt-7"
                            inputClass="text-xl py-4" />
                        <TextField label="Retype new password" placeholder="******" customClass="mt-7"
                            inputClass="text-xl py-4" />

                    </div>
                    <div class="w-1/2">
                        <TextField label="Last name" placeholder="surname" customClass="mt-7"
                            inputClass="text-xl py-4" />
                        <TextField label="Affiliation" placeholder="Eg: Company Name" customClass="mt-7"
                            inputClass="text-xl py-4" />
                        <TextField label="New password" placeholder="********" customClass="mt-7"
                            inputClass="text-xl py-4" />
                    </div>
                </div>
                <div class="mt-9 w-full flex justify-end">
                    <div class="flex justify-end items-center space-x-9">
                        <div class="text-neutral-700 text-xl bg-primary-700 px-8 py-3.5 rounded-2xl font-medium">
                            Continue
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute right-40 top-40 4xl:right-80 4xl:top-80 w-full flex items-start justify-end">
            <NuxtImg src="/images/css-cross-pattern.png" alt="CSS PATTERN" class="w-1/4 z-0" />
        </div>
    </div>
</template>