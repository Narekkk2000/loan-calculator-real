import type { Currency } from '@/types/common'
import { CURRENCY_SYMBOLS } from '@/constants/currency'

export function formatCurrency(value: number, currency: Currency = 'USD', decimals = 2): string {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency
  return `${symbol} ${formatNumber(value, decimals)}`
}

export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatPercent(value: number, decimals = 2): string {
  return `${formatNumber(value, decimals)} %`
}

export function formatCompactCurrency(value: number, currency: Currency = 'USD'): string {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency
  const abs = Math.abs(value)

  if (abs >= 1_000_000) {
    return `${symbol}${formatNumber(value / 1_000_000, 1)}M`
  }

  if (abs >= 1_000) {
    return `${symbol}${formatNumber(value / 1_000, 0)}k`
  }

  return `${symbol}${formatNumber(value, 0)}`
}
