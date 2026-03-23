<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { useLoanStore } from '@/stores/loanCalculator/loanCalculator'
import BaseText from '@/components/base/text/BaseText.vue'
import BaseFlex from '@/components/base/layout/BaseFlex.vue'
import {useModal} from "@/composables/ui/useModal";
import { Button } from "@/components/ui/button";

const ScheduleTableModal = defineAsyncComponent(
  () => import('@/pages/loanCalculator/results/modals/ScheduleTableModal.vue'),
)

const store = useLoanStore()

const { isOpen, open } = useModal()
const hasOpenedModal = ref(false)

function handleExpandClick() {
  hasOpenedModal.value = true
  open()
}
</script>

<template>
  <div class="rounded-xl bg-[#f6f8fa] border border-[#E8EEF6] p-5">
    <BaseFlex justify="between" align="center" gap="4" class="flex-wrap">
      <div>
        <BaseText tag="p" variant="kpi-label" color="CONTENT" class="font-bold">
          Մարման գրաֆիկ
        </BaseText>
        <BaseText tag="p" variant="hint" color="MUTED" class="mt-1">
          Տեսնել մարման ամբողջական աղյուսակն առանձին պատուհանում
        </BaseText>
      </div>

      <Button
        size="lg"
        :disabled="store.schedule.length === 0"
        @click="handleExpandClick"
      >
        Բացել գրաֆիկը
      </Button>
    </BaseFlex>

    <ScheduleTableModal
      v-if="hasOpenedModal"
      v-model="isOpen"
      :currency="store.loanCurrency"
      :schedule="store.schedule"
    />
  </div>
</template>
