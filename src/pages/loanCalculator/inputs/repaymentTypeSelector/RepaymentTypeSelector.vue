<script setup lang="ts">
import { computed } from 'vue'
import { useLoanStore } from '@/stores/loanCalculator/loanCalculator'
import { REPAYMENT_TYPE_OPTIONS } from '@/constants/options'

import ToggleSwitch from '@/components/shared/ToggleSwitch.vue'
import BaseText from '@/components/base/text/BaseText.vue'
import BaseHeading from '@/components/base/text/BaseHeading.vue'
import BaseFlex from '@/components/base/layout/BaseFlex.vue'

const store = useLoanStore()

const repaymentOptions = computed(() =>
  REPAYMENT_TYPE_OPTIONS.map((opt) => ({
    value: opt.value,
    label: opt.title,
  })),
)

const activeOption = computed(() =>
  REPAYMENT_TYPE_OPTIONS.find((opt) => opt.value === store.repaymentType),
)
</script>

<template>
  <div class="w-full">
    <BaseHeading>Վճարման տեսակը</BaseHeading>
    <ToggleSwitch
      :options="repaymentOptions"
      :model-value="store.repaymentType"
      @update:model-value="(value) => (store.repaymentType = value as typeof store.repaymentType)"
    />

    <BaseText tag="p" variant="hint" color="MUTED" class="mt-2">
      {{ activeOption?.description }}
    </BaseText>
  </div>
</template>
