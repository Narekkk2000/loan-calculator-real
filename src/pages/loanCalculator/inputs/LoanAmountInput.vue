<script setup lang="ts">
import {useLoanAmount} from "@/composables/features/loan/useLoanAmount";
import {formatPresetLabel} from "@/utils/formatters"
import { LOAN_AMOUNT_PRESETS } from '@/constants/options'

import InputField from '@/components/shared/InputField.vue'
import BaseFlex from '@/components/base/layout/BaseFlex.vue'
import { Button } from "@/components/ui/button";

const { localValue, validationError, onInput, isPresetActive, selectPreset } = useLoanAmount()
</script>

<template>
  <BaseFlex class="w-full" col align="end" gap="1">
    <div class="w-full self-start">
      <InputField
        has-prefix
        label="Գումար"
        type="number"
        inputmode="numeric"
        label-margin-top="0px"
        label-margin-bottom="-10px"
        placeholder="500000"
        :model-value="localValue"
        :error="validationError"
        @update:model-value="onInput"
      >
        <template #prefix>$</template>
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
