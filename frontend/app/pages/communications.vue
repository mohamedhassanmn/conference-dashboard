<script setup lang="ts">
import { ref, computed } from "vue";
import CommunicationCard from "~/components/molecules/communicationCard.vue";

type Communication = {
  id: number;
  from: string;
  to: string[];
  subject: string;
  preview: string;
  body: string;
  time: string;
  isRead: boolean;
  isFlagged: boolean;
};

const communications = ref<Communication[]>([
  {
    id: 1,
    from: "conference-info@icpp2026.iitd.ac.in",
    to: ["naruto.uzumaki@gmail.com", "sasuke.uchiha@gmail.com"],
    subject: "Determining and Optimizing for Plasma Current",
    preview:
      "Determining and Optimizing for Plasma Current, Centroid Position...",
    body: "Determining and Optimizing for Plasma Current, Centroid Position, and Shape in the DEMOnstration Power Plant...",
    time: "06:43 pm",
    isRead: false,
    isFlagged: false,
  },
  // add more mock mails here
]);

/* Max 20 mails */
const visibleCommunications = computed(() => communications.value.slice(0, 20));

/* Actions */
const toggleRead = (id: number) => {
  const mail = communications.value.find((m) => m.id === id);
  if (mail) mail.isRead = !mail.isRead;
};

const toggleFlag = (id: number) => {
  const mail = communications.value.find((m) => m.id === id);
  if (mail) mail.isFlagged = !mail.isFlagged;
};

const deleteMail = (id: number) => {
  communications.value = communications.value.filter((m) => m.id !== id);
};

const isComposeOpen = ref(false);

const newMail = ref({
  to: "",
  subject: "",
  body: "",
});

const sendMail = () => {
  communications.value.unshift({
    id: Date.now(),
    from: "you@conference.com",
    to: [newMail.value.to],
    subject: newMail.value.subject || "(No subject)",
    preview: newMail.value.body.slice(0, 50),
    body: newMail.value.body,
    time: "Now",
    isRead: false,
    isFlagged: false,
  });

  newMail.value = { to: "", subject: "", body: "" };
  isComposeOpen.value = false;
};
</script>

<template>
  <button
    @click="isComposeOpen = true"
    class="fixed top-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
  >
    ✉ Compose
  </button>
  <div
    v-if="isComposeOpen"
    class="fixed right-0 top-0 h-full w-96 bg-white shadow-xl border-l z-50 flex flex-col"
  >
    <div class="flex items-center justify-between px-4 py-3 border-b">
      <span class="font-medium">New Message</span>
      <button @click="isComposeOpen = false">✕</button>
    </div>

    <div class="p-4 flex-1 flex flex-col gap-3">
      <input
        v-model="newMail.to"
        placeholder="Recipient"
        class="border px-3 py-2 rounded"
      />

      <input
        v-model="newMail.subject"
        placeholder="Subject"
        class="border px-3 py-2 rounded"
      />

      <textarea
        v-model="newMail.body"
        placeholder="Write your message..."
        class="border px-3 py-2 rounded flex-1 resize-none"
      />
    </div>

    <div class="p-4 border-t">
      <button
        @click="sendMail"
        class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Send
      </button>
    </div>
  </div>

  <div class="max-w-5xl mx-auto py-6">
    <h1 class="text-lg font-semibold mb-4">Communications</h1>

    <div class="border rounded-lg overflow-hidden">
      <CommunicationCard
        v-for="mail in visibleCommunications"
        :key="mail.id"
        :mail="mail"
        @toggleRead="toggleRead"
        @toggleFlag="toggleFlag"
        @delete="deleteMail"
      />
    </div>
  </div>
</template>
