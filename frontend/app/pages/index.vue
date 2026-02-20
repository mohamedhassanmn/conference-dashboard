<script setup lang="ts">
import IcLink from '~/assets/icons/ic-link.png';
import IcRedirectionArrow from '~/assets/icons/ic-redirection-arrow.png';
import EventScheduleInfoCard from '~/components/atoms/event-schedule-info-card.vue';
import LinksAndInfoCard from '~/components/atoms/links-and-info-card.vue';
const config = useRuntimeConfig();
definePageMeta({
    layout: 'dashboard-landing',
})
// console.log('Checking backend health...',config.public.apiBase)
// const { data, error } = await useFetch('http://backend:4500/')

// console.log('data:', data.value)
// console.log('error:', error.value)
</script>

<template>
    <div class="w-full h-full flex flex-col justify-between">
        <div class="bg-white h-[6.86%] rounded-2xl flex justify-between items-center overflow-hidden">
            <div class="text-2xl font-semibold p-4 flex items-center space-x-2">
                22<sup>nd</sup>&nbsp;International Congress on Plasma Physics
                <img :src="IcLink" alt="link-icon" class="w-5 h-5" />
            </div>
            <NuxtImg src="/images/css-cube-pattern.png" alt="CSS PATTERN" class="scale-150 h-full" />
        </div>
        <div class="h-[29.06%] flex justify-between space-x-3">
            <EventScheduleInfoCard title="Abstract submission" status="Opening soon"
                statusClass="bg-golden-yellow mt-3.5 mb-2.5" imgSrc="/images/img-submission-opening-soon.png"
                imgClass="h-37.5" />
            <EventScheduleInfoCard title="Abstract timeline" headerClass="mb-12"
                imgSrc="/images/img-timeline-startsfrom.png" imgClass="h-39.25" />
            <EventScheduleInfoCard title="Registration timeline" status="Early registeration"
                statusClass="bg-grass-green my-5" imgSrc="/images/img-registration-startsfrom.png" imgClass="h-34" />
        </div>
        <div class="h-[29.06%] flex justify-between space-x-3">
            <div class="w-[66.26%] bg-white rounded-3xl relative overflow-hidden px-16 py-9">
                <NuxtImg src="/images/css-wave-pattern.png" alt="CSS PATTERN"
                    class="w-full h-full absolute top-0 left-0" />
                <NuxtImg src="/images/img-reg-opensoon-status.png" alt="reg status pic"
                    class="w-full h-full object-contain" />
            </div>
            <EventScheduleInfoCard customClass="flex-1" title="Info board" headerClass="mb-3"
                imgSrc="/images/img-notification.png" imgClass="h-46" />
        </div>
        <div class="bg-white h-[29.06%] p-10 px-20 pt-7 flex flex-col rounded-3xl">
            <div class="text-2xl font-semibold mb-3">More Info Links</div>
            <div class="w-full flex-1 flex justify-between space-x-3">
                <LinksAndInfoCard />
                <LinksAndInfoCard />
                <LinksAndInfoCard />
                <LinksAndInfoCard />
            </div>
        </div>
    </div>
</template>