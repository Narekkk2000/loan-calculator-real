<script setup lang="ts">
import { useLoanStore } from '@/stores/loanCalculator/loanCalculator'
import {useLoanAmount} from "@/composables/features/loan/useLoanAmount";
import {formatPresetLabel} from "@/utils/formatters"
import { CURRENCY_OPTIONS, LOAN_AMOUNT_PRESETS } from '@/constants/options'
import { CURRENCY_SYMBOLS } from '@/constants/currency'
import type { Currency } from '@/types/common'

import InputField from '@/components/shared/InputField.vue'
import BaseFlex from '@/components/base/layout/BaseFlex.vue'
import ToggleSwitch from '@/components/shared/ToggleSwitch.vue'
import { Button } from "@/components/ui/button";

const store = useLoanStore()
const { localValue, validationError, onInput, isPresetActive, selectPreset } = useLoanAmount()
</script>

<template>
  <BaseFlex class="w-full" col align="end" gap="1">
    <ToggleSwitch
      :options="CURRENCY_OPTIONS"
      :model-value="store.loanCurrency"
      @update:model-value="(value) => (store.loanCurrency = value as Currency)"
    />

    <div class="w-full self-start">
      <InputField
        has-prefix
        label="Վարկի գումարը՝"
        type="number"
        inputmode="numeric"
        label-margin-bottom="-5px"
        placeholder="500000"
        :model-value="localValue"
        :error="validationError"
        @update:model-value="onInput"
      >
        <template #prefix>{{ CURRENCY_SYMBOLS[store.loanCurrency] }}</template>
      </InputField>
    </div>

    <BaseFlex class="mt-3 bg-accent p-1 rounded-sm" gap="2" wrap>
      <Button
        v-for="preset in LOAN_AMOUNT_PRESETS"
        :key="preset"
        class="rounded-sm"
        :variant="isPresetActive(preset) ? 'default' : 'outline'"
        @click="selectPreset(preset)"
      >
        {{ formatPresetLabel(preset) }}
      </Button>
    </BaseFlex>
  </BaseFlex>
</template>
