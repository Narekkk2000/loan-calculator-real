<script setup lang="ts">
import { computed } from 'vue'
import { COLORS } from '@/constants/colors'

import BaseFlex from "@/components/base/layout/BaseFlex.vue";
import BaseText from "@/components/base/text/BaseText.vue";

const props = defineProps<{
  option: { value: string; icon: string; title: string }
  active: boolean
}>()

const colorMap = computed(() => ({
  icon: props.active ? COLORS.ACCENT : COLORS.MUTED,
  title: props.active ? COLORS.CONTENT : COLORS.MUTED,
}))
</script>

<template>
  <BaseFlex gap="2" class="mb-2">
    <BaseText variant="icon-glyph" :rawColor="colorMap.icon">
      {{ option.icon }}
    </BaseText>
    <BaseText variant="card-title" :rawColor="colorMap.title">
      {{ option.title }}
    </BaseText>
  </BaseFlex>
</template>