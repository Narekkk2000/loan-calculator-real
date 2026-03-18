<template>
  <BaseModal
    :model-value="modelValue"
    max-width="2xl"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <!-- ── Header ──────────────────────────────────────────────────────────── -->
    <template #header="{ close }">
      <div
        class="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style="border-bottom: 1px solid rgba(99,179,237,0.1)"
      >
        <div class="flex items-center gap-3">
          <!-- Decorative accent bar -->
          <div
            class="w-1 h-5 rounded-full"
            style="background: linear-gradient(to bottom, #B9E919, rgba(185,233,25,0.2))"
          />
          <BaseHeading :level="2" variant="section-title" color="CONTENT">
            Payment Breakdown
          </BaseHeading>
          <BaseText tag="span" variant="footnote" color="DEEP">
            {{ sampled.length > 0 ? `${sampled.length} data points` : '' }}
          </BaseText>
        </div>

        <!-- Close button -->
        <button
          type="button"
          class="flex items-center justify-center w-7 h-7 rounded-lg cursor-pointer transition-all duration-150 font-ibm-mono"
          style="
            background: rgba(99,179,237,0.06);
            border: 1px solid rgba(99,179,237,0.12);
            color: #717372;
          "
          aria-label="Close"
          @mouseenter="($event.currentTarget as HTMLButtonElement).style.color = '#B9E919'"
          @mouseleave="($event.currentTarget as HTMLButtonElement).style.color = '#717372'"
          @click="close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </template>

    <!-- ── Body: larger chart ─────────────────────────────────────────────── -->
    <div class="p-5" style="height: 420px">
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
        No chart data
      </BaseText>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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
import { buildPaymentChartData, buildPaymentChartOptions } from '@/utils/chartConfig'
import {PaymentScheduleRow} from "@/types/loan";
import BaseModal from '@/components/base/overlays/BaseModal.vue'
import BaseHeading from '@/components/base/text/BaseHeading.vue'
import BaseText from '@/components/base/text/BaseText.vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
  modelValue: boolean
  /** Sampled schedule rows passed down from parent — no store access here. */
  sampled: PaymentScheduleRow[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const chartData = computed(() => buildPaymentChartData(props.sampled as any))
const chartOptions = computed(() => buildPaymentChartOptions())
</script>
