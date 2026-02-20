<script setup lang="ts">
import { ref, computed } from 'vue'
import emptyIcon from '~/assets/icons/ic-empty-transactions.png'
import PaymentCard from '~/components/molecules/paymentsCard.vue'

type Payment = {
  title: string
  status: 'paid' | 'unpaid'
  date: string
  amount: string
  link?: string
}

/* ------------------ DATA ------------------ */
const payments = ref<Payment[]>([]);

/* ------------------ VIEW MODE ------------------ */
type ViewMode = 'last5' | 'all'
const viewMode = ref<ViewMode>('last5')

/* ------------------ PAGINATION ------------------ */
const PAGE_SIZE = 7
const MAX_PAGES = 2
const currentPage = ref(1)

/* ------------------ COMPUTED ------------------ */
const isDropdownOpen = ref(false)

const totalPages = computed(() => {
  if (viewMode.value === 'last5') return 1

  return Math.min(
    Math.ceil(filteredPayments.value.length / PAGE_SIZE),
    MAX_PAGES
  )
})

const viewOptions = [
  { label: 'Last 5 Transactions', value: 'last5' },
  { label: 'All Transactions', value: 'all' }
]

const selectedOption = computed(() =>
  viewOptions.find(o => o.value === viewMode.value)
)

const selectView = (value: 'last5' | 'all') => {
  viewMode.value = value
  currentPage.value = 1
  isDropdownOpen.value = false
}

const sortedPayments = computed(() =>
  [...payments.value].reverse()
)

const filteredPayments = computed(() => {
  if (viewMode.value === 'last5') {
    return sortedPayments.value.slice(0, 5)
  }
  return sortedPayments.value
})

const paginatedPayments = computed(() => {
  if (viewMode.value === 'last5') {
    return filteredPayments.value
  }

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

const changeView = (mode: ViewMode) => {
  viewMode.value = mode
  currentPage.value = 1
}
</script>
<template>
  <!-- EMPTY STATE -->
  <div
    v-if="payments.length === 0"
    class="flex flex-col items-center justify-center h-[80vh]"
  >
    <img :src="emptyIcon" class="w-64 mb-4" />
    <p class="text-[#5F6599] font-semibold text-4xl">Transaction log</p>
    <p class="text-[#5F6599] font-semibold text-3xl">is empty!</p>
  </div>

  <!-- LIST STATE -->
  <div v-else class="max-w-3xl mx-auto p-6 h-[80vh] flex flex-col">
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-4">
      <!-- Dropdown -->
      <!-- CUSTOM DROPDOWN -->
      <div class="relative">
        <!-- Trigger -->
        <button
          @click="isDropdownOpen = !isDropdownOpen"
          class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700"
        >
          {{ selectedOption?.label }}
          <span class="text-gray-500">▾</span>
        </button>

        <!-- Dropdown menu -->
        <div
          v-if="isDropdownOpen"
          class="absolute w-40 bg-white rounded-lg shadow-lg border z-10"
        >
          <button
            v-for="option in viewOptions"
            :key="option.value"
            @click="selectView(option.value as any)"
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
          :disabled="currentPage === 1 || viewMode === 'last5'"
        >
          ‹
        </button>

        <span class="text-sm font-medium">
          {{ currentPage }} / {{ totalPages }}
        </span>

        <button
          class="p-2 bg-gray-100 rounded-md disabled:opacity-40"
          @click="nextPage"
          :disabled="currentPage === totalPages || viewMode === 'last5'"
        >
          ›
        </button>
      </div>
    </div>

    <!-- SCROLLABLE LIST -->
    <div class="flex-1 overflow-y-auto space-y-3 pr-2">
      <PaymentCard
        v-for="(item, index) in paginatedPayments"
        :key="index"
        :payment="item"
      />
    </div>
  </div>
</template>
