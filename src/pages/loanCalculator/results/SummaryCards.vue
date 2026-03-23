<script setup lang="ts">
import { computed } from 'vue'
import { useLoanStore } from '@/stores/loanCalculator/loanCalculator'
import { formatCurrency, formatPercent, } from '@/utils/format'
import { COLORS } from '@/constants/colors'

import BaseText from '@/components/base/text/BaseText.vue'
import BaseFlex from '@/components/base/layout/BaseFlex.vue'

const store = useLoanStore()

interface KpiCard {
  label: string
  value: string
  sub: string
  color: string
  icon: string
}

const cards = computed<KpiCard[]>(() => {
  const s = store.summary
  const paymentLabel = store.repaymentType === 'annuity' ? 'Ամսական վճարում' : 'Առաջին վճարում'
  const paymentSub = store.repaymentType === 'annuity' ? 'ֆիքսված ամսական գումար' : 'ամենաբարձր ամսական գումար'
  const currency = store.loanCurrency

  return [
    {
      label: 'Ընդհանուր վճարում',
      value: formatCurrency(s.totalPayment, currency),
      sub: 'principal + interest + fees',
      color: COLORS.DEEP,
      icon: '◈',
    },
    {
      label: 'Ընդհանուր գերավճար',
      value: formatCurrency(s.totalOverpayment, currency),
      sub: `${s.totalPayment > 0 ? ((s.totalOverpayment / store.loanAmount) * 100).toFixed(1) : '0.00'}% of principal`,
      color: '#E4B016',
      icon: '〜',
    },
    {
      label: 'Արդյունավետ տոկոսադրույք',
      value: formatPercent(s.effectiveRate),
      sub: 'annual (incl. fees)',
      color: '#63C55A',
      icon: '◌',
    },
    {
      label: paymentLabel,
      value: formatCurrency(s.firstMonthPayment, currency),
      sub: paymentSub,
      color: 'black',
      icon: '▷',
    },
  ]
})
</script>

<template>
  <div class="relative flex">
    <div class="rounded-xs bg-[#f6f8fa] border border-[#E8EEF6] p-5 flex flex-col gap-2 transition-all duration-20 w-full" style="border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
      <div
        v-for="(card, index) in cards"
        :key="card.label"
        class="pb-3  last:pb-0"
      >
        <BaseFlex gap="8" align="center" justify="between">
          <BaseFlex gap="1.5">
            <BaseText tag="span" variant="kpi-label" style="color: black;">
              {{ card.label }}
            </BaseText>
            <BaseText tag="span" variant="kpi-icon" :rawColor="card.color">
              {{ card.icon }}
            </BaseText>
          </BaseFlex>

          <BaseText tag="span" :variant="index === 0 ? 'kpi-value-big' : 'kpi-value'" :rawColor="card.color">
            {{ card.value }}
          </BaseText>
        </BaseFlex>
      </div>
    </div>
  </div>
</template>
