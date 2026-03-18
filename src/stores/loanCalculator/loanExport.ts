// stores/loanExport.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useExportPDF } from '@/composables/actions/useExportPDF'
import {useLoanStore} from "@/stores/loanCalculator/loanCalculator";

export const useLoanExportStore = defineStore('loanExport', () => {
    const loanStore = useLoanStore()
    const { exportPDF } = useExportPDF()

    const summaryCardsRef = ref<HTMLElement | null>(null)
    const paymentChartRef = ref<HTMLElement | null>(null)
    const balanceChartRef = ref<HTMLElement | null>(null)
    const isExporting = ref(false)

    async function handleExport() {
        if (isExporting.value || loanStore.schedule.length === 0) return
        isExporting.value = true
        try {
            await exportPDF(
                summaryCardsRef.value,
                paymentChartRef.value,
                balanceChartRef.value,
            )
        } finally {
            isExporting.value = false
        }
    }

    return { summaryCardsRef, paymentChartRef, balanceChartRef, isExporting, handleExport }
})