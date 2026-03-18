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
  <div class="w-full">
    <div class="w-full">
        <InputField
          label="Տոկոս"
          type="number"
          :model-value="localValue"
          :min="0"
          :step="rateStep"
          :error="validationError"
          placeholder="12"
          label-margin-bottom="-15px"
          label-margin-top="-30px"
          @update:model-value="onInput"
        >
          <template #prefix>%</template>
        </InputField>
    </div>

    <ToggleSwitch
    class="mt-3"
      :options="INTEREST_RATE_TYPE_OPTIONS"
      :model-value="store.interestRateType"
      @update:model-value="onTypeChange"
    />

    <BaseText
        v-if="rateHint"
        tag="p"
        variant="hint"
        color="MUTED"
        class="mt-2"
    >
      {{ rateHint }}
    </BaseText>
  </div>
</template>
