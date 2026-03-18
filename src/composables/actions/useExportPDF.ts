import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { useLoanStore } from '@/stores/loanCalculator/loanCalculator'
import { formatCurrency, formatPercent } from '@/utils/format'

export function useExportPDF() {
    const store = useLoanStore()

    async function captureElement(el: HTMLElement): Promise<string> {
        const canvas = await html2canvas(el, {
            scale: 2,
            backgroundColor: '#0e1420',
            useCORS: true,
            logging: false,
        })
        return canvas.toDataURL('image/png')
    }

    async function exportPDF(
        summaryRef: HTMLElement | null,
        paymentChartRef: HTMLElement | null,
        balanceChartRef: HTMLElement | null,
    ) {
        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
        const ps = doc.internal.pageSize
        const pageW: number = typeof ps.getWidth === 'function' ? ps.getWidth() : (ps as any).width
        const pageH: number = typeof ps.getHeight === 'function' ? ps.getHeight() : (ps as any).height
        const margin = 15
        const contentW = pageW - margin * 2
        let y = margin

        const drawHRule = (yPos: number) => {
            doc.setDrawColor(59, 130, 246)
            doc.setLineWidth(0.3)
            doc.line(margin, yPos, pageW - margin, yPos)
        }

        // ── Header ────────────────────────────────────────────────────────────────
        doc.setFillColor(8, 11, 20)
        doc.rect(0, 0, pageW, pageH, 'F')

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(22)
        doc.setTextColor(59, 130, 246)
        doc.text('Loan Calculation Report', pageW / 2, y + 8, { align: 'center' })
        y += 14

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        doc.setTextColor(100, 116, 139)
        doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}`, pageW / 2, y, { align: 'center' })
        y += 6

        drawHRule(y)
        y += 6

        // ── Loan Parameters ───────────────────────────────────────────────────────
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11)
        doc.setTextColor(240, 244, 255)
        doc.text('Loan Parameters', margin, y)
        y += 5

        const params = [
            ['Loan Amount', formatCurrency(store.loanAmount)],
            ['Loan Term', `${store.loanTermValue} ${store.loanTermUnit}`],
            ['Interest Rate', `${store.interestRateValue}% (${store.interestRateType})`],
            ['Repayment Type', store.repaymentType.charAt(0).toUpperCase() + store.repaymentType.slice(1)],
        ]

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        const colW = contentW / 2
        params.forEach(([label, val], i) => {
            const col = i % 2
            const row = Math.floor(i / 2)
            const x = margin + col * colW
            const py = y + row * 6
            doc.setTextColor(100, 116, 139)
            doc.text(label + ':', x, py)
            doc.setTextColor(240, 244, 255)
            doc.text(val, x + 38, py)
        })
        y += Math.ceil(params.length / 2) * 6 + 4

        drawHRule(y)
        y += 6

        // ── Summary ───────────────────────────────────────────────────────────────
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11)
        doc.setTextColor(240, 244, 255)
        doc.text('Summary', margin, y)
        y += 5

        const s = store.summary
        const summaryRows = [
            ['Total Payment', formatCurrency(s.totalPayment), 'Total Principal', formatCurrency(s.totalPrincipal)],
            ['Total Interest', formatCurrency(s.totalInterest), 'Total Commissions', formatCurrency(s.totalCommissions)],
            ['Total Overpayment', formatCurrency(s.totalOverpayment), 'Effective Rate', formatPercent(s.effectiveRate)],
            ['First Month Payment', formatCurrency(s.firstMonthPayment), 'Last Month Payment', formatCurrency(s.lastMonthPayment)],
        ]

        doc.setFontSize(9)
        summaryRows.forEach((row) => {
            doc.setTextColor(100, 116, 139)
            doc.text(row[0] + ':', margin, y)
            doc.setTextColor(240, 244, 255)
            doc.text(row[1], margin + 42, y)
            doc.setTextColor(100, 116, 139)
            doc.text(row[2] + ':', margin + contentW / 2, y)
            doc.setTextColor(240, 244, 255)
            doc.text(row[3], margin + contentW / 2 + 42, y)
            y += 6
        })
        y += 2
        drawHRule(y)
        y += 6

        // ── Summary Cards Screenshot ──────────────────────────────────────────────
        if (summaryRef) {
            try {
                const img = await captureElement(summaryRef)
                const ratio = summaryRef.offsetHeight / summaryRef.offsetWidth
                const imgW = contentW
                const imgH = imgW * ratio
                if (y + imgH > pageH - margin) { doc.addPage(); y = margin }
                doc.addImage(img, 'PNG', margin, y, imgW, Math.min(imgH, 60))
                y += Math.min(imgH, 60) + 4
            } catch (_) { /* skip if capture fails */ }
        }

        // ── Payment Chart ─────────────────────────────────────────────────────────
        if (paymentChartRef) {
            try {
                doc.setFont('helvetica', 'bold')
                doc.setFontSize(10)
                doc.setTextColor(240, 244, 255)
                doc.text('Payment Breakdown (Principal / Interest / Commissions)', margin, y)
                y += 5

                const img = await captureElement(paymentChartRef)
                const ratio = paymentChartRef.offsetHeight / paymentChartRef.offsetWidth
                const imgH = contentW * ratio
                if (y + imgH > pageH - margin) { doc.addPage(); y = margin }
                doc.addImage(img, 'PNG', margin, y, contentW, imgH)
                y += imgH + 6
            } catch (_) { /* skip */ }
        }

        // ── Balance Chart ─────────────────────────────────────────────────────────
        if (balanceChartRef) {
            try {
                doc.setFont('helvetica', 'bold')
                doc.setFontSize(10)
                doc.setTextColor(240, 244, 255)
                doc.text('Remaining Balance Over Time', margin, y)
                y += 5

                const img = await captureElement(balanceChartRef)
                const ratio = balanceChartRef.offsetHeight / balanceChartRef.offsetWidth
                const imgH = contentW * ratio
                if (y + imgH > pageH - margin) { doc.addPage(); y = margin }
                doc.addImage(img, 'PNG', margin, y, contentW, imgH)
                y += imgH + 6
            } catch (_) { /* skip */ }
        }

        // ── First-page amortization table ─────────────────────────────────────────
        doc.addPage()
        y = margin

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(12)
        doc.setTextColor(59, 130, 246)
        doc.text('Amortization Schedule (First 20 Rows)', margin, y)
        y += 6
        drawHRule(y)
        y += 5

        const headers = ['Month', 'Payment', 'Principal', 'Interest', 'Commissions', 'Balance']
        const colWidths = [16, 32, 32, 28, 32, 36]
        const rowHeight = 5.5

        // Header row
        doc.setFillColor(14, 20, 32)
        doc.rect(margin, y - 3.5, contentW, rowHeight, 'F')
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(8)
        doc.setTextColor(100, 116, 139)
        let cx = margin
        headers.forEach((h, i) => {
            doc.text(h, cx + 1, y)
            cx += colWidths[i]
        })
        y += rowHeight

        // Data rows (first 20)
        const rows = store.schedule.slice(0, 20)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)

        rows.forEach((row, ri) => {
            if (ri % 2 === 0) {
                doc.setFillColor(10, 14, 24)
                doc.rect(margin, y - 3.5, contentW, rowHeight, 'F')
            }
            doc.setTextColor(240, 244, 255)
            const cells = [
                String(row.month),
                formatCurrency(row.payment, 0),
                formatCurrency(row.principal, 0),
                formatCurrency(row.interest, 0),
                formatCurrency(row.totalCommissions, 0),
                formatCurrency(row.balance, 0),
            ]
            cx = margin
            cells.forEach((cell, i) => {
                doc.text(cell, cx + 1, y)
                cx += colWidths[i]
            })
            y += rowHeight
        })

        // Footer
        doc.setFont('helvetica', 'italic')
        doc.setFontSize(8)
        doc.setTextColor(100, 116, 139)
        doc.text(
            `Showing first 20 of ${store.schedule.length} rows`,
            margin,
            y + 4,
        )

        doc.save('loan-calculation.pdf')
    }

    return { exportPDF }
}
