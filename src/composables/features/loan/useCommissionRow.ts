import { ref, watch } from 'vue'
import { useDebounce } from '@/composables/utils/useDebounce'
import { validatePositiveNumber } from '@/utils/validators'
import type { CommissionInput } from '@/types/loan'

export const useCommissionRow = (
    getValue: () => CommissionInput,
    setValue: (val: CommissionInput) => void,
) => {
    // Store

    const { debounce: debouncePercent } = useDebounce()
    const { debounce: debounceAmount } = useDebounce()

    // Local state

    const localPercent = ref(getValue().percent > 0 ? String(getValue().percent) : '')
    const localAmount  = ref(getValue().amount  > 0 ? String(getValue().amount)  : '')
    const percentError = ref('')
    const amountError  = ref('')

    watch(
        getValue,
        (val) => {
            localPercent.value = val.percent > 0 ? String(val.percent) : ''
            localAmount.value  = val.amount  > 0 ? String(val.amount)  : ''
        },
        { deep: true, immediate: false },
    )

    // Input handlers

    const onPercentInput = (val: string) => {
        localPercent.value = val
        percentError.value = val !== '' ? validatePositiveNumber(val) : ''
        if (percentError.value) return
        const n = parseFloat(val)
        debouncePercent(() => {
            setValue({ percent: isNaN(n) ? 0 : n, amount: getValue().amount })
        })
    }

    const onAmountInput = (val: string) => {
        localAmount.value = val
        amountError.value = val !== '' ? validatePositiveNumber(val) : ''
        if (amountError.value) return
        const n = parseFloat(val)
        debounceAmount(() => {
            setValue({ percent: getValue().percent, amount: isNaN(n) ? 0 : n })
        })
    }

    return {
        localPercent,
        localAmount,
        percentError,
        amountError,
        onPercentInput,
        onAmountInput,
    }
}