<script setup lang="ts">
import IcRedirectionArrow from '~/assets/icons/ic-redirection-arrow.png';
</script>

<template>
    <div class="w-1/4 bg-primary-100 rounded-lg p-4 flex justify-center items-center">
        <div class=" w-5/6 mx-auto flex flex-col items-center">
            <div class="w-full flex justify-between items-center">
                <div class="text-sm bg-white p-0.5 rounded">
                    Abstract Guidelines
                </div>
                <div class="bg-neutral-100 p-1 rounded-md overflow-hidden">
                    <img :src="IcRedirectionArrow" alt="redirection-arrow" class="w-6 h-6" />
                </div>
            </div>
            <div class="my-6 w-full text-lg font-semibold">Registration timeline</div>
            <div class="w-full text-sm">Clicking on it will take you to the guideline page</div>
        </div>
    </div>
</template>