<script setup lang="ts">
import { ref } from "vue";
import {
  TrashIcon,
  FlagIcon,
  EnvelopeIcon,
  EnvelopeOpenIcon,
} from "@heroicons/vue/24/outline";

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

const props = defineProps<{ mail: Communication }>();

const emit = defineEmits<{
  (e: "toggleRead", id: number): void;
  (e: "toggleFlag", id: number): void;
  (e: "delete", id: number): void;
}>();

const isOpen = ref(false);
</script>

<template>
  <div class="group relative border-b px-4 py-3 transition hover:bg-gray-100">
    <!-- ROW -->
    <div
      class="grid grid-cols-[32px_80px_1fr_40px] items-center gap-4 cursor-pointer"
      @click="isOpen = !isOpen"
    >
      <input type="checkbox" />

      <span class="text-sm text-gray-500">
        {{ mail.time }}
      </span>

      <div>
        <p
          class="text-sm font-medium"
          :class="mail.isRead ? 'text-gray-700' : 'text-gray-900'"
        >
          {{ mail.subject }}
        </p>
        <p class="text-xs text-gray-500 truncate">
          {{ mail.preview }}
        </p>
      </div>
    </div>

    <!-- HOVER ACTION ICONS -->
    <div
      class="absolute right-4 top-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition flex items-center gap-3"
    >
      <!-- Read / Unread -->
      <button
        @click.stop="emit('toggleRead', mail.id)"
        class="text-gray-500 hover:text-indigo-600"
      >
        <EnvelopeOpenIcon v-if="mail.isRead" class="w-5 h-5" />
        <EnvelopeIcon v-else class="w-5 h-5" />
      </button>

      <!-- Flag -->
      <button
        @click.stop="emit('toggleFlag', mail.id)"
        :class="
          mail.isFlagged
            ? 'text-yellow-500'
            : 'text-gray-400 hover:text-yellow-500'
        "
      >
        <FlagIcon class="w-5 h-5" />
      </button>

      <!-- Delete -->
      <button
        @click.stop="emit('delete', mail.id)"
        class="text-gray-400 hover:text-red-500"
      >
        <TrashIcon class="w-5 h-5" />
      </button>
    </div>

    <!-- EXPANDED BODY -->
    <div v-if="isOpen" class="mt-4 text-sm text-gray-700">
      <p class="mb-2"><strong>From:</strong> {{ mail.from }}</p>
      <p class="mb-2"><strong>To:</strong> {{ mail.to.join(", ") }}</p>
      <p>{{ mail.body }}</p>
    </div>
  </div>
</template>

<style scoped>
div:hover .group-hover\:flex {
  display: flex;
}
</style>
