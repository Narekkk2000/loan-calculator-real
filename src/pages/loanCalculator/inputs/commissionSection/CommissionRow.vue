<script setup lang="ts">
import { useCommissionRow } from '@/composables/features/loan/useCommissionRow'
import type { CommissionInput } from '@/types/loan'
import BaseText from '@/components/base/text/BaseText.vue'
import BaseFlex from '@/components/base/layout/BaseFlex.vue'
import InputField from '@/components/shared/InputField.vue'

const props = defineProps<{
  label: string
  hint?: string
  modelValue: CommissionInput
}>()

const emit = defineEmits<{
  'update:modelValue': [value: CommissionInput]
}>()

const {
  localPercent,
  localAmount,
  percentError,
  amountError,
  onPercentInput,
  onAmountInput,
} = useCommissionRow(
    () => props.modelValue,
    (val) => emit('update:modelValue', val),
)
</script>

<template>
  <BaseFlex gap="3">
    <!-- Label -->
    <div class="w-24 shrink-0">
      <BaseText tag="p" variant="hint" color="CONTENT">{{ label }}</BaseText>
      <BaseText v-if="hint" tag="p" variant="sub-hint" color="MUTED" class="mt-0.5">
        {{ hint }}
      </BaseText>
    </div>

    <!-- Percent field -->
    <div class="flex-1">
      <InputField
          label=""
          type="number"
          inputmode="decimal"
          :model-value="localPercent"
          :min="0"
          :step="0.1"
          :error="percentError"
          placeholder="0"
          has-suffix
          @update:model-value="onPercentInput"
      >
        <template #suffix>%</template>
      </InputField>
    </div>

    <!-- Or divider -->
    <BaseText tag="span" variant="hint" color="DEEP" class="pb-1">կամ</BaseText>

    <!-- Amount field -->
    <div class="flex-1">
      <InputField
          label=""
          type="number"
          inputmode="numeric"
          :model-value="localAmount"
          :min="0"
          :step="10"
          :error="amountError"
          placeholder="0"
          has-prefix
          @update:model-value="onAmountInput"
      >
        <template #prefix>$</template>
      </InputField>
    </div>
  </BaseFlex>
</template>