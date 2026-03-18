<script setup lang="ts">
import {useLoanExportStore} from "@/stores/loanCalculator/loanExport";

import BaseFlex from "@/components/base/layout/BaseFlex.vue";
import BaseDivider from "@/components/base/ui/BaseDivider.vue";
import SectionCard from "@/components/shared/SectionCard.vue";
import LoanAmountInput from "@/pages/loanCalculator/inputs/LoanAmountInput.vue";
import InterestRateInput from "@/pages/loanCalculator/inputs/InterestRateInput.vue";
import LoanTermInput from "@/pages/loanCalculator/inputs/LoanTermInput.vue";
import SummaryCards from "@/pages/loanCalculator/results/SummaryCards.vue";
import CommissionSection from "@/pages/loanCalculator/inputs/commissionSection/CommissionSection.vue";
import PaymentChart from "@/pages/loanCalculator/results/PaymentChart.vue";
import BalanceChart from "@/pages/loanCalculator/results/BalanceChart.vue";
import ScheduleTable from "@/pages/loanCalculator/results/ScheduleTable.vue";
import RepaymentTypeSelector from "@/pages/loanCalculator/inputs/repaymentTypeSelector/RepaymentTypeSelector.vue";

const loanExportStore = useLoanExportStore();
</script>

<template>
  <div class="flex flex-col items-start gap-6">
    <SectionCard>
      <BaseFlex col gap="3">
        <LoanAmountInput />
        <BaseDivider :thickness="1" class="bg-gray-300"/>
        <LoanTermInput class="mt-3"/>
        <BaseDivider :thickness="1"/>
        <InterestRateInput class="mt-12"/>
        <BaseDivider :thickness="1"/>
        <RepaymentTypeSelector class="mt-3"/>
        <BaseDivider :thickness="1"/>
        <CommissionSection />
        <BaseDivider :thickness="1"/>
        <div :ref="(el) => loanExportStore.summaryCardsRef = el as HTMLElement" class="mt-3 w-full">
          <SummaryCards />
        </div>
        <BaseDivider :thickness="1"/>
        <ScheduleTable class="mt-3" />

        <!-- Compact card version keeps charts hidden -->
        <!--
        <div :ref="(el) => loanExportStore.paymentChartRef = el as HTMLElement">
          <PaymentChart />
        </div>
        <div :ref="(el) => loanExportStore.balanceChartRef = el as HTMLElement">
          <BalanceChart />
        </div>
        -->
      </BaseFlex>
    </SectionCard>
  </div>
</template>
