<script setup lang="ts">
import IcRedirectionArrow from '~/assets/icons/ic-redirection-arrow.png';
const props = defineProps({
    title: {
        type: String,
        required: true,
        default: ''
    },
    status: {
        type: String,
        required: false,
        default: ''
    },
    imgSrc: {
        type: String,
        required: false,
        default: ''
    },
    customClass: {
        type: String,
        required: false,
        default: ''
    },
    headerClass: {
        type: String,
        required: false,
        default: ''
    },
    statusClass: {
        type: String,
        required: false,
        default: ''
    },
    imgClass: {
        type: String,
        required: false,
        default: ''
    }
})
</script>

<template>
    <div class="w-full bg-white rounded-3xl py-6 4xl:px-7 flex flex-col justify-center overflow-hidden"
        :class="props.customClass">
        <div class="w-4/5 h-full mx-auto flex flex-col items-center justify-evenly">
            <div class="w-full flex justify-between items-center" :class="props.headerClass">
                <div class="text-lg 4xl:text-2xl font-medium">
                    {{ props.title }}
                </div>
                <div class="bg-primary-100 p-0.5 4xl:p-1 rounded-md overflow-hidden">
                    <img :src="IcRedirectionArrow" alt="redirection-arrow" class="w-5 h-5 4xl:w-6 4xl:h-6" />
                </div>
            </div>
            <div v-if="!!props.status" class="px-1 rounded-md w-fit text-xs xl:text-sm 4xl:text-lg"
                :class="props.statusClass">
                {{ props.status }}
            </div>
            <div class="h-2/3 w-full flex items-end">
                <img :src="props.imgSrc" alt="status pic" :class="props.imgClass"
                    class="h-full w-full object-contain object-bottom" />
            </div>
        </div>
    </div>
</template>