<script setup lang="ts">
import {useLoanStore} from "@/stores/loanCalculator/loanCalculator";
import {useInterestRate} from "@/composables/features/loan/useInterestRate";
import { INTEREST_RATE_TYPE_OPTIONS } from '@/constants/options'

import InputField from '@/components/shared/InputField.vue'
import ToggleSwitch from '@/components/shared/ToggleSwitch.vue'
import BaseText from '@/components/base/text/BaseText.vue'

const store = useLoanStore()

const {
  localValue,
  validationError,
  rateStep,
  rateHint,
  onInput,
  onTypeChange,
} = useInterestRate()
</script>

<template>
  <div class="w-full flex flex-col">
        <ToggleSwitch
          class="self-end"
          :options="INTEREST_RATE_TYPE_OPTIONS"
          :model-value="store.interestRateType"
          @update:model-value="onTypeChange"
    />
    <div class="w-full">
        <InputField
          label="Տոկոսը՝"
          type="number"
          :model-value="localValue"
          :min="0"
          :step="rateStep"
          :error="validationError"
          placeholder="12"
          label-margin-top="-23px"
          @update:model-value="onInput"
        >
          <template #prefix>%</template>
        </InputField>
    </div>


    <BaseText
        v-if="rateHint"
        tag="p"
        variant="hint"
        color="MUTED"
        class="mt-2 self-end"
    >
      {{ rateHint }}
    </BaseText>
  </div>
</template>
