<template>
  <BaseModal
    :model-value="modelValue"
    max-width="full"
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
            Մարման գրաֆիկ
          </BaseHeading>
          <BaseText tag="span" variant="footnote" color="DEEP">
            {{ schedule.length }} տող
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

    <!-- ── Body: full table, all rows, no pagination ───────────────────────── -->
    <div class="overflow-x-auto">
      <table
        class="w-full text-xs font-ibm-mono"
        style="border-collapse: collapse"
      >
        <thead>
          <tr class="bg-app-bg">
            <th
              v-for="col in SCHEDULE_COLUMNS"
              :key="col.key"
              class="px-4 py-2.5 text-[10px] uppercase tracking-widest font-medium whitespace-nowrap"
              :style="{
                textAlign: col.align as 'left' | 'right',
                color: COLORS.MUTED,
                borderBottom: '1px solid rgba(99,179,237,0.08)',
              }"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="schedule.length === 0">
            <td
              :colspan="SCHEDULE_COLUMNS.length"
              class="px-4 py-8 text-center text-xs"
              :style="{ color: COLORS.DEEP }"
            >
              No schedule data
            </td>
          </tr>
          <tr
            v-for="(row, idx) in schedule"
            :key="(row as any).month"
            :style="{
              background:'transparent',
            }"
          >
            <td
              v-for="col in SCHEDULE_COLUMNS"
              :key="col.key"
              class="px-4 py-2 whitespace-nowrap"
              :style="{
                textAlign: col.align as 'left' | 'right',
                color: 'black',
                borderBottom: '1px solid rgba(99,179,237,0.04)',
                fontSize: '16px'
              }"
            >
              {{ cellValue(row as any, col.key) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/base/overlays/BaseModal.vue'
import BaseHeading from '@/components/base/text/BaseHeading.vue'
import BaseText from '@/components/base/text/BaseText.vue'
import { COLORS } from '@/constants/colors'
import { SCHEDULE_COLUMNS } from '@/constants/table'
import { cellColor, cellValue } from '@/utils/formatters'
import {PaymentScheduleRow} from "@/types/loan";

defineProps<{
  modelValue: boolean
  /** Full schedule rows passed down from parent — no store access here. */
  schedule: PaymentScheduleRow[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
