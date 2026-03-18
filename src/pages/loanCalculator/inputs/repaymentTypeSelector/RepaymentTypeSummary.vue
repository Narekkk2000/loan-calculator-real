<script setup lang="ts">
import { computed } from 'vue'
import { COLORS } from '@/constants/colors'

import BaseText from "@/components/base/text/BaseText.vue";

const props = defineProps<{
  option: { description: string }
  active: boolean
}>()

const textColor = computed(() =>
    props.active ? COLORS.CONTENT : COLORS.MUTED
)
</script>

<template>
  <BaseText
      tag="p"
      variant="description"
      :rawColor="textColor"
      class="mb-3 md:font-bold transition-all duration-200"
  >
    {{ option.description }}
  </BaseText>
</template>