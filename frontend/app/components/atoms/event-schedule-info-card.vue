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
    <div class="w-full bg-white rounded-3xl py-6 px-7 flex flex-col justify-center" :class="props.customClass">
        <div class="w-79 mx-auto flex flex-col items-center">
            <div class="w-full flex justify-between items-center" :class="props.headerClass">
                <div class="text-2xl font-medium">
                    {{ props.title }}
                </div>
                <div class="bg-primary-100 p-1 rounded-md overflow-hidden">
                    <img :src="IcRedirectionArrow" alt="redirection-arrow" class="w-6 h-6" />
                </div>
            </div>
            <div v-if="!!props.status" class="px-1 rounded-md w-fit text-lg" :class="props.statusClass">
                {{ props.status }}
            </div>
            <img :src="props.imgSrc" alt="status pic" :class="props.imgClass" />
        </div>
    </div>
</template>