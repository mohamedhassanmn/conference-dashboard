<script setup lang="ts">
import IcStatusSuccess from '~/assets/icons/ic-status-success.png'
import IcStatusFailed from '~/assets/icons/ic-status-failed.png'
import IcStatusApproved from '~/assets/icons/ic-status-approved.png'
import IcStatusRejected from '~/assets/icons/ic-status-rejected.png'
import IcStatusUnderReview from '~/assets/icons/ic-status-under-review.png'
const props = defineProps({
    title: {
        type: String,
        required: true,
        default: ''
    },
    message:{
        type: String,
        required: false,
        default: ''
    },
    status:{
        type: String,
        required: false,
        default: 'success'
    },
    time:{
        type: String,
        required: false,
        default: '8 hours ago'
    }
})
let statusIcon =  undefined;
if(props.status === 'success'){
    statusIcon = IcStatusSuccess;
}else if(props.status === 'failed'){
    statusIcon = IcStatusFailed;
}else if(props.status === 'approved'){
    statusIcon = IcStatusApproved;
}else if(props.status === 'rejected'){
    statusIcon = IcStatusRejected;
}else if(props.status === 'under_review'){
    statusIcon = IcStatusUnderReview;
}
</script>

<template>
    <div class="flex justify-center items-start space-x-2.5 p-3 w-1/3 mx-auto hover:bg-primary-200 cursor-pointer">
        <div>
            <img :src="statusIcon" alt="File Upload" class="min-w-10 w-10 h-10" />
        </div>
        <div class="">
            <div class="font-semibold text-sm text-neutral-600 mb-1">{{ props.title }}</div>
            <div class="text-xs text-neutral-300">{{ props.message }}</div>
        </div>
        <div class="whitespace-nowrap text-xs text-neutral-200">{{props.time}}</div>
    </div>
</template>
