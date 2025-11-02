"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Clock, TrendingUp, Plus, ListTodo, Loader2, CheckCheck } from "lucide-react"
import type { Employee } from "@/app/page"
import NewActionModal from "./new-action-modal"

type ActionsManagementProps = {
  onEmployeeClick: (employee: Employee) => void
  presetTab?: string
}

type Action = {
  id: number
  employeeId: number
  employeeName: string
  employeeRole: string
  employeeAvatar: string
  department: string
  riskScore: number
  urgency: "alta" | "media" | "baixa"
  title: string
  type: "Remuneração" | "Desenvolvimento" | "Engajamento" | "Liderança"
  description: string
  deadline: string
  overdue: boolean
  status: "pendente" | "em-andamento" | "concluida"
  responsible: string
  daysInfo: string
}

const mockActions: Action[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "Ana Silva",
    employeeRole: "Analista de Marketing",
    employeeAvatar: "/diverse-woman-portrait.png",
    department: "Marketing",
    riskScore: 85,
    urgency: "alta",
    title: "Revisar Remuneração",
    type: "Remuneração",
    description: "Salário 25% abaixo do mercado. Propor ajuste salarial urgente.",
    deadline: "7 dias",
    overdue: false,
    status: "pendente",
    responsible: "RH",
    daysInfo: "",
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: "Carlos Mendes",
    employeeRole: "Desenvolvedor Sênior",
    employeeAvatar: "/man.jpg",
    department: "TI",
    riskScore: 78,
    urgency: "media",
    title: "Oferecer Projeto Desafiador",
    type: "Desenvolvimento",
    description: "Colaborador busca novos desafios técnicos. Alocar em projeto estratégico.",
    deadline: "14 dias",
    overdue: false,
    status: "pendente",
    responsible: "RH",
    daysInfo: "",
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: "Mariana Costa",
    employeeRole: "Coordenadora Vendas",
    employeeAvatar: "/professional-woman.png",
    department: "Vendas",
    riskScore: 76,
    urgency: "alta",
    title: "Feedback 360° do Gestor",
    type: "Liderança",
    description: "Avaliação baixa do gestor. Realizar sessão de feedback estruturado.",
    deadline: "5 dias",
    overdue: false,
    status: "pendente",
    responsible: "RH",
    daysInfo: "",
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: "Pedro Santos",
    employeeRole: "Designer UX",
    employeeAvatar: "/man-designer.jpg",
    department: "Produto",
    riskScore: 74,
    urgency: "alta",
    title: "Reunião 1:1 de Integração",
    type: "Engajamento",
    description: "Novo colaborador com dificuldades de adaptação. Agendar 1:1 com gestor.",
    deadline: "",
    overdue: false,
    status: "em-andamento",
    responsible: "Gestor Direto",
    daysInfo: "Iniciada há 3 dias",
  },
  {
    id: 5,
    employeeId: 5,
    employeeName: "Juliana Oliveira",
    employeeRole: "Analista RH",
    employeeAvatar: "/woman-hr.jpg",
    department: "RH",
    riskScore: 72,
    urgency: "media",
    title: "Criar PDI",
    type: "Desenvolvimento",
    description: "22 meses sem promoção. Desenvolver Plano de Desenvolvimento Individual.",
    deadline: "21 dias",
    overdue: false,
    status: "pendente",
    responsible: "RH",
    daysInfo: "",
  },
  {
    id: 6,
    employeeId: 6,
    employeeName: "Roberto Lima",
    employeeRole: "Analista Financeiro",
    employeeAvatar: "/man-finance.jpg",
    department: "Financeiro",
    riskScore: 71,
    urgency: "alta",
    title: "Pesquisa Salarial Mercado",
    type: "Remuneração",
    description: "Realizar pesquisa de mercado para posição e apresentar proposta.",
    deadline: "10 dias",
    overdue: false,
    status: "pendente",
    responsible: "RH",
    daysInfo: "",
  },
  {
    id: 7,
    employeeId: 7,
    employeeName: "Lucas Ferreira",
    employeeRole: "Analista Suporte",
    employeeAvatar: "/man-support.jpg",
    department: "TI",
    riskScore: 70,
    urgency: "media",
    title: "Buddy/Mentor Atribuição",
    type: "Engajamento",
    description: "Atribuir mentor experiente para auxiliar na adaptação.",
    deadline: "",
    overdue: false,
    status: "em-andamento",
    responsible: "Gestor TI",
    daysInfo: "Iniciada há 1 dia",
  },
  {
    id: 8,
    employeeId: 8,
    employeeName: "Fernanda Rodrigues",
    employeeRole: "Gerente de Projetos",
    employeeAvatar: "/woman-manager.jpg",
    department: "Operações",
    riskScore: 55,
    urgency: "baixa",
    title: "Propor Job Rotation",
    type: "Desenvolvimento",
    description: "Oferecer oportunidade de rotação para ampliar experiência.",
    deadline: "30 dias",
    overdue: false,
    status: "pendente",
    responsible: "RH",
    daysInfo: "",
  },
  {
    id: 9,
    employeeId: 9,
    employeeName: "Beatriz Cardoso",
    employeeRole: "Analista de Dados",
    employeeAvatar: "/man-data.jpg",
    department: "TI",
    riskScore: 52,
    urgency: "baixa",
    title: "Reconhecimento Público",
    type: "Engajamento",
    description: "Reconhecer publicamente contribuições recentes do colaborador.",
    deadline: "",
    overdue: false,
    status: "concluida",
    responsible: "Gestor TI",
    daysInfo: "há 5 dias",
  },
  {
    id: 10,
    employeeId: 10,
    employeeName: "Amanda Gomes",
    employeeRole: "Coordenadora Marketing",
    employeeAvatar: "/woman-coordinator.jpg",
    department: "Marketing",
    riskScore: 48,
    urgency: "media",
    title: "Ajuste de Metas",
    type: "Liderança",
    description: "Revisar metas com gestor para garantir alinhamento e clareza.",
    deadline: "15 dias",
    overdue: false,
    status: "pendente",
    responsible: "Gestor Marketing",
    daysInfo: "",
  },
]

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
]

