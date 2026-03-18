<script setup lang="ts">
import { useLoanStore } from '@/stores/loanCalculator/loanCalculator'
import {CommissionInput} from "@/types/loan";

import SectionCard from '@/components/shared/SectionCard.vue'
import BaseText from '@/components/base/text/BaseText.vue'
import BaseFlex from '@/components/base/layout/BaseFlex.vue'
import BaseDivider from '@/components/base/ui/BaseDivider.vue';
import CommissionRow from "@/pages/loanCalculator/inputs/commissionSection/CommissionRow.vue";
import BaseHeading from '@/components/base/text/BaseHeading.vue';


const store = useLoanStore()

// Rows config
interface CommissionRowConfig {
  label: string
  hint: string
  get: () => CommissionInput
  set: (val: CommissionInput) => void
}

const rows: CommissionRowConfig[] = [
  {
    label: 'Միանգամյա',
    hint: 'Միայն 1-ին ամիսը',
    get: () => store.oneTimeCommission,
    set: (v) => { store.oneTimeCommission = v }
  },
  {
    label: 'Ամսական',
    hint: 'Ամեն ամիս',
    get: () => store.monthlyCommission,
    set: (v) => { store.monthlyCommission = v }
  },
  {
    label: 'Տարեկան',
    hint: 'Ամիսներ 1,13,25…',
    get: () => store.annualCommission,
    set: (v) => { store.annualCommission  = v }
  },
] as const
</script>

<template>
  <div>
    <BaseHeading>Միջնորդավճարներ և վճարներ</BaseHeading>
    <!-- Header -->
    <BaseFlex gap="3" class="mb-3">
      <div class="w-24 shrink-0" />
      <div class="flex-1 text-center text-[11px] uppercase tracking-widest text-app-muted font-medium font-ibm-mono">
        Տոկոս
      </div>
      <div class="w-6 shrink-0" />
      <div class="flex-1 text-center text-[11px] uppercase tracking-widest text-app-muted font-medium font-ibm-mono">
        Ֆիքսված գումար
      </div>
    </BaseFlex>

    <!-- Rows -->
    <div class="space-y-3">
      <template v-for="(row, idx) in rows" :key="row.label">
        <CommissionRow
            :label="row.label"
            :hint="row.hint"
            :model-value="row.get()"
            @update:model-value="row.set($event)"
        />
        <BaseDivider v-if="idx < rows.length - 1" />
      </template>
    </div>

    <BaseText tag="p" variant="footnote" color="MUTED" class="mt-3">
      * Երկու դաշտերն էլ լրացված լինելու դեպքում առաջնահերթությունը տրվում է տոկոսին։
    </BaseText>
  </div>
</template>