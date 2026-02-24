<script setup lang="ts">
type Direction = 'left' | 'right' | 'up' | 'down'

defineProps<{
  direction?: Direction
  disabled?: boolean
}>()
</script>

<template>
  <button
    :disabled="disabled"
    class="
      flex items-center gap-2
      px-4 py-2
      rounded-full
      bg-indigo-100 text-indigo-700
      font-medium text-sm
      transition
      hover:bg-indigo-200
      disabled:opacity-50 disabled:cursor-not-allowed
    "
  >
    <!-- Left / Up Arrow -->
    <svg
      v-if="direction === 'left' || direction === 'up'"
      :class="direction === 'up' ? '-rotate-90' : ''"
      class="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>

    <!-- Button content -->
    <slot />

    <!-- Right / Down Arrow -->
    <svg
      v-if="direction === 'right' || direction === 'down'"
      :class="direction === 'down' ? 'rotate-90' : ''"
      class="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
</template>