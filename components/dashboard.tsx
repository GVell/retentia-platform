"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileDown, Plus, TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react"
import type { Employee } from "@/app/page"
import { Doughnut, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import ExportReportModal from "./export-report-modal"
import NewActionModal from "./new-action-modal"
import { getRiskLevel, getRiskBgColor } from "@/lib/risk-utils"

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

type DashboardProps = {
  onEmployeeClick: (employee: Employee) => void
  onNavigateToEmployees: (riskFilter: string) => void
  onNavigateToActions: (tab: string) => void
}

const employees: Employee[] = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@empresa.com",
    role: "Analista de Marketing",
    department: "Marketing",
    score: 85,
    causes: ["Salário", "Estagnação"],
    avatar: "/diverse-woman-portrait.png",
    tenure: 20,
    rating: 3.2,
    engagement: 45,
    lastPromotion: 20,
    salary: 4500,
    marketSalary: 6000,
  },
  {
    id: 2,
    name: "Carlos Mendes",
    email: "carlos.mendes@empresa.com",
    role: "Desenvolvedor Sênior",
    department: "TI",
    score: 78,
    causes: ["Salário"],
    avatar: "/man.jpg",
    tenure: 18,
    rating: 4.0,
    engagement: 55,
    lastPromotion: 15,
    salary: 8000,
    marketSalary: 10000,
  },
  {
    id: 3,
    name: "Mariana Costa",
    email: "mariana.costa@empresa.com",
    role: "Coordenadora Vendas",
    department: "Vendas",
    score: 76,
    causes: ["Liderança", "Avaliação"],
    avatar: "/professional-woman.png",
    tenure: 24,
    rating: 3.5,
    engagement: 50,
    lastPromotion: 18,
    salary: 7000,
    marketSalary: 8500,
  },
  {
    id: 4,
    name: "Pedro Santos",
    email: "pedro.santos@empresa.com",
    role: "Designer UX",
    department: "Produto",
    score: 74,
    causes: ["Adaptação"],
    avatar: "/man-designer.jpg",
    tenure: 12,
    rating: 3.8,
    engagement: 48,
    lastPromotion: 12,
    salary: 5500,
    marketSalary: 6500,
  },
  {
    id: 5,
    name: "Juliana Oliveira",
    email: "juliana.oliveira@empresa.com",
    role: "Analista RH",
    department: "RH",
    score: 72,
    causes: ["Estagnação"],
    avatar: "/woman-hr.jpg",
    tenure: 22,
    rating: 3.6,
    engagement: 52,
    lastPromotion: 22,
    salary: 4800,
    marketSalary: 5800,
  },
  {
    id: 6,
    name: "Roberto Lima",
    email: "roberto.lima@empresa.com",
    role: "Analista Financeiro",
    department: "Financeiro",
    score: 71,
    causes: ["Salário"],
    avatar: "/man-finance.jpg",
    tenure: 16,
    rating: 3.9,
    engagement: 54,
    lastPromotion: 14,
    salary: 5200,
    marketSalary: 6800,
  },
  {
    id: 7,
    name: "Lucas Ferreira",
    email: "lucas.ferreira@empresa.com",
    role: "Analista Suporte",
    department: "TI",
    score: 70,
    causes: ["Adaptação", "Salário"],
    avatar: "/man-support.jpg",
    tenure: 14,
    rating: 3.4,
    engagement: 46,
    lastPromotion: 14,
    salary: 4200,
    marketSalary: 5500,
  },
  {
    id: 8,
    name: "Fernanda Rocha",
    email: "fernanda.rocha@empresa.com",
    role: "Gerente de Projetos",
    department: "Operações",
    score: 69,
    causes: ["Liderança"],
    avatar: "/woman-manager.jpg",
    tenure: 26,
    rating: 3.7,
    engagement: 51,
    lastPromotion: 19,
    salary: 8500,
    marketSalary: 10000,
  },
  {
    id: 9,
    name: "Ricardo Alves",
    email: "ricardo.alves@empresa.com",
    role: "Analista de Dados",
    department: "TI",
    score: 68,
    causes: ["Estagnação", "Salário"],
    avatar: "/man-data.jpg",
    tenure: 17,
    rating: 4.1,
    engagement: 56,
    lastPromotion: 17,
    salary: 6500,
    marketSalary: 8000,
  },
  {
    id: 10,
    name: "Camila Souza",
    email: "camila.souza@empresa.com",
    role: "Coordenadora Marketing",
    department: "Marketing",
    score: 67,
    causes: ["Avaliação"],
    avatar: "/woman-coordinator.jpg",
    tenure: 21,
    rating: 3.3,
    engagement: 47,
    lastPromotion: 16,
    salary: 6800,
    marketSalary: 8200,
  },
]

