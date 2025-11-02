"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, Search } from "lucide-react"
import type { Employee } from "@/app/page"
import { getRiskLevel, getRiskLabel, getRiskBgColor } from "@/lib/risk-utils"

type EmployeeListProps = {
  onEmployeeClick: (employee: Employee) => void
  presetRiskFilter?: string
}

const allEmployees: Employee[] = [
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
    name: "Fernanda Rodrigues",
    email: "fernanda.rodrigues@empresa.com",
    role: "Gerente de Projetos",
    department: "Operações",
    score: 55,
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
    name: "Beatriz Cardoso",
    email: "beatriz.cardoso@empresa.com",
    role: "Analista de Dados",
    department: "TI",
    score: 52,
    causes: ["Estagnação"],
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
    name: "Amanda Gomes",
    email: "amanda.gomes@empresa.com",
    role: "Coordenadora Marketing",
    department: "Marketing",
    score: 48,
    causes: ["Avaliação"],
    avatar: "/woman-coordinator.jpg",
    tenure: 21,
    rating: 3.3,
    engagement: 47,
    lastPromotion: 16,
    salary: 6800,
    marketSalary: 8200,
  },
  {
    id: 11,
    name: "Ricardo Pereira",
    email: "ricardo.pereira@empresa.com",
    role: "Analista Comercial",
    department: "Vendas",
    score: 45,
    causes: ["Salário"],
    avatar: "/man.jpg",
    tenure: 15,
    rating: 3.8,
    engagement: 58,
    lastPromotion: 12,
    salary: 5000,
    marketSalary: 6200,
  },
  {
    id: 12,
    name: "Thiago Ribeiro",
    email: "thiago.ribeiro@empresa.com",
    role: "Desenvolvedor Pleno",
    department: "TI",
    score: 42,
    causes: ["Estagnação"],
    avatar: "/man-designer.jpg",
    tenure: 19,
    rating: 4.2,
    engagement: 62,
    lastPromotion: 15,
    salary: 7200,
    marketSalary: 8500,
  },
  {
    id: 13,
    name: "Patrícia Souza",
    email: "patricia.souza@empresa.com",
    role: "Assistente Administrativo",
    department: "Administrativo",
    score: 35,
    causes: ["Adaptação"],
    avatar: "/professional-woman.png",
    tenure: 8,
    rating: 4.5,
    engagement: 72,
    lastPromotion: 6,
    salary: 3500,
    marketSalary: 4000,
  },
  {
    id: 14,
    name: "Bruno Martins",
    email: "bruno.martins@empresa.com",
    role: "Analista Qualidade",
    department: "Operações",
    score: 28,
    causes: [],
    avatar: "/man-support.jpg",
    tenure: 10,
    rating: 4.6,
    engagement: 78,
    lastPromotion: 8,
    salary: 4800,
    marketSalary: 5200,
  },
  {
    id: 15,
    name: "Camila Alves",
    email: "camila.alves@empresa.com",
    role: "Coordenadora RH",
    department: "RH",
    score: 22,
    causes: [],
    avatar: "/woman-hr.jpg",
    tenure: 12,
    rating: 4.8,
    engagement: 85,
    lastPromotion: 9,
    salary: 6500,
    marketSalary: 7000,
  },
]

export default function EmployeeList({ onEmployeeClick, presetRiskFilter = "all" }: EmployeeListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")

  useEffect(() => {
    if (presetRiskFilter) {
      setRiskFilter(presetRiskFilter)
    }
  }, [presetRiskFilter])

  const filteredEmployees = allEmployees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter
    const matchesRisk = riskFilter === "all" || getRiskLevel(employee.score) === riskFilter
    return matchesSearch && matchesDepartment && matchesRisk
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Todos os Colaboradores</h1>
        <p className="text-muted-foreground">150 colaboradores ativos</p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Departamentos</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="TI">TI</SelectItem>
                <SelectItem value="Vendas">Vendas</SelectItem>
                <SelectItem value="Produto">Produto</SelectItem>
                <SelectItem value="RH">RH</SelectItem>
                <SelectItem value="Financeiro">Financeiro</SelectItem>
                <SelectItem value="Operações">Operações</SelectItem>
                <SelectItem value="Administrativo">Administrativo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Nível de Engajamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Níveis</SelectItem>
                <SelectItem value="critico">Crítico</SelectItem>
                <SelectItem value="em-risco">Em Risco</SelectItem>
                <SelectItem value="estavel">Estável</SelectItem>
                <SelectItem value="engajado">Engajado</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 bg-transparent">
              <FileDown className="w-4 h-4" />
              Exportar Lista
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Exibindo {filteredEmployees.length} de {allEmployees.length} colaboradores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nome</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Cargo</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Departamento</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Score</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nível</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Última Atualização</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => {
                  const riskLevel = getRiskLevel(employee.score)
                  const riskLabel = getRiskLabel(riskLevel)
                  const riskBgColor = getRiskBgColor(riskLevel)
                  const getDaysAgo = (id: number) => {
                    const days = [2, 5, 1, 3, 7, 4, 6, 8, 2, 5, 3, 7, 4, 6, 1]
                    return days[id - 1] || 3
                  }

                  return (
                    <tr
                      key={employee.id}
                      onClick={() => onEmployeeClick(employee)}
                      className="border-b border-border hover:bg-accent cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={employee.avatar || "/placeholder.svg"}
                            alt={employee.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span className="font-medium text-foreground">{employee.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-foreground">{employee.role}</td>
                      <td className="py-4 px-4 text-foreground">{employee.department}</td>
                      <td className="py-4 px-4">
                        <div className="space-y-2 min-w-[100px]">
                          <div className="flex items-center gap-2">
                            <Badge className={`${riskBgColor} text-white`}>{employee.score}</Badge>
                          </div>
                          <Progress value={employee.score} className="h-2" />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${riskBgColor} text-white`}>{riskLabel}</Badge>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">Há {getDaysAgo(employee.id)} dias</td>
                      <td className="py-4 px-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            onEmployeeClick(employee)
                          }}
                        >
                          Ver Perfil
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
    </div>
  )
}
