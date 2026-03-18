import { useLoanStore } from '@/stores/loanCalculator/loanCalculator'
import {useValidatedNumberField} from "@/composables/utils/useValidatedNumberField";
import {validateLoanAmount} from "@/utils/validators";
import {MAX_LOAN_AMOUNT} from "@/constants/validators";

export const useLoanAmount = () => {
    // Store

    const store = useLoanStore()

    // Validated field

    const { localValue, validationError, onInput } = useValidatedNumberField({
        source: () => store.loanAmount,
        commit: (n) => { store.loanAmount = n },
        validator: (val) => validateLoanAmount(val, MAX_LOAN_AMOUNT),
        parse: (val) => parseFloat(val.replace(/\./g, '')),
    })

    // Presets

    const isPresetActive = (preset: number) => store.loanAmount === preset

    const selectPreset = (preset: number) => {
        store.loanAmount = preset
        localValue.value = String(preset)
        validationError.value = ''
    }

    return {
        localValue,
        validationError,
        onInput,
        isPresetActive,
        selectPreset,
    }
}