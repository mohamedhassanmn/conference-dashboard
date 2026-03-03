<script setup lang="ts">
import IcRedirectionArrow from '~/assets/icons/ic-redirection-arrow.png';
</script>

<template>
    <div class="bg-primary-100 rounded-lg p-3 sm:p-4 flex flex-col justify-center min-h-[100px] flex-1 ">
        <div class="4xl:w-4/5 flex-1 mx-auto flex flex-col justify-center 4xl:gap-3">
            <div class="flex justify-between items-start gap-2">
                <div class="text-xs 4xl:text-sm bg-white px-1.5 py-0.5 rounded font-medium leading-tight">
                    Abstract Guidelines
                </div>
                <div class="bg-neutral-100 p-1 rounded-md overflow-hidden shrink-0">
                    <img :src="IcRedirectionArrow" alt="redirection-arrow" class="w-4 h-4" />
                </div>
            </div>
            <div class="my-2 text-base 4xl:text-lg font-semibold leading-tight">Registration timeline</div>
            <div class="text-xs 4xl:text-sm text-neutral-600 leading-relaxed">
                Clicking on it will take you to the guideline page
            </div>
        </div>
    </div>
</template>