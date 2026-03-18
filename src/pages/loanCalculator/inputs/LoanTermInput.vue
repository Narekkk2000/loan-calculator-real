<script setup lang="ts">
import { useLoanStore } from '@/stores/loanCalculator/loanCalculator'
import {useLoanTerm} from "@/composables/features/loan/useLoanTerm";
import { LOAN_TERM_PRESETS, TERM_UNIT_OPTIONS } from '@/constants/options'

import InputField from '@/components/shared/InputField.vue'
import ToggleSwitch from '@/components/shared/ToggleSwitch.vue'
import BaseText from '@/components/base/text/BaseText.vue'
import BaseFlex from '@/components/base/layout/BaseFlex.vue'
import {formatPresetLabel} from "@/utils/formatters";
import { Button } from "@/components/ui/button";

const store = useLoanStore()
const { localValue, validationError, termHint, isPresetActive, selectPreset, onInput, onUnitChange } = useLoanTerm()
</script>

<template>
  <BaseFlex col align="end" class="w-full">
      <ToggleSwitch
          :options="TERM_UNIT_OPTIONS"
          :model-value="store.loanTermUnit"
          @update:model-value="onUnitChange"
      />

      <div class="w-full self-start">
        <InputField
          label="Տևողություն"
          type="number"
          placeholder="24"
          :model-value="localValue"
          :min="1"
          :error="validationError"
          label-margin-top="-25px"
          @update:model-value="onInput"
        />
      </div>

    <BaseFlex
        class="mt-3 bg-gray-50  p-1 rounded-lg"
        gap="2"
        wrap
    >
      <Button
          v-for="preset in LOAN_TERM_PRESETS"
          :key="preset"
          :variant="isPresetActive(preset) ? 'default' : 'outline'"
          @click="selectPreset(preset)"
      >
        {{ formatPresetLabel(preset) }}
      </Button>
    </BaseFlex>

    <BaseText tag="p" variant="hint" color="MUTED" class="mt-2">
      {{ termHint }}
    </BaseText>
  </BaseFlex>
</template>
