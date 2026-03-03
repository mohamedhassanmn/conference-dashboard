<script setup lang="ts">
import IcLink from '~/assets/icons/ic-link.png';
import EventScheduleInfoCard from '~/components/atoms/event-schedule-info-card.vue';
import LinksAndInfoCard from '~/components/atoms/links-and-info-card.vue';

definePageMeta({
    layout: 'dashboard-landing',
})
</script>

<template>
    <div class="w-full flex flex-col justify-between h-screen relative">
        <div class="pt-10 bg-primary-100 sticky top-0 z-10 h-fit pb-3">

            <div class="bg-white h-full max-h-14 rounded-2xl flex justify-between items-center overflow-hidden">
                <div class="text-xl 4xl:text-2xl font-semibold px-4 flex items-center space-x-2">
                    22<sup>nd</sup>&nbsp;International Congress on Plasma Physics
                    <img :src="IcLink" alt="link-icon" class="w-3.5 h-3.5 sm:w-4 sm:h-4 inline-block" />
                </div>
                <NuxtImg src="/images/css-cube-pattern.png" alt="CSS PATTERN"
                    class="scale-150 h-10 sm:h-14  shrink-0" />
            </div>
        </div>
        <div class="flex-1 min-h-56">
            <div class="flex h-full justify-between space-x-3">
                <EventScheduleInfoCard title="Abstract submission" status="Submission open"
                    statusClass="bg-light-darkish-green mt-2 mb-1" imgSrc="/images/img-submission-open.png" />
                <EventScheduleInfoCard title="Abstract timeline" imgSrc="/images/img-timeline-opensfrom.png" />
                <EventScheduleInfoCard title="Registration timeline" status="Early registration"
                    statusClass="bg-grass-green my-2" imgSrc="/images/img-registration-startsfrom.png" />
            </div>
        </div>
        <div class="flex-1 min-h-56">
            <div class="pt-3 h-full flex justify-between space-x-3">
                <div class="w-[66.26%] bg-white rounded-3xl relative overflow-hidden px-16 py-9">
                    <NuxtImg src="/images/css-wave-pattern.png" alt="CSS PATTERN"
                        class="w-full h-full absolute top-0 left-0 z-0 object-cover" />
                    <NuxtImg src="/images/img-reg-opensoon-status.png" alt="reg status pic"
                        class="relative w-full h-full object-contain z-10" />
                </div>
                <EventScheduleInfoCard customClass="flex-1" title="Info board" headerClass="mb-3"
                    imgSrc="/images/img-notification.png" />
            </div>
        </div>
        <div class="flex-1 min-h-56 flex flex-col">
            <div class="pt-3 pb-10 flex-1">
                <div class="bg-white py-4 4xl:py-8 px-4 xl:px-10 4xl:px-20 pt-7 flex flex-col rounded-3xl h-full">
                    <div class="text-xl 4xl:text-2xl font-semibold mb-3">More Info Links</div>
                    <div class="w-full flex-1 flex justify-between space-x-3">
                        <LinksAndInfoCard />
                        <LinksAndInfoCard />
                        <LinksAndInfoCard />
                        <LinksAndInfoCard />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>