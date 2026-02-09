<script setup lang="ts">
import TextField from '~/components/atoms/text-field.vue';
import IcArrow from '~/assets/icons/ic-arrow.png'

const author: any[] = []
</script>

<template>
    <div class="w-full mt-10">
        <h2 class="text-xl font-semibold">Author {{ author.length + 1 }}</h2>
        <div class="flex flex-col justify-center items-center w-full mt-5">
            <TextField label="First name" placeholder="Eg: Jamie" customClass="mt-4" />
            <TextField label="Last name" placeholder="Eg: Lannister" customClass="mt-4" />
            <TextField label="Email" placeholder="jamie.lannister@gmail.com" customClass="mt-4" />
            <TextField label="Country/region" placeholder="Eg: India" customClass="mt-4" />
            <TextField label="Organization" placeholder="Eg: IIT Delhi" customClass="mt-4" />
            <TextField label="Web page" placeholder="Eg: https://www.example.com/" customClass="mt-4" />
            <div class="w-full mt-8 flex justify-between items-center">
                <img :src="IcArrow" alt="Add Author" class="inline-block mr-2 cursor-pointer w-6 h-fit" />
                <div class="">
                    <span class="text-lg font-semibold text-neutral-400">1</span>
                    <span class="text-neutral-200">/2</span>
                </div>
                <img :src="IcArrow" alt="Add Author" class="inline-block mr-2 cursor-pointer rotate-180 w-6 h-fit" />
            </div>
            <div class="w-full flex justify-end items-center mt-2">
                <button class="text-neutral-500 font-medium underline">
                    + add more authors
                </button>
            </div>
            <button class="bg-neutral-400 text-primary-100 font-semibold px-11 py-3.5 rounded-14 mt-8 hover:underline">
                Save and Continue
            </button>
        </div>
    </div>
</template>