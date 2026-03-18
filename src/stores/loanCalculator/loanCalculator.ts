import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  PaymentScheduleRow,
  LoanSummary,
  CommissionInput,
  LoanTermUnit,
  InterestRateType,
  RepaymentType,
} from '@/types/loan'

export const useLoanStore = defineStore('loanCalculator', () => {
  // ─── Input State ─────────────────────────────────────────────────────────────
  const loanAmount = ref<number>(500000)
  const loanTermValue = ref<number>(24)
  const loanTermUnit = ref<LoanTermUnit>('months')
  const interestRateValue = ref<number>(12)
  const interestRateType = ref<InterestRateType>('annual')
  const repaymentType = ref<RepaymentType>('annuity')
  const oneTimeCommission = ref<CommissionInput>({ percent: 0, amount: 0 })
  const monthlyCommission = ref<CommissionInput>({ percent: 0, amount: 0 })
  const annualCommission = ref<CommissionInput>({ percent: 0, amount: 0 })

  // ─── Derived: totalMonths ─────────────────────────────────────────────────────
  const totalMonths = computed<number>(() => {
    const val = loanTermUnit.value === 'years'
      ? Math.round(loanTermValue.value * 12)
      : Math.round(loanTermValue.value)
    return Math.max(1, val)
  })

  // ─── Derived: monthlyInterestRate ─────────────────────────────────────────────
  const monthlyInterestRate = computed<number>(() => {
    if (interestRateType.value === 'annual') {
      return interestRateValue.value / 100 / 12
    }
    return interestRateValue.value / 100
  })

  // ─── Derived: schedule ───────────────────────────────────────────────────────
  const schedule = computed<PaymentScheduleRow[]>(() => {
    const n = totalMonths.value
    const r = monthlyInterestRate.value
    const principal = loanAmount.value

    if (n <= 0 || principal <= 0) return []

    const rows: PaymentScheduleRow[] = []
    let balance = principal

    // Annuity fixed payment
    let annuityPayment = 0
    if (repaymentType.value === 'annuity') {
      if (r === 0) {
        annuityPayment = principal / n
      } else {
        const pow = Math.pow(1 + r, n)
        annuityPayment = (principal * r * pow) / (pow - 1)
      }
    }

    // Differentiated: fixed principal chunk
    const diffPrincipalChunk = principal / n

    for (let month = 1; month <= n; month++) {
      const interestAmount = balance * r
      let principalAmount: number
      let paymentAmount: number

      if (repaymentType.value === 'annuity') {
        principalAmount = annuityPayment - interestAmount
        paymentAmount = annuityPayment
      } else {
        principalAmount = diffPrincipalChunk
        paymentAmount = principalAmount + interestAmount
      }

      // Last month: absorb any floating-point residual
      if (month === n) {
        principalAmount = balance
        if (repaymentType.value === 'differentiated') {
          paymentAmount = principalAmount + interestAmount
        }
      }

      balance = Math.max(0, balance - principalAmount)

      // ── Commissions ────────────────────────────────────────────────────────
      // One-time: month 1 only
      const oneTime =
        month === 1
          ? oneTimeCommission.value.percent > 0
            ? (principal * oneTimeCommission.value.percent) / 100
            : oneTimeCommission.value.amount
          : 0

      // Monthly: every month
      const monthly =
        monthlyCommission.value.percent > 0
          ? (principal * monthlyCommission.value.percent) / 100
          : monthlyCommission.value.amount

      // Annual: months 1, 13, 25 …
      const isAnnualMonth = (month - 1) % 12 === 0
      const annual = isAnnualMonth
        ? annualCommission.value.percent > 0
          ? (principal * annualCommission.value.percent) / 100
          : annualCommission.value.amount
        : 0

      const totalCommissions = oneTime + monthly + annual

      rows.push({
        month,
        payment: paymentAmount,
        principal: principalAmount,
        interest: interestAmount,
        oneTimeCommission: oneTime,
        monthlyCommission: monthly,
        annualCommission: annual,
        totalCommissions,
        balance,
      })
    }

    return rows
  })

  // ─── Derived: summary ─────────────────────────────────────────────────────────
  const summary = computed<LoanSummary>(() => {
    const empty: LoanSummary = {
      totalPayment: 0,
      totalPrincipal: 0,
      totalInterest: 0,
      totalCommissions: 0,
      totalOverpayment: 0,
      firstMonthPayment: 0,
      lastMonthPayment: 0,
      effectiveRate: 0,
    }
    if (schedule.value.length === 0) return empty

    const totalPrincipal = loanAmount.value
    const totalInterest = schedule.value.reduce((s, r) => s + r.interest, 0)
    const totalCommissions = schedule.value.reduce((s, r) => s + r.totalCommissions, 0)
    const totalPayment = totalPrincipal + totalInterest + totalCommissions
    const totalOverpayment = totalInterest + totalCommissions

    const firstRow = schedule.value[0]
    const lastRow = schedule.value[schedule.value.length - 1]
    const firstMonthPayment = firstRow.payment + firstRow.totalCommissions
    const lastMonthPayment = lastRow.payment + lastRow.totalCommissions

    const n = totalMonths.value
    const effectiveRate =
      n > 0 && totalPrincipal > 0
        ? (totalOverpayment / totalPrincipal / (n / 12)) * 100
        : 0


    return {
      totalPayment,
      totalPrincipal,
      totalInterest,
      totalCommissions,
      totalOverpayment,
      firstMonthPayment,
      lastMonthPayment,
      effectiveRate,
    }
  })

  return {
    // State
    loanAmount,
    loanTermValue,
    loanTermUnit,
    interestRateValue,
    interestRateType,
    repaymentType,
    oneTimeCommission,
    monthlyCommission,
    annualCommission,
    // Getters
    totalMonths,
    monthlyInterestRate,
    schedule,
    summary,
  }
})
