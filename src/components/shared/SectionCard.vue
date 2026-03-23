<script setup lang="ts">
import BaseHeading from '@/components/base/text/BaseHeading.vue'
import BaseBox from '@/components/base/layout/BaseBox.vue'
import BaseFlex from '@/components/base/layout/BaseFlex.vue'

defineProps<{
  title?: string
  padding?: string
}>()
</script>
<template>
  <!-- <BaseBox style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px">
    <BaseFlex
      v-if="title"
      gap="2"
      class="px-6! py-4"
      style="border-bottom: 1px solid rgba(99, 179, 237, 0.08)"
    >
      <BaseHeading :level="3" variant="section-title" color="MUTED">
        {{ title }}
      </BaseHeading>
    </BaseFlex>
    <div :class="padding ?? 'p-6'">
      <slot />
    </div>
  </BaseBox> -->
    <BaseBox style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px">
    <BaseFlex
      v-if="title"
      gap="2"
      class=" py-14"
    >
      <BaseHeading :level="3" variant="section-title" color="MUTED">
        {{ title }}
      </BaseHeading>
    </BaseFlex>
    <div class="py-4">
      <slot/>
    </div>
  </BaseBox>
</template>
