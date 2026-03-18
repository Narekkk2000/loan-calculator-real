// composables/features/loan/useInterestRate.ts
import { computed } from 'vue'
import { useLoanStore } from '@/stores/loanCalculator/loanCalculator'
import { useValidatedNumberField } from '@/composables/utils/useValidatedNumberField'
import { validateInterestRate } from '@/utils/validators'
import type { InterestRateType } from '@/types/loan'

export const useInterestRate = () => {
    const store = useLoanStore()

    // ── Validated numeric field ────────────────────────────────────────
    const { localValue, validationError, onInput } = useValidatedNumberField({
        source: () => store.interestRateValue,
        commit: (n) => {
            store.interestRateValue = n
        },
        validator: (val) => validateInterestRate(val, store.interestRateType),
        // Optional: custom parse if you ever allow a thousand separators in rates
        // parse: (val) => parseFloat(val.replace(/[^0-9.]/g, '')),
    })

    // Type (annual / monthly) handler
    const onTypeChange = (val: string) => {
        store.interestRateType = val as InterestRateType
        // Optional: convert value when switching (recommended for better UX)
        // But many calculators keep the number as-is and only change interpretation
        // Here we keep it simple (no auto-conversion) – decide based on your needs
    }

    // Step (finer control for monthly)
    const rateStep = computed(() =>
        store.interestRateType === 'annual' ? 0.1 : 0.01
    )

    // Helpful hint
    const rateHint = computed(() =>
        store.interestRateType === 'annual'
            ? `≈ ${(store.monthlyInterestRate * 100).toFixed(4)}% ամսական`
            : `= ${(store.monthlyInterestRate * 100 * 12).toFixed(2)}% տարեկան`
    )


    return {
        localValue,
        validationError,
        rateStep,
        rateHint,
        onInput,
        onTypeChange,
    }
}