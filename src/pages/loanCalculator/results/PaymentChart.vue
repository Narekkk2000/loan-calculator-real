<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { useLoanStore } from '@/stores/loanCalculator/loanCalculator'
import {useModal} from "@/composables/ui/useModal";
import {
  sampleSchedule,
  buildPaymentChartData,
  buildPaymentChartOptions,
} from '@/utils/chartConfig'
import BaseHeading from '@/components/base/text/BaseHeading.vue'
import BaseText from '@/components/base/text/BaseText.vue'
import BaseBox from '@/components/base/layout/BaseBox.vue'
import BaseFlex from '@/components/base/layout/BaseFlex.vue'

const PaymentChartModal = defineAsyncComponent(
  () => import('@/pages/loanCalculator/results/modals/PaymentChartModal.vue'),
)

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useLoanStore()

const sampled = computed(() => sampleSchedule(store.schedule))
const chartData = computed(() => buildPaymentChartData(sampled.value))
const chartOptions = computed(() => buildPaymentChartOptions(store.loanCurrency))

const { isOpen, open } = useModal()
const hasOpenedModal = ref(false)

function handleExpandClick() {
  hasOpenedModal.value = true
  open()
}
</script>

<template>
  <div class="relative">
    <!-- Expand icon — same pattern as SummaryCards -->
    <button
      type="button"
      aria-label="Expand chart"
      class="absolute -top-7 right-0 flex items-center justify-center w-6 h-6 rounded-md cursor-pointer transition-all duration-150"
      style="
        background: rgba(99,179,237,0.05);
        border: 1px solid rgba(99,179,237,0.1);
        color: #3C5801;
      "
      @mouseenter="($event.currentTarget as HTMLButtonElement).style.color = '#B9E919'"
      @mouseleave="($event.currentTarget as HTMLButtonElement).style.color = '#3C5801'"
      @click="handleExpandClick"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
      </svg>
    </button>

    <BaseBox overflow>
    <BaseFlex
      justify="between"
      class="px-5 py-3"
      style="border-bottom: 1px solid rgba(99,179,237,0.07)"
    >
      <BaseHeading :level="3" variant="section-title" color="MUTED">
        Payment Breakdown
      </BaseHeading>
      <BaseText tag="span" variant="footnote" color="MUTED">
        {{ sampled.length > 0 ? `${sampled.length} data points` : '' }}
      </BaseText>
    </BaseFlex>

    <div class="p-5" style="height: 260px">
      <Bar
        v-if="sampled.length > 0"
        :data="chartData"
        :options="chartOptions"
      />
      <BaseText
        v-else
        tag="div"
        variant="hint"
        color="DEEP"
        class="flex items-center justify-center h-full"
      >
        Enter loan details to see chart
      </BaseText>
    </div>
    </BaseBox>

    <PaymentChartModal
      v-if="hasOpenedModal"
      v-model="isOpen"
      :currency="store.loanCurrency"
      :sampled="sampled"
    />
  </div>
</template>
