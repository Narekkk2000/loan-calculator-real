<script setup lang="ts">
import { computed } from 'vue'
import { COLORS } from '@/constants/colors'

import BaseFlex from "@/components/base/layout/BaseFlex.vue";
import BaseText from "@/components/base/text/BaseText.vue";

const props = defineProps<{
  bullets: string[]
  active: boolean
}>()

const bulletColor = computed(() =>
    props.active ? COLORS.SECONDARY : COLORS.MUTED
)

const textColor = computed(() =>
    props.active ? COLORS.CONTENT : COLORS.MUTED
)
</script>

<template>
  <ul class="space-y-1">
    <BaseFlex
        v-for="bullet in bullets"
        :key="bullet"
        tag="li"
        gap="1.5"
    >
      <span
          class="w-1 h-1 rounded-full shrink-0"
          :style="{ background: bulletColor }"
      />
      <BaseText
          tag="p"
          variant="hint"
          :rawColor="textColor"
          class="transition-all duration-200"
      >
        {{ bullet }}
      </BaseText>
    </BaseFlex>
  </ul>
</template>