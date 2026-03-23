<script setup lang="ts">
import { useLoanStore } from '@/stores/loanCalculator/loanCalculator'
import { CommissionInput } from "@/types/loan";

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
    set: (v) => { store.annualCommission = v }
  },
] as const
</script>

<template>
  <div>
    <BaseText variant="sub-hint" color="CONTENT" class="mb-8">
      Միջնորդավճարներ և վճարներ
    </BaseText>
    <!-- Header -->

    <!-- Rows -->
    <div class="space-y-3">
      <template v-for="(row, idx) in rows" :key="row.label">
        <CommissionRow 
        class="mt-12"
        :label="row.label" 
        :hint="row.hint" 
        :model-value="row.get()"
        :show-headers="idx === 0"
          @update:model-value="row.set($event)" />
      </template>
    </div>

    <BaseText style="text-align: end;" tag="p" variant="footnote" color="MUTED" class="mt-3">
      * Երկու դաշտերն էլ լրացված լինելու դեպքում առաջնահերթությունը տրվում է տոկոսին։
    </BaseText>
  </div>
</template>