<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
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



const isSmall = ref(window.innerWidth < 768)
const onResize = () => { isSmall.value = window.innerWidth < 768 }
onMounted(() => window.addEventListener('resize', onResize))
onUnmounted(() => window.removeEventListener('resize', onResize))
</script>

<template>
  <BaseFlex :col="isSmall" gap="3" class="border border-gray-200 p-2 rounded-[6px] relative" style="border-top-left-radius: 0px;">
    <div class="px-2 py-1 bg-[#F3F8FE] text-black text-xs font-bold font-arm rounded-sm absolute top-[-22px] left-[-1px]" style="border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;">{{ label }}</div>
    <!-- Label -->
    <div class="w-24 shrink-0">
      <BaseText v-if="hint" tag="p" variant="hint" style="font-size: 12px; color: black;" color="MUTED" class="mt-0.5">
        {{ hint }}
      </BaseText>
    </div>

    <div class="flex  items-center gap-3">
          <!-- Percent field -->
    <div class="flex-1">
      <BaseText tag="p" variant="hint" color="CONTENT" class="mb-5 font-bold">Տոկոս</BaseText>
      <InputField  label="" type="number" inputmode="decimal" :model-value="localPercent" :min="0" :step="0.1"
        :error="percentError" placeholder="0" has-suffix @update:model-value="onPercentInput">
        <template #suffix>%</template>
      </InputField>
    </div>

    <!-- Or divider -->
    <BaseText tag="span" variant="hint" color="DEEP" class="pb-1 mt-6" style="color: black;">կամ</BaseText>

    <!-- Amount field -->
    <div class="flex-1">
      <BaseText tag="p" variant="hint" color="CONTENT" class="mb-5 font-bold">Ֆիքսված գումար</BaseText>
      <InputField label="" type="number" inputmode="numeric" :model-value="localAmount" :min="0" :step="10"
        :error="amountError" placeholder="0" has-prefix @update:model-value="onAmountInput">
        <template #prefix>$</template>
      </InputField>
    </div>
    </div>
  </BaseFlex>
</template>