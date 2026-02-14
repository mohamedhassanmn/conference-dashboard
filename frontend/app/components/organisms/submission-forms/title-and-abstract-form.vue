<script setup lang="ts">
import TextField from '~/components/atoms/text-field.vue';
import FileUpload from '~/components/atoms/file-upload.vue';
</script>

<template>
    <div class="w-full mt-10">
        <h2 class="text-xl font-semibold">Title and Abstract</h2>
        <div class="flex flex-col justify-center items-center w-full mt-5">
            <TextField label="First name" placeholder="Eg: Jamie" customClass="mt-4" />
            <FileUpload label="Upload Abstract File" customClass="mt-4" />
            <button class="bg-neutral-400 text-primary-100 font-semibold px-11 py-3.5 rounded-14 mt-8 hover:underline">
                Save and Continue
            </button>
        </div>
    </div>
</template>