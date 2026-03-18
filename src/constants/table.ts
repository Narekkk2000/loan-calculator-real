// ─── Amortization Schedule Table ─────────────────────────────────────────────

export interface ScheduleColumn {
  key: string
  label: string
  align: 'left' | 'right'
}

export const SCHEDULE_COLUMNS: ScheduleColumn[] = [
  { key: 'month',            label: 'Ամիս',       align: 'left'  },
  { key: 'payment',          label: 'Վճարում',     align: 'right' },
  { key: 'principal',        label: 'Գումար',   align: 'right' },
  { key: 'interest',         label: 'Տոկոս',    align: 'right' },
  { key: 'totalCommissions', label: 'Միջնորդավճարներ', align: 'right' },
  { key: 'balance',          label: 'Մնացորդ',     align: 'right' },
]
