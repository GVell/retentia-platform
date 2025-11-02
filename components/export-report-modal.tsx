"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, FileSpreadsheet, FileText, Presentation } from "lucide-react"

type ExportReportModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function ExportReportModal({ isOpen, onClose }: ExportReportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<"excel" | "pdf" | "ppt" | null>(null)
  const [includeCharts, setIncludeCharts] = useState(false)
  const [includeAllEmployees, setIncludeAllEmployees] = useState(false)
  const [includeHighRiskOnly, setIncludeHighRiskOnly] = useState(true)
  const [includeHistory, setIncludeHistory] = useState(false)
  const [period, setPeriod] = useState("6-months")
  const [showSuccess, setShowSuccess] = useState(false)

  if (!isOpen) return null

  const handleExport = () => {
    if (!selectedFormat) return

    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      onClose()
      // Reset form
      setSelectedFormat(null)
      setIncludeCharts(false)
      setIncludeAllEmployees(false)
      setIncludeHighRiskOnly(true)
      setIncludeHistory(false)
      setPeriod("6-months")
    }, 2000)
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-200" onClick={onClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl animate-in zoom-in-95 duration-200">
        <Card className="bg-background border-border shadow-2xl">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Exportar Relatório</h2>
                <p className="text-sm text-muted-foreground">Escolha o formato para download</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Export Format Options */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Excel/CSV */}
              <Card
                className={`cursor-pointer transition-all hover:border-[#10b981] ${
                  selectedFormat === "excel" ? "border-[#10b981] border-2 bg-[#10b981]/5" : ""
                }`}
                onClick={() => setSelectedFormat("excel")}
              >
                <CardContent className="p-4 text-center">
                  <FileSpreadsheet className="w-12 h-12 mx-auto mb-3 text-[#10b981]" />
                  <h3 className="font-semibold text-foreground mb-1">Excel / CSV</h3>
                  <p className="text-xs text-muted-foreground mb-2">Planilha editável com todos os dados</p>
                  <p className="text-xs text-muted-foreground font-medium">~250 KB</p>
                  {selectedFormat === "excel" && (
                    <Button size="sm" className="mt-3 w-full bg-[#10b981] hover:bg-[#059669]">
                      Exportar como Excel
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* PDF */}
              <Card
                className={`cursor-pointer transition-all hover:border-[#ef4444] ${
                  selectedFormat === "pdf" ? "border-[#ef4444] border-2 bg-[#ef4444]/5" : ""
                }`}
                onClick={() => setSelectedFormat("pdf")}
              >
                <CardContent className="p-4 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-[#ef4444]" />
                  <h3 className="font-semibold text-foreground mb-1">Relatório PDF</h3>
                  <p className="text-xs text-muted-foreground mb-2">Documento formatado para apresentação</p>
                  <p className="text-xs text-muted-foreground font-medium">~1.2 MB</p>
                  {selectedFormat === "pdf" && (
                    <Button size="sm" className="mt-3 w-full bg-[#ef4444] hover:bg-[#dc2626]">
                      Exportar como PDF
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* PowerPoint */}
              <Card
                className={`cursor-pointer transition-all hover:border-[#f59e0b] ${
                  selectedFormat === "ppt" ? "border-[#f59e0b] border-2 bg-[#f59e0b]/5" : ""
                }`}
                onClick={() => setSelectedFormat("ppt")}
              >
                <CardContent className="p-4 text-center">
                  <Presentation className="w-12 h-12 mx-auto mb-3 text-[#f59e0b]" />
                  <h3 className="font-semibold text-foreground mb-1">Apresentação PPT</h3>
                  <p className="text-xs text-muted-foreground mb-2">Slides prontos para executivos</p>
                  <p className="text-xs text-muted-foreground font-medium">~800 KB</p>
                  {selectedFormat === "ppt" && (
                    <Button size="sm" className="mt-3 w-full bg-[#f59e0b] hover:bg-[#d97706]">
                      Exportar como PPT
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Options Section */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-foreground">Opções de Conteúdo</h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="charts"
                    checked={includeCharts}
                    onCheckedChange={(checked) => setIncludeCharts(checked as boolean)}
                  />
                  <label htmlFor="charts" className="text-sm text-foreground cursor-pointer">
                    Incluir gráficos e visualizações
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="all-employees"
                    checked={includeAllEmployees}
                    onCheckedChange={(checked) => setIncludeAllEmployees(checked as boolean)}
                  />
                  <label htmlFor="all-employees" className="text-sm text-foreground cursor-pointer">
                    Incluir lista completa de colaboradores
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="high-risk"
                    checked={includeHighRiskOnly}
                    onCheckedChange={(checked) => setIncludeHighRiskOnly(checked as boolean)}
                  />
                  <label htmlFor="high-risk" className="text-sm text-foreground cursor-pointer">
                    Incluir apenas colaboradores de alto risco
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="history"
                    checked={includeHistory}
                    onCheckedChange={(checked) => setIncludeHistory(checked as boolean)}
                  />
                  <label htmlFor="history" className="text-sm text-foreground cursor-pointer">
                    Incluir histórico de ações
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <label className="text-sm text-foreground mb-2 block">Período</label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-month">Último mês</SelectItem>
                    <SelectItem value="3-months">Últimos 3 meses</SelectItem>
                    <SelectItem value="6-months">Últimos 6 meses</SelectItem>
                    <SelectItem value="1-year">Último ano</SelectItem>
                    <SelectItem value="all">Todo o período</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button className="bg-[#6366f1] hover:bg-[#5558e3]" disabled={!selectedFormat} onClick={handleExport}>
                Gerar Relatório
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 z-[60] animate-in slide-in-from-bottom-5 duration-300">
          <Card className="bg-[#10b981] border-[#10b981] text-white shadow-lg">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</div>
              <div>
                <p className="font-semibold">Relatório gerado!</p>
                <p className="text-sm text-white/90">Download iniciado.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