export default function Dashboard({ onEmployeeClick, onNavigateToEmployees, onNavigateToActions }: DashboardProps) {
  const [showExportModal, setShowExportModal] = useState(false)
  const [showNewActionModal, setShowNewActionModal] = useState(false)

  const doughnutData = {
    labels: ["Crítico", "Em Risco", "Estável", "Engajado"],
    datasets: [
      {
        data: [12, 18, 15, 105],
        backgroundColor: ["#ef4444", "#f97316", "#eab308", "#22c55e"],
        borderWidth: 0,
      },
    ],
  }

  const barData = {
    labels: ["Mai", "Jun", "Jul", "Ago", "Set", "Out"],
    datasets: [
      {
        label: "Engajado",
        data: [112, 107, 107, 103, 105, 105],
        backgroundColor: "#22c55e",
      },
      {
        label: "Estável",
        data: [14, 15, 16, 15, 16, 15],
        backgroundColor: "#eab308",
      },
      {
        label: "Em Risco",
        data: [16, 18, 17, 20, 19, 18],
        backgroundColor: "#f97316",
      },
      {
        label: "Crítico",
        data: [8, 10, 10, 12, 10, 12],
        backgroundColor: "#ef4444",
      },
    ],
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Dashboard Geral</h1>
          <p className="text-muted-foreground">Visão geral dos indicadores de retenção</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setShowExportModal(true)}>
            <FileDown className="w-4 h-4" />
            Exportar Relatório
          </Button>
          <Button
            className="gap-2 bg-[#6366f1] hover:bg-[#5558e3] shadow-sm"
            onClick={() => setShowNewActionModal(true)}
          >
            <Plus className="w-4 h-4" />
            Nova Ação
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card
          className="bg-red-50 border-red-200 shadow-sm hover:shadow-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] group relative overflow-hidden"
          onClick={() => onNavigateToEmployees("critico")}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Crítico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-foreground">12</div>
              <div className="flex items-center gap-1 text-[#ef4444] text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                +15%
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </CardContent>
        </Card>

        <Card
          className="bg-orange-50 border-orange-200 shadow-sm hover:shadow-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] group relative overflow-hidden"
          onClick={() => onNavigateToEmployees("em-risco")}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Em Risco</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-foreground">18</div>
              <div className="flex items-center gap-1 text-[#f97316] text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                +8%
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </CardContent>
        </Card>

        <Card
          className="bg-yellow-50 border-yellow-200 shadow-sm hover:shadow-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] group relative overflow-hidden"
          onClick={() => onNavigateToEmployees("estavel")}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Estável</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-foreground">15</div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm font-semibold">
                <Minus className="w-4 h-4" />
                0%
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </CardContent>
        </Card>

        <Card
          className="bg-green-50 border-green-200 shadow-sm hover:shadow-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] group relative overflow-hidden"
          onClick={() => onNavigateToEmployees("engajado")}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Engajado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-foreground">105</div>
              <div className="flex items-center gap-1 text-[#22c55e] text-sm font-semibold">
                <TrendingDown className="w-4 h-4" />
                -2%
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Distribuição de Engajamento</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px]">
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Evolução dos Últimos 6 Meses</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true,
                    beginAtZero: true,
                    max: 150,
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Colaboradores de Alto Risco</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Nome</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Cargo</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Departamento</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Score</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Causas</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => {
                  const riskLevel = getRiskLevel(employee.score)
                  const riskBgColor = getRiskBgColor(riskLevel)

                  return (
                    <tr
                      key={employee.id}
                      onClick={() => onEmployeeClick(employee)}
                      className="border-b border-border last:border-0 hover:bg-accent/50 cursor-pointer transition-colors duration-150"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={employee.avatar || "/placeholder.svg"}
                            alt={employee.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
                          />
                          <span className="font-medium text-foreground">{employee.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-foreground">{employee.role}</td>
                      <td className="py-4 px-4 text-sm text-foreground">{employee.department}</td>
                      <td className="py-4 px-4">
                        <div className="space-y-2 min-w-[100px]">
                          <Badge className={`${riskBgColor} text-white font-semibold`}>{employee.score}</Badge>
                          <Progress value={employee.score} className="h-2" />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          {employee.causes.map((cause) => (
                            <Badge key={cause} variant="outline" className="text-xs font-medium">
                              {cause}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-accent bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation()
                            onEmployeeClick(employee)
                          }}
                        >
                          Ver Ações
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <ExportReportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />
      <NewActionModal isOpen={showNewActionModal} onClose={() => setShowNewActionModal(false)} employees={employees} />
    </div>
  )
}
