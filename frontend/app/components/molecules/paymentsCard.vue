<script setup lang="ts">
type Payment = {
  title: string
  status: 'paid' | 'unpaid'
  date: string
  amount: string
  receiptUrl?: string
}

const props = defineProps<{
  payment: Payment
  index: number
}>()
const downloadReceipt = () => {
  if (!props.payment.receiptUrl) return

  const link = document.createElement('a')
  link.href = props.payment.receiptUrl
  link.download = 'receipt.pdf'
  link.target = '_blank'
  link.click()
}

const isPaid = (status: string) => status === 'paid'
</script>

<template>
 <div
  class="flex items-center justify-between p-4 mb-3"
  :class="index % 2 === 0 ? 'bg-blue-50' : 'bg-gray-50'"
>
  <!-- LEFT -->
  <div>
    <p class="font-medium text-gray-900">
      {{ payment.title }}
    </p>

    <div class="text-sm mt-1">
      <span
        class="font-medium"
        :class="payment.status === 'paid'
          ? 'text-green-600'
          : 'text-gray-400'"
      >
        {{ payment.status === 'paid' ? 'Paid' : 'Not Paid' }}
      </span>

      <span class="text-gray-400">
        | {{ payment.date }}
      </span>

      <!-- Receipt (only if PAID) -->
      <button
        v-if="payment.status === 'paid' && payment.receiptUrl"
        @click="downloadReceipt"
        class="text-indigo-600 ml-1 hover:underline"
      >
        | Receipt
      </button>
    </div>
  </div>

  <!-- RIGHT -->
  <span class="font-semibold text-gray-900">
    {{ payment.amount }}
  </span>
</div>
</template>
