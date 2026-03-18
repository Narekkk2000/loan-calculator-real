import type { LoanTermUnit, InterestRateType, RepaymentType } from '@/types/loan'

// ─── Loan Amount ─────────────────────────────────────────────────────────────

export const LOAN_AMOUNT_PRESETS = [50000, 100000, 250000, 500000, 1000000] as const

// ─── Loan Term ───────────────────────────────────────────────────────────────

export const TERM_UNIT_OPTIONS: { value: LoanTermUnit; label: string }[] = [
  { value: 'months', label: 'Ամիսներ' },
  { value: 'years', label: 'Տարիներ' },
]

export const LOAN_TERM_PRESETS = [3, 6, 12, 24, 36, 60] as const

// ─── Interest Rate ────────────────────────────────────────────────────────────

export const INTEREST_RATE_TYPE_OPTIONS: { value: InterestRateType; label: string }[] = [
  { value: 'annual', label: 'Տարեկան' },
  { value: 'monthly', label: 'Ամսական' },
]

// ─── Repayment Type ───────────────────────────────────────────────────────────

export interface RepaymentTypeOption {
  value: RepaymentType
  icon: string
  title: string
  description: string
  bullets: string[]
}

export const REPAYMENT_TYPE_OPTIONS: RepaymentTypeOption[] = [
  {
    value: 'annuity',
    icon: '◈',
    title: 'Տարեկան',
    description: 'Հավասարաչափ ամսական վճարումներ վարկի ամբողջ ժամկետի ընթացքում։',
    bullets: ['Fixed payment amount', 'Predictable budgeting', 'Higher total interest'],
  },
  {
    value: 'differentiated',
    icon: '◉',
    title: 'Դիֆերենցված',
    description: 'Վճարումները նվազում են, քանի որ գլխավոր գումարը նվազում է ամեն ամիս։',
    bullets: ['Higher initial payments', 'Lower total interest', 'Balance paid faster'],
  },
]
