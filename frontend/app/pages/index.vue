<script setup lang="ts">
import IcLink from '~/assets/icons/ic-link.png';
import EventScheduleInfoCard from '~/components/atoms/event-schedule-info-card.vue';
import LinksAndInfoCard from '~/components/atoms/links-and-info-card.vue';
const config = useRuntimeConfig();
definePageMeta({
    layout: 'dashboard-landing',
})
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
            <EventScheduleInfoCard title="Abstract submission" status="Submission open"
                statusClass="bg-light-darkish-green mt-3.5 mb-2.5" imgSrc="/images/img-submission-open.png"
                imgClass="h-37.5" />
            <EventScheduleInfoCard title="Abstract timeline" headerClass="mb-12"
                imgSrc="/images/img-timeline-opensfrom.png" imgClass="h-34" />
            <EventScheduleInfoCard title="Registration timeline" status="Early registeration"
                statusClass="bg-grass-green my-5" imgSrc="/images/img-registration-startsfrom.png" imgClass="h-34" />
        </div>
        <div class="h-[29.06%] flex justify-between space-x-3">
            <div class="w-[66.26%] bg-white rounded-3xl relative overflow-hidden px-16 py-9">
                <NuxtImg src="/images/css-wave-pattern.png" alt="CSS PATTERN"
                    class="w-full h-full absolute top-0 left-0 z-0" />
                <NuxtImg src="/images/img-reg-opensoon-status.png" alt="reg status pic"
                    class="relative w-full h-full object-contain z-10" />
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