<script setup lang="ts">
import NotificationsListItem from '~/components/atoms/notifications-list-item.vue';
const props = defineProps({});
</script>

<template>
    <NotificationsListItem title="Paper submission success"
        message="submission successful, please wait until your paper get reviewed, we will get back to you shortly."
        status="success" time="8 hours ago" />
    <NotificationsListItem title="Paper submission success"
        message="submission successful, please wait until your paper get reviewed, we will get back to you shortly."
        status="failed" time="6 hours ago" />
    <NotificationsListItem title="Paper submission success"
        message="submission successful, please wait until your paper get reviewed, we will get back to you shortly."
        status="approved" time="2 hours ago" />
    <NotificationsListItem title="Paper submission success"
        message="submission successful, please wait until your paper get reviewed, we will get back to you shortly."
        status="rejected" time="1 hours ago" />
    <NotificationsListItem title="Paper submission success"
        message="submission successful, please wait until your paper get reviewed, we will get back to you shortly."
        status="under_review" time="4 hours ago" />
</template>