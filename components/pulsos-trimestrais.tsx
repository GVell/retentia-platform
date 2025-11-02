"use client"

import { useState } from "react"
import { Calendar, TrendingUp, CheckCircle2, Clock, Play } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type QuarterlyPulse = {
  quarter: string
  year: number
  responseRate: number
  responded: number
  total: number
  status: "completed" | "in-progress" | "scheduled"
  date: string
}

export default function PulsosTrimestrais() {
  const [showNewPulseModal, setShowNewPulseModal] = useState(false)

  const pulses: QuarterlyPulse[] = [
    {
      quarter: "Q1",
      year: 2025,
      responseRate: 87,
      responded: 131,
      total: 150,
      status: "completed",
      date: "15/03/2025",
    },
    {
      quarter: "Q2",
      year: 2025,
      responseRate: 91,
      responded: 137,
      total: 150,
      status: "completed",
      date: "15/06/2025",
    },
    {
      quarter: "Q3",
      year: 2025,
      responseRate: 82,
      responded: 123,
      total: 150,
      status: "completed",
      date: "15/09/2025",
    },
  ]

  const nextPulse = {
    quarter: "Q4",
    year: 2025,
    scheduledDate: "15/12/2025",
    daysUntil: 45,
  }

  const getStatusBadge = (status: string) => {
    if (status === "completed") {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Concluído
        </Badge>
      )
    }
    if (status === "in-progress") {
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          <Clock className="w-3 h-3 mr-1" />
          Em Andamento
        </Badge>
      )
    }
    return (
      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
        <Calendar className="w-3 h-3 mr-1" />
        Agendado
      </Badge>
    )
  }

  const getResponseRateColor = (rate: number) => {
    if (rate >= 90) return "text-green-600"
    if (rate >= 80) return "text-indigo-600"
    if (rate >= 70) return "text-amber-600"
    return "text-red-600"
  }

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Last Pulse Card */}
        <Card className="p-6 shadow-lg bg-white border-l-4 border-l-indigo-500">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">Último Pulso</h3>
              <p className="text-sm text-muted-foreground">Trimestre mais recente</p>
            </div>
            <TrendingUp className="w-8 h-8 text-indigo-500" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gray-900">Q3 2025</span>
                {getStatusBadge("completed")}
              </div>
              <p className="text-sm text-muted-foreground">Concluído em 15/09/2025</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Taxa de Resposta</span>
                <span className={`text-2xl font-bold ${getResponseRateColor(82)}`}>82%</span>
              </div>
              <Progress value={82} className="h-2 [&>div]:bg-indigo-500" />
              <p className="text-xs text-muted-foreground mt-2">123 de 150 colaboradores</p>
            </div>
          </div>
        </Card>

        {/* Next Pulse Card */}
        <Card className="p-6 shadow-lg bg-white border-l-4 border-l-green-500">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">Próximo Pulso</h3>
              <p className="text-sm text-muted-foreground">Agendado</p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gray-900">
                  {nextPulse.quarter} {nextPulse.year}
                </span>
                {getStatusBadge("scheduled")}
              </div>
              <p className="text-sm text-muted-foreground">Data: {nextPulse.scheduledDate}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-900">Faltam {nextPulse.daysUntil} dias</span>
              </div>
              <p className="text-sm text-green-700">O questionário será enviado automaticamente</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Historical Table */}
      <Card className="p-6 shadow-lg bg-white mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Histórico de Pulsos</h3>
            <p className="text-sm text-muted-foreground">Acompanhe a evolução das taxas de resposta</p>
          </div>
          <Button onClick={() => setShowNewPulseModal(true)} className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Iniciar Novo Pulso
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Período</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Data</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Respostas</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Taxa</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Progresso</th>
              </tr>
            </thead>
            <tbody>
              {pulses.map((pulse) => (
                <tr
                  key={`${pulse.quarter}-${pulse.year}`}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900">
                      {pulse.quarter} {pulse.year}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">{pulse.date}</span>
                  </td>
                  <td className="py-4 px-4">{getStatusBadge(pulse.status)}</td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-700">
                      {pulse.responded}/{pulse.total}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-lg font-bold ${getResponseRateColor(pulse.responseRate)}`}>
                      {pulse.responseRate}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-32">
                      <Progress value={pulse.responseRate} className="h-2 [&>div]:bg-indigo-500" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Insights Card */}
      <Card className="p-6 shadow-lg bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Análise de Tendência</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              A taxa de resposta teve uma queda de 9% entre Q2 e Q3. Considere enviar lembretes adicionais ou ajustar o
              timing do próximo pulso para melhorar o engajamento.
            </p>
          </div>
        </div>
      </Card>

      {/* New Pulse Modal */}
      {showNewPulseModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowNewPulseModal(false)}
        >
          <Card className="p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Iniciar Novo Pulso</h3>
              <button
                onClick={() => setShowNewPulseModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Deseja iniciar um novo pulso trimestral agora? O questionário será enviado para todos os 150
              colaboradores.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-800">
                <strong>Atenção:</strong> O próximo pulso já está agendado para {nextPulse.scheduledDate}. Iniciar um
                novo pulso agora irá substituir o agendamento.
              </p>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowNewPulseModal(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowNewPulseModal(false)} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Confirmar e Iniciar
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