export default function ActionsManagement({ onEmployeeClick, presetTab = "pendentes" }: ActionsManagementProps) {
  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [actions, setActions] = useState(mockActions)
  const [showNewActionModal, setShowNewActionModal] = useState(false)
  const [draggedAction, setDraggedAction] = useState<Action | null>(null)

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      Remuneração: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      Desenvolvimento: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      Engajamento: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      Liderança: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    }
    return <Badge className={`${colors[type]} text-xs`}>{type}</Badge>
  }

  const handleViewDetails = (employeeId: number) => {
    const employee = employees.find((e) => e.id === employeeId)
    if (employee) {
      onEmployeeClick(employee)
    }
  }

  const handleDragStart = (action: Action) => {
    setDraggedAction(action)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (newStatus: "pendente" | "em-andamento" | "concluida") => {
    if (draggedAction) {
      setActions((prev) =>
        prev.map((action) => (action.id === draggedAction.id ? { ...action, status: newStatus } : action)),
      )
      setDraggedAction(null)
    }
  }

  const filteredActions = actions.filter((action) => {
    const matchesUrgency = urgencyFilter === "all" || action.urgency === urgencyFilter
    const matchesDepartment = departmentFilter === "all" || action.department === departmentFilter
    const matchesType = typeFilter === "all" || action.type === typeFilter
    return matchesUrgency && matchesDepartment && matchesType
  })

  const pendingActions = filteredActions.filter((a) => a.status === "pendente")
  const inProgressActions = filteredActions.filter((a) => a.status === "em-andamento")
  const completedActions = filteredActions.filter((a) => a.status === "concluida")

  const pendingCount = actions.filter((a) => a.status === "pendente").length
  const inProgressCount = actions.filter((a) => a.status === "em-andamento").length
  const completedCount = actions.filter((a) => a.status === "concluida").length
  const overdueCount = actions.filter((a) => a.overdue).length
  const completionRate = Math.round((completedCount / actions.length) * 100)

  const ActionCard = ({ action }: { action: Action }) => (
    <Card
      draggable
      onDragStart={() => handleDragStart(action)}
      className={`mb-3 cursor-move hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-l-4 ${
        action.urgency === "alta"
          ? "border-l-[#ef4444]"
          : action.urgency === "media"
            ? "border-l-[#f59e0b]"
            : "border-l-[#10b981]"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex gap-3 mb-3">
          <img
            src={action.employeeAvatar || "/placeholder.svg"}
            alt={action.employeeName}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-foreground truncate">{action.employeeName}</h4>
            <p className="text-xs text-muted-foreground truncate">
              {action.employeeRole} • {action.department}
            </p>
            <Badge
              variant="destructive"
              className="bg-[#ef4444] hover:bg-[#dc2626] text-white mt-1 text-xs px-1.5 py-0"
            >
              Score: {action.riskScore}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="font-semibold text-sm text-foreground line-clamp-1">{action.title}</h5>
          <div className="flex gap-1.5">{getTypeBadge(action.type)}</div>
          {action.deadline && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>Prazo: {action.deadline}</span>
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Responsável:</span> {action.responsible}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-3 text-xs h-8 bg-transparent"
          onClick={() => handleViewDetails(action.employeeId)}
        >
          Ver Detalhes
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestão de Ações</h1>
          <p className="text-muted-foreground">Acompanhe todas as intervenções de retenção</p>
        </div>
        <Button className="gap-2 bg-[#6366f1] hover:bg-[#5558e3]" onClick={() => setShowNewActionModal(true)}>
          <Plus className="w-4 h-4" />
          Nova Ação
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Pendentes</p>
                <p className="text-3xl font-bold text-foreground">{pendingCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-[#f59e0b]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Em Andamento</p>
                <p className="text-3xl font-bold text-foreground">{inProgressCount}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Vencidas</p>
                <p className="text-3xl font-bold text-[#ef4444]">{overdueCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-[#ef4444]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Taxa de Conclusão</p>
                <p className="text-3xl font-bold text-[#10b981]">{completionRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-[#10b981]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Urgência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Urgências</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="baixa">Baixa</SelectItem>
              </SelectContent>
            </Select>

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
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="Remuneração">Remuneração</SelectItem>
                <SelectItem value="Desenvolvimento">Desenvolvimento</SelectItem>
                <SelectItem value="Engajamento">Engajamento</SelectItem>
                <SelectItem value="Liderança">Liderança</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {/* PENDENTES Column */}
        <div
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("pendente")}
          className="bg-red-50/50 dark:bg-red-950/20 rounded-lg p-4 min-h-[600px]"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-red-200 dark:border-red-900">
            <div className="flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-[#ef4444]" />
              <h3 className="font-semibold text-foreground">PENDENTES</h3>
            </div>
            <Badge className="bg-[#ef4444] hover:bg-[#dc2626] text-white">{pendingActions.length}</Badge>
          </div>
          <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
            {pendingActions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))}
            {pendingActions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">Nenhuma ação pendente</div>
            )}
          </div>
        </div>

        {/* EM ANDAMENTO Column */}
        <div
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("em-andamento")}
          className="bg-yellow-50/50 dark:bg-yellow-950/20 rounded-lg p-4 min-h-[600px]"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-yellow-200 dark:border-yellow-900">
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 text-[#f59e0b]" />
              <h3 className="font-semibold text-foreground">EM ANDAMENTO</h3>
            </div>
            <Badge className="bg-[#f59e0b] hover:bg-[#d97706] text-white">{inProgressActions.length}</Badge>
          </div>
          <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
            {inProgressActions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))}
            {inProgressActions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">Nenhuma ação em andamento</div>
            )}
          </div>
        </div>

        {/* CONCLUÍDAS Column */}
        <div
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("concluida")}
          className="bg-green-50/50 dark:bg-green-950/20 rounded-lg p-4 min-h-[600px]"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-green-200 dark:border-green-900">
            <div className="flex items-center gap-2">
              <CheckCheck className="w-5 h-5 text-[#10b981]" />
              <h3 className="font-semibold text-foreground">CONCLUÍDAS</h3>
            </div>
            <Badge className="bg-[#10b981] hover:bg-[#059669] text-white">{completedActions.length}</Badge>
          </div>
          <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
            {completedActions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))}
            {completedActions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">Nenhuma ação concluída</div>
            )}
          </div>
        </div>
      </div>

      <NewActionModal isOpen={showNewActionModal} onClose={() => setShowNewActionModal(false)} employees={employees} />
    </div>
  )
}
