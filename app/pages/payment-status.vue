<script setup lang="ts">
import emptyIcon from "~/assets/icons/ic-empty-transactions.png";
/**
 * Set this to [] to see the empty state
 * Replace with API data later
 */
const payments = [
 {
    title: 'Registration fees - Early',
    status: 'unpaid',
    date: 'Nov 11, 2025',
    amount: '€ 600'
  },
  {
    title: 'Accommodation on All Meal Plan',
    status: 'paid',
    date: 'Nov 11, 2025',
    amount: '€ 600',
    link: 'Receipt'
  },
  {
    title: 'Registration fees - Early',
    status: 'paid',
    date: 'Nov 11, 2025',
    amount: '€ 600',
    link: 'Invoice'
  },
  {
    title: 'Registration fees - Early',
    status: 'unpaid',
    date: 'Nov 11, 2025',
    amount: '€ 600'
  }
];

const isPaid = (status: string) => status === "paid";
</script>

<template>
  <!-- EMPTY STATE (NO HEADER) -->
  <div
    v-if="payments.length === 0"
    class="flex flex-col items-center justify-center text-center mt-24"
  >
    <img
      :src="emptyIcon"
      alt="Empty transactions"
      class="w-[300px] mb-4"
    />
  </div>

  <!-- LIST STATE -->
  <div v-else class="max-w-3xl mx-auto p-6 min-h-[70vh]">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <button
        class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm"
      >
        Last 5 Transactions
        <span class="text-gray-500">▾</span>
      </button>

      <div class="flex items-center gap-2">
        <button class="p-2 bg-gray-100 rounded-md">‹</button>
        <span class="text-sm font-medium">1</span>
        <button class="p-2 bg-gray-100 rounded-md">›</button>
      </div>
    </div>

    <!-- PAYMENT LIST -->
    <div class="space-y-3">
      <div
        v-for="(item, index) in payments"
        :key="index"
        class="flex items-center justify-between p-4 rounded-lg"
        :class="isPaid(item.status) ? 'bg-gray-50' : 'bg-indigo-50'"
      >
        <div>
          <p class="font-medium text-gray-900">
            {{ item.title }}
          </p>

          <div class="text-sm mt-1">
            <span
              class="font-medium"
              :class="isPaid(item.status) ? 'text-green-600' : 'text-gray-400'"
            >
              {{ isPaid(item.status) ? 'Paid' : 'Not Paid' }}
            </span>

            <span class="text-gray-400">
              | {{ item.date }}
            </span>

            <span
              v-if="item.link"
              class="text-indigo-600 ml-1 cursor-pointer"
            >
              | {{ item.link }}
            </span>
          </div>
        </div>

        <div class="font-semibold text-gray-900">
          {{ item.amount }}
        </div>
      </div>
    </div>
  </div>
</template>

