<script setup lang="ts">
import KeywordsTextField from '~/components/atoms/keywords-text-field.vue';


</script>

<template>
    <div class="w-full pr-8 h-fit overflow-y-auto scrollbar-thin">
        <h2 class="text-xl font-semibold">Keywords</h2>
        <div class="flex flex-col justify-center items-center w-full mt-5">
            <KeywordsTextField label="Type in the keywords" placeholder="Enter keywords and press enter"
                customClass="mt-4" />
            <button class="bg-neutral-400 text-primary-100 font-semibold px-11 py-3.5 rounded-14 mt-8 hover:underline">
                Save and Continue
            </button>
        </div>
    </div>
</template>