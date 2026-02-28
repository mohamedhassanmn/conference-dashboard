<script setup lang="ts">
import { ref, computed } from 'vue'
import emptyIcon from '~/assets/icons/ic-empty-transactions.png'
import PaymentCard from '~/components/molecules/paymentsCard.vue'

/* ------------------ TYPES ------------------ */
type Payment = {
  title: string
  status: 'paid' | 'unpaid'
  date: string
  amount: string
  receiptUrl?: string
}

/* ------------------ DATA ------------------ */
const payments = ref<Payment[]>([
  { title: 'Registration fees - Early', status: 'unpaid', date: 'Nov 11, 2025', amount: '€ 600' },
  { title: 'Accommodation on All Meal Plan', status: 'paid', date: 'Nov 11, 2025', amount: '€ 600', receiptUrl: 'Receipt' },
  { title: 'Workshop Access', status: 'paid', date: 'Nov 12, 2025', amount: '€ 300' },
  { title: 'Networking Dinner', status: 'unpaid', date: 'Nov 13, 2025', amount: '€ 150' },
  { title: 'VIP Lounge', status: 'paid', date: 'Nov 14, 2025', amount: '€ 450' },
  { title: 'After Party', status: 'paid', date: 'Nov 15, 2025', amount: '€ 200' },
  { title: 'Merch Pack', status: 'unpaid', date: 'Nov 16, 2025', amount: '€ 90' },
  { title: 'Extra Session', status: 'paid', date: 'Nov 17, 2025', amount: '€ 120' }
])

/* ------------------ FILTER MODE ------------------ */
type ViewMode = 'last7' | 'all'
const viewMode = ref<ViewMode>('last7')
const isDropdownOpen = ref(false)

const viewOptions: { label: string; value: ViewMode }[] = [
  { label: 'Last 7 Days', value: 'last7' },
  { label: 'All Transactions', value: 'all' }
]

const selectView = (value: ViewMode) => {
  viewMode.value = value
  currentPage.value = 1
  isDropdownOpen.value = false
}

/* ------------------ PAGINATION ------------------ */
const PAGE_SIZE = 7
const currentPage = ref(1)

/* ------------------ CHECK 1: Entire List Empty ------------------ */
const isGlobalEmpty = computed(() =>
  payments.value.length === 0
)

/* ------------------ SORT (Newest First) ------------------ */
const sortedPayments = computed(() =>
  [...payments.value].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  )
)

/* ------------------ FILTER ------------------ */
const filteredPayments = computed(() => {
  if (viewMode.value === 'all') {
    return sortedPayments.value
  }

  const today = new Date()
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(today.getDate() - 7)

  return sortedPayments.value.filter(payment => {
    const paymentDate = new Date(payment.date)
    return paymentDate >= sevenDaysAgo
  })
})

/* ------------------ CHECK 2: Filtered Empty ------------------ */
const isFilteredEmpty = computed(() =>
  !isGlobalEmpty.value &&
  filteredPayments.value.length === 0
)

/* ------------------ PAGINATION ------------------ */
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredPayments.value.length / PAGE_SIZE))
)

const paginatedPayments = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredPayments.value.slice(start, start + PAGE_SIZE)
})

/* ------------------ ACTIONS ------------------ */
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
</script>

<template>
  <div class="w-[30vw] mx-auto p-6 h-[80vh] flex flex-col">

    <!-- HEADER (ALWAYS VISIBLE) -->
    <div class="flex items-center justify-between mb-4 relative z-50">

      <!-- Dropdown -->
      <div class="relative">
        <button
          @click="isDropdownOpen = !isDropdownOpen"
          class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700"
        >
          {{ viewOptions.find(o => o.value === viewMode)?.label }}
          <span class="text-gray-500">▾</span>
        </button>

        <div
          v-if="isDropdownOpen"
          class="absolute mt-2 w-44 bg-white rounded-lg shadow-lg border z-10"
        >
          <button
            v-for="option in viewOptions"
            :key="option.value"
            @click="selectView(option.value)"
            class="w-full text-left px-4 py-2 text-sm hover:bg-indigo-50"
            :class="{
              'bg-indigo-600 text-white hover:bg-indigo-600':
                viewMode === option.value
            }"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center gap-2">
        <button
          class="p-2 bg-gray-100 rounded-md disabled:opacity-40"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          ‹
        </button>

        <span class="text-sm font-medium">
          {{ currentPage }} / {{ totalPages }}
        </span>

        <button
          class="p-2 bg-gray-100 rounded-md disabled:opacity-40"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          ›
        </button>
      </div>
    </div>

    <!-- BODY (ONLY THIS CHANGES) -->
    <div class="flex-1 overflow-y-auto pr-2">

      <!-- FILTER EMPTY -->
      <div
        v-if="filteredPayments.length === 0"
        class="flex flex-col items-center justify-center h-full"
      >
        <img :src="emptyIcon" class="w-64 mb-4" />

        <p class="text-indigo-800 font-semibold text-3xl text-center">
          {{
            viewMode === 'last7'
              ? 'No transactions found in the last 7 days.'
              : 'No transactions available.'
          }}
        </p>
      </div>

      <!-- LIST -->
      <div v-else class="space-y-3">
        <PaymentCard
          v-for="(item, index) in paginatedPayments"
          :key="item.title + index"
          :payment="item"
          :index="(currentPage - 1) * PAGE_SIZE + index"
        />
      </div>

    </div>
  </div>
</template>