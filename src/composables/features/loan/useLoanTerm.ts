import { computed } from 'vue'
import { useLoanStore } from '@/stores/loanCalculator/loanCalculator'
import { useValidatedNumberField } from "@/composables/utils/useValidatedNumberField"
import { validateLoanTerm } from '@/utils/validators'
import type { LoanTermUnit } from '@/types/loan'

export const useLoanTerm = () => {
    // Store

    const store = useLoanStore()

    // Validated field

    const { localValue, validationError, onInput } = useValidatedNumberField({
        source: () => store.loanTermValue,
        commit: (n) => { store.loanTermValue = n },
        validator: (val) => validateLoanTerm(val, store.loanTermUnit),
    })

    // Unit handler

    const onUnitChange = (val: string) => {
        const newUnit = val as LoanTermUnit
        const current = parseFloat(localValue.value)

        if (!isNaN(current)) {
            if (newUnit === 'months' && store.loanTermUnit === 'years') {
                const converted = current * 12
                store.loanTermValue = converted
                localValue.value = String(converted)
            } else if (newUnit === 'years' && store.loanTermUnit === 'months') {
                const converted = Math.round(current / 12)
                store.loanTermValue = converted
                localValue.value = String(converted)
            }
        }

        store.loanTermUnit = newUnit
    }

    // Step

    const termStep = computed(() => store.loanTermUnit === 'years' ? 1 : 3)

    const isPresetActive = (months: number) => store.totalMonths === months

    const selectPreset = (months: number) => {
        if (store.loanTermUnit === 'years') {
            const asYears = months / 12

            if (Number.isInteger(asYears)) {
                store.loanTermValue = asYears
                localValue.value = String(asYears)
            } else {
                store.loanTermUnit = 'months'
                store.loanTermValue = months
                localValue.value = String(months)
            }
        } else {
            store.loanTermValue = months
            localValue.value = String(months)
        }

        validationError.value = ''
    }

    // term hint

    const termHint = computed(() =>
        store.loanTermUnit === 'months'
            ? `= ${Math.round(store.totalMonths / 12 * 10) / 10} տարիներ ընդհանուր`
            : `= ${store.totalMonths} ամիսների ընդհանուր`
    )

    return {
        localValue,
        validationError,
        termStep,
        termHint,
        isPresetActive,
        selectPreset,
        onInput,
        onUnitChange
    }
}
