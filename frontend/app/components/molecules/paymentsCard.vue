<script setup lang="ts">
type Payment = {
  title: string
  status: 'paid' | 'unpaid'
  date: string
  amount: string
  link?: string
}

defineProps<{
  payment: Payment
}>()

const isPaid = (status: string) => status === 'paid'
</script>

<template>
  <div
    class="flex items-center justify-between p-4 rounded-xl"
    :class="isPaid(payment.status) ? 'bg-indigo-50': 'bg-gray-100'"
  >
    <!-- Left -->
    <div>
      <p class="font-medium text-gray-900">
        {{ payment.title }}
      </p>

      <div class="text-sm mt-1">
        <span
          class="font-medium"
          :class="isPaid(payment.status) ? 'text-green-600' : 'text-gray-400'"
        >
          {{ isPaid(payment.status) ? 'Paid' : 'Not Paid' }}
        </span>

        <span class="text-gray-400"> | {{ payment.date }}</span>

        <span
          v-if="payment.link"
          class="text-indigo-600 ml-1 cursor-pointer"
        >
          | {{ payment.link }}
        </span>
      </div>
    </div>

    <!-- Right -->
    <span class="font-semibold text-gray-900">
      {{ payment.amount }}
    </span>
  </div>
</template>
