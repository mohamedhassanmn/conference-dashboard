<script setup lang="ts">
import IcLink from '~/assets/icons/ic-link.png';
import IcProfile from '~/assets/icons/ic-profile.png';
const keywords = ["World", "Paper", "Pencil", "Laptop", "Mouse"];
</script>

<template>
     <div class="w-1/3 p-4">
         <div class="bg-primary-100 rounded p-4 w-full text-sm text-neutral-500 font-semibold">
             <div class="flex justify-between mb-3 text-xs">
                 <div class="">11:35 am</div>
                 <div class="text-green-500">&check;&nbsp;Reviewed</div>
             </div>
             <div class="mb-3">Precise Measurements of Short-Lived Reactive Species in Gas-Liquid Interfacial Plasmas with
                 High-Speed Liquid-Column Flow</div>
             <div class="mb-3 flex justify-start items-center">
                 <div class="flex items-center mr-4">
                     <img :src="IcLink" alt="link-icon" class="w-3.5 h-3.5" />
                     <span class="underline text-blue-500">Abstract</span>
                 </div>
                 <div class="flex items-center">
                     <img :src="IcLink" alt="link-icon" class="w-3.5 h-3.5" />
                     <span class="underline text-red-500">Paper</span>
                 </div>
             </div>
             <div class="mb-3 flex flex-wrap">
                 <div v-for="keyword in keywords" :key="keyword"
                     class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                     {{ keyword }}
                 </div>
             </div>
             <div class="flex justify-between items-end">
                 <div class="flex items-center">
                     <img v-for="i in 4" :key="i" :src="IcProfile" alt="profile-icon" class="w-8 h-8" />
                     <div class="">+8</div>
                 </div>
                 <div>
                     <button class="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit Review</button>
                 </div>
             </div>
         </div>
     </div>
</template>