"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Star } from "lucide-react"
import type { Employee } from "@/app/page"
import { Line } from "react-chartjs-2"
import { getRiskLevel, getRiskLabel, getRiskColor, getRiskBgColor } from "@/lib/risk-utils"

type EmployeeProfileProps = {
  employee: Employee
  onBack: () => void
  onViewRecommendations: () => void
}

export default function EmployeeProfile({ employee, onBack, onViewRecommendations }: EmployeeProfileProps) {
  const riskLevel = getRiskLevel(employee.score)
  const riskLabel = getRiskLabel(riskLevel)
  const riskColor = getRiskColor(riskLevel)
  const riskBgColor = getRiskBgColor(riskLevel)

  const scoreEvolutionData = {
    labels: ["Mai", "Jun", "Jul", "Ago", "Set", "Out"],
    datasets: [
      {
        label: "Score de Risco",
        data: [60, 65, 72, 78, 82, employee.score],
        borderColor: riskColor,
        backgroundColor: `${riskColor}1A`,
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const salaryDiff = employee.marketSalary - employee.salary
  const salaryDiffPercent = Math.round((salaryDiff / employee.marketSalary) * 100)

  return (
    <div className="p-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="gap-2 mb-4 hover:bg-accent transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-foreground">{employee.name}</h1>
        <p className="text-muted-foreground mt-1">Perfil detalhado e análise de risco</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  src={employee.avatar || "/placeholder.svg"}
                  alt={employee.name}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-border"
                />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-1">{employee.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">{employee.email}</p>
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary" className="font-medium">
                  {employee.role}
                </Badge>
                <Badge variant="secondary" className="font-medium">
                  {employee.department}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{employee.tenure} meses na empresa</p>
              <div className="w-full rounded-xl p-6 mb-4 shadow-inner" style={{ backgroundColor: `${riskColor}1A` }}>
                <div className="text-[96px] font-bold leading-none" style={{ color: riskColor }}>
                  {employee.score}
                </div>
              </div>
              <Badge className={`${riskBgColor} text-white animate-pulse font-semibold px-4 py-1.5`}>
                {riskLabel.toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Evolução do Score - Últimos 6 Meses</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px]">
              <Line
                data={scoreEvolutionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Fatores de Risco Identificados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900 shadow-sm">
                <div className="text-2xl">🔴</div>
                <div className="flex-1">
                  <div className="font-semibold text-[#ef4444] mb-1">ALTO IMPACTO</div>
                  <p className="text-sm text-foreground leading-relaxed">
                    Salário {salaryDiffPercent}% abaixo do mercado
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-xl border border-yellow-200 dark:border-yellow-900 shadow-sm">
                <div className="text-2xl">🟡</div>
                <div className="flex-1">
                  <div className="font-semibold text-[#f59e0b] mb-1">MÉDIO IMPACTO</div>
                  <p className="text-sm text-foreground leading-relaxed">{employee.lastPromotion} meses sem promoção</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-xl border border-yellow-200 dark:border-yellow-900 shadow-sm">
                <div className="text-2xl">🟡</div>
                <div className="flex-1">
                  <div className="font-semibold text-[#f59e0b] mb-1">MÉDIO IMPACTO</div>
                  <p className="text-sm text-foreground leading-relaxed">Engajamento baixo ({employee.engagement}%)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mb-6 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Dados Profissionais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Avaliação</p>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 transition-colors ${
                      star <= Math.floor(employee.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-lg font-semibold text-foreground ml-2">{employee.rating}/5</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Engajamento</p>
              <div className="flex items-center gap-3">
                <Progress value={employee.engagement} className="flex-1 h-3" />
                <span className="text-lg font-semibold text-foreground min-w-[3rem]">{employee.engagement}%</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Última Promoção</p>
              <p className="text-lg font-semibold text-foreground">Há {employee.lastPromotion} meses</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Salário</p>
              <p className="text-lg font-semibold text-foreground">R$ {employee.salary.toLocaleString("pt-BR")}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Mercado: R$ {employee.marketSalary.toLocaleString("pt-BR")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={onViewRecommendations}
        className="w-full bg-[#6366f1] hover:bg-[#5558e3] text-white text-lg py-6 shadow-sm hover:shadow-md transition-all duration-200"
      >
        Ver Ações Recomendadas →
      </Button>
    </div>
  )
}
