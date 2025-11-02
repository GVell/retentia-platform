"use client"

import { useState } from "react"
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  ClipboardList,
  Link2,
  X,
  Send,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type OnboardingStage = {
  id: number
  title: string
  status: "complete" | "in-progress" | "pending"
  icon: "check" | "loading" | "pending"
}

type Department = {
  name: string
  responded: number
  total: number
  percentage: number
  color: string
}

type PendingEmployee = {
  id: number
  name: string
  email: string
  department: string
}

type EmployeeReport = {
  id: number
  name: string
  email: string
  department: string
  status: "Respondido" | "Pendente"
  responseDate: string | null
}

type Question = {
  id: number
  block: string
  question: string
  type: "scale" | "radio" | "likert"
  options?: string[]
}

export default function ColetaInicial() {
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [showPendingDrawer, setShowPendingDrawer] = useState(false)
  const [showFormPreview, setShowFormPreview] = useState(false)
  const [showDetailedReport, setShowDetailedReport] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [linkCopied, setLinkCopied] = useState(false)

  const stages: OnboardingStage[] = [
    { id: 1, title: "Dados da Empresa", status: "complete", icon: "check" },
    { id: 2, title: "Upload Colaboradores", status: "complete", icon: "check" },
    { id: 3, title: "Questionários", status: "in-progress", icon: "loading" },
    { id: 4, title: "Processamento", status: "pending", icon: "pending" },
    { id: 5, title: "Dashboard Liberado", status: "pending", icon: "pending" },
  ]

  const departments: Department[] = [
    { name: "Marketing", responded: 12, total: 15, percentage: 80, color: "bg-indigo-500/80" },
    { name: "TI", responded: 19, total: 20, percentage: 95, color: "bg-indigo-500" },
    { name: "Vendas", responded: 27, total: 40, percentage: 68, color: "bg-indigo-500/60" },
    { name: "RH", responded: 8, total: 8, percentage: 100, color: "bg-indigo-500" },
    { name: "Financeiro", responded: 14, total: 20, percentage: 70, color: "bg-indigo-500/70" },
  ]

  const pendingEmployees: PendingEmployee[] = [
    { id: 1, name: "Carlos Mendes", email: "carlos.mendes@empresa.com", department: "Vendas" },
    { id: 2, name: "Juliana Costa", email: "juliana.costa@empresa.com", department: "Marketing" },
    { id: 3, name: "Roberto Lima", email: "roberto.lima@empresa.com", department: "Vendas" },
    { id: 4, name: "Fernanda Alves", email: "fernanda.alves@empresa.com", department: "Financeiro" },
    { id: 5, name: "Paulo Santos", email: "paulo.santos@empresa.com", department: "Marketing" },
  ]

  const questions: Question[] = [
    // BLOCO 1: SATISFAÇÃO GERAL
    {
      id: 1,
      block: "Satisfação Geral",
      question: "Numa escala de 0 a 10, qual seu nível de satisfação atual com a empresa?",
      type: "scale",
    },
    {
      id: 2,
      block: "Satisfação Geral",
      question: "Você recomendaria esta empresa para um amigo trabalhar?",
      type: "scale",
    },
    {
      id: 3,
      block: "Satisfação Geral",
      question: "Se recebesse proposta hoje, consideraria sair?",
      type: "radio",
      options: ["Definitivamente não", "Provavelmente não", "Provavelmente sim", "Definitivamente sim"],
    },
    // BLOCO 2: FIT CULTURAL
    {
      id: 4,
      block: "Fit Cultural",
      question: "Sinto que os valores da empresa combinam com os meus",
      type: "likert",
      options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"],
    },
    {
      id: 5,
      block: "Fit Cultural",
      question: "Entendo como meu trabalho contribui para objetivos da empresa",
      type: "scale",
    },
    // BLOCO 3: LIDERANÇA
    { id: 6, block: "Liderança", question: "Meu gestor me dá suporte quando preciso", type: "scale" },
    {
      id: 7,
      block: "Liderança",
      question: "Recebo feedback regular sobre meu trabalho",
      type: "radio",
      options: ["Nunca", "Raramente", "Às vezes", "Frequentemente"],
    },
    {
      id: 8,
      block: "Liderança",
      question: "Me sinto confortável para expressar opiniões com liderança",
      type: "scale",
    },
    // BLOCO 4: DESENVOLVIMENTO
    { id: 9, block: "Desenvolvimento", question: "Vejo oportunidades claras de crescimento", type: "scale" },
    {
      id: 10,
      block: "Desenvolvimento",
      question: "Participei de treinamento nos últimos 6 meses",
      type: "radio",
      options: ["Não", "Sim, 1 treinamento", "Sim, 2-3 treinamentos", "Sim, mais de 3"],
    },
    {
      id: 11,
      block: "Desenvolvimento",
      question: "Tenho clareza sobre meu plano de carreira",
      type: "radio",
      options: ["Nenhuma clareza", "Pouca clareza", "Alguma clareza", "Total clareza"],
    },
    // BLOCO 5: RECONHECIMENTO
    { id: 12, block: "Reconhecimento", question: "Sinto que sou reconhecido pelo meu esforço", type: "scale" },
    {
      id: 13,
      block: "Reconhecimento",
      question: "Como você avalia sua remuneração vs mercado",
      type: "likert",
      options: ["Muito abaixo", "Abaixo", "Na média", "Acima", "Muito acima"],
    },
    { id: 14, block: "Reconhecimento", question: "Como você avalia o pacote de benefícios", type: "scale" },
    // BLOCO 6: BEM-ESTAR
    {
      id: 15,
      block: "Bem-Estar",
      question: "Com que frequência me sinto esgotado/desmotivado",
      type: "radio",
      options: ["Nunca", "Raramente", "Às vezes", "Frequentemente"],
    },
    {
      id: 16,
      block: "Bem-Estar",
      question: "Como você avalia equilíbrio vida pessoal/profissional",
      type: "likert",
      options: ["Muito ruim", "Ruim", "Neutro", "Bom", "Muito bom"],
    },
    // BLOCO 7: PERMANÊNCIA
    { id: 17, block: "Permanência", question: "Você se vê trabalhando aqui daqui a 1 ano?", type: "scale" },
  ]

  const employeeReports: EmployeeReport[] = [
    {
      id: 1,
      name: "Ana Silva",
      email: "ana.silva@empresa.com",
      department: "Marketing",
      status: "Respondido",
      responseDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Carlos Mendes",
      email: "carlos.mendes@empresa.com",
      department: "Vendas",
      status: "Pendente",
      responseDate: null,
    },
    {
      id: 3,
      name: "Juliana Costa",
      email: "juliana.costa@empresa.com",
      department: "Marketing",
      status: "Pendente",
      responseDate: null,
    },
    {
      id: 4,
      name: "Pedro Oliveira",
      email: "pedro.oliveira@empresa.com",
      department: "TI",
      status: "Respondido",
      responseDate: "2024-01-14",
    },
    {
      id: 5,
      name: "Mariana Santos",
      email: "mariana.santos@empresa.com",
      department: "RH",
      status: "Respondido",
      responseDate: "2024-01-16",
    },
    {
      id: 6,
      name: "Roberto Lima",
      email: "roberto.lima@empresa.com",
      department: "Vendas",
      status: "Pendente",
      responseDate: null,
    },
    {
      id: 7,
      name: "Fernanda Alves",
      email: "fernanda.alves@empresa.com",
      department: "Financeiro",
      status: "Pendente",
      responseDate: null,
    },
    {
      id: 8,
      name: "Lucas Ferreira",
      email: "lucas.ferreira@empresa.com",
      department: "TI",
      status: "Respondido",
      responseDate: "2024-01-13",
    },
    {
      id: 9,
      name: "Camila Rodrigues",
      email: "camila.rodrigues@empresa.com",
      department: "Marketing",
      status: "Respondido",
      responseDate: "2024-01-17",
    },
    {
      id: 10,
      name: "Paulo Santos",
      email: "paulo.santos@empresa.com",
      department: "Marketing",
      status: "Pendente",
      responseDate: null,
    },
  ]

  const surveyLink = "https://retentia.app/survey/abc123xyz"

  const handleCopyLink = () => {
    navigator.clipboard.writeText(surveyLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const handleSendReminders = () => {
    setShowReminderModal(false)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleExportCSV = () => {
    const csv = [
      ["Nome", "Email", "Departamento", "Status", "Data Resposta"],
      ...filteredEmployees.map((emp) => [emp.name, emp.email, emp.department, emp.status, emp.responseDate || "N/A"]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "relatorio-coleta-inicial.csv"
    a.click()
  }

  const filteredEmployees = employeeReports.filter((emp) => {
    const matchesDept = departmentFilter === "all" || emp.department === departmentFilter
    const matchesStatus = statusFilter === "all" || emp.status === statusFilter
    return matchesDept && matchesStatus
  })

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const getStageIcon = (stage: OnboardingStage) => {
    if (stage.status === "complete") {
      return <CheckCircle2 className="w-6 h-6 text-green-500" />
    }
    if (stage.status === "in-progress") {
      return <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
    }
    return <Clock className="w-6 h-6 text-gray-400" />
  }

  const getStageColor = (status: string) => {
    if (status === "complete") return "bg-white border-gray-200"
    if (status === "in-progress") return "bg-white border-indigo-500"
    return "bg-white border-gray-200"
  }

  const translateStatus = (status: string) => {
    const translations: Record<string, string> = {
      complete: "Completado",
      "in-progress": "Em Progresso",
      pending: "Pendente",
    }
    return translations[status] || status
  }

  const renderQuestionInput = (question: Question) => {
    if (question.type === "scale") {
      return (
        <div className="space-y-6">
          <div className="flex justify-between text-sm text-muted-foreground px-2">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
          <Slider disabled defaultValue={[5]} max={10} step={1} className="w-full" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Muito insatisfeito</span>
            <span>Muito satisfeito</span>
          </div>
        </div>
      )
    }

    if (question.type === "radio" && question.options) {
      return (
        <RadioGroup disabled className="space-y-3">
          {question.options.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )
    }

    if (question.type === "likert" && question.options) {
      return (
        <RadioGroup disabled className="space-y-3">
          {question.options.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <RadioGroupItem value={option} id={`likert-${index}`} />
              <Label htmlFor={`likert-${index}`} className="flex-1 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )
    }

    return null
  }

  return (
    <div>
      {/* Progress Tracker */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center flex-1">
              <Card
                className={`flex-1 p-4 border-2 transition-all ${getStageColor(stage.status)} ${
                  stage.status === "in-progress" ? "shadow-md" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  {getStageIcon(stage)}
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-700">{stage.title}</p>
                    <p className="text-xs text-muted-foreground">{translateStatus(stage.status)}</p>
                  </div>
                </div>
              </Card>
              {index < stages.length - 1 && <div className="w-8 h-0.5 bg-gray-300 mx-2 flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Dashboard Card */}
      <Card className="p-8 mb-6 shadow-lg bg-white">
        {/* Overall Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Taxa Geral de Resposta</h2>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Meta: 80%
            </Badge>
          </div>

          <Progress value={78} className="h-4 mb-4 [&>div]:bg-indigo-500" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Responderam</p>
                <p className="text-2xl font-bold">
                  <span className="text-green-500">117</span>
                  <span className="text-gray-500">/150</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pendentes</p>
                <p className="text-2xl font-bold text-gray-500">33</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5" />
              <span className="text-lg font-semibold">4 dias restantes</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 pb-8 border-b">
          <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
          <div className="flex gap-4">
            <Button onClick={() => setShowReminderModal(true)} className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Enviar Lembretes
            </Button>
            <Button onClick={() => setShowPendingDrawer(true)} variant="outline" className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4" />
              Ver Pendentes
            </Button>
            <Button onClick={() => setShowLinkModal(true)} variant="outline" className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              Link do Questionário
            </Button>
          </div>
        </div>

        {/* Department Breakdown */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Progresso por Departamento</h3>
          <div className="space-y-4">
            {departments.map((dept) => (
              <div key={dept.name}>
                <div className="flex items-center gap-4">
                  <div className="flex-1 max-w-[60%]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{dept.name}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full ${dept.color} transition-all duration-500 rounded-full`}
                        style={{ width: `${dept.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-sm text-muted-foreground">
                      {dept.percentage}% ({dept.responded}/{dept.total})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Footer */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" size="lg" onClick={() => setShowDetailedReport(true)}>
          Ver Relatório Detalhado
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowFormPreview(true)}
          className="flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Visualizar Formulário
        </Button>
      </div>

      {/* Link Modal */}
      {showLinkModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowLinkModal(false)}
        >
          <Card className="p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Link do Questionário</h3>
              <button onClick={() => setShowLinkModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Compartilhe este link com os colaboradores para que possam responder ao questionário.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={surveyLink}
                readOnly
                className="flex-1 px-3 py-2 border rounded-md bg-muted text-sm"
              />
              <Button onClick={handleCopyLink}>{linkCopied ? "Copiado!" : "Copiar"}</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Reminder Modal */}
      {showReminderModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowReminderModal(false)}
        >
          <Card className="p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Enviar Lembretes</h3>
              <button
                onClick={() => setShowReminderModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Deseja enviar um lembrete por e-mail para os 33 colaboradores que ainda não responderam ao questionário?
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowReminderModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSendReminders} className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Enviar Lembretes
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Pending Drawer */}
      {showPendingDrawer && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50" onClick={() => setShowPendingDrawer(false)}>
          <Card
            className="w-full max-w-md h-full overflow-auto rounded-none shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-background border-b p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Colaboradores Pendentes</h3>
                <p className="text-sm text-muted-foreground">33 colaboradores</p>
              </div>
              <button
                onClick={() => setShowPendingDrawer(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {pendingEmployees.map((employee) => (
                  <Card key={employee.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                        {employee.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.email}</p>
                      </div>
                      <Badge variant="secondary">{employee.department}</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Form Preview Modal */}
      {showFormPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-2xl font-bold">Preview do Questionário</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Bloco {Math.floor(currentQuestion / 3) + 1}: {currentQ.block}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowFormPreview(false)
                  setCurrentQuestion(0)
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Pergunta {currentQuestion + 1} de {questions.length}
                </span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 [&>div]:bg-indigo-500" />
            </div>

            {/* Question Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-2xl mx-auto space-y-8">
                <div>
                  <Badge variant="secondary" className="mb-4">
                    {currentQ.block}
                  </Badge>
                  <h4 className="text-xl font-semibold mb-6 leading-relaxed">{currentQ.question}</h4>
                </div>
                {renderQuestionInput(currentQ)}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between p-6 border-t bg-muted/30">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} / {questions.length}
              </span>
              <Button
                onClick={handleNextQuestion}
                disabled={currentQuestion === questions.length - 1}
                className="flex items-center gap-2"
              >
                Próxima
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Detailed Report Modal */}
      {showDetailedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-6xl h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-2xl font-bold">Relatório Detalhado de Respostas</h3>
                <p className="text-sm text-muted-foreground mt-1">{filteredEmployees.length} colaboradores</p>
              </div>
              <button
                onClick={() => setShowDetailedReport(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 p-6 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filtros:</span>
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Departamentos</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="TI">TI</SelectItem>
                  <SelectItem value="Vendas">Vendas</SelectItem>
                  <SelectItem value="RH">RH</SelectItem>
                  <SelectItem value="Financeiro">Financeiro</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Status</SelectItem>
                  <SelectItem value="Respondido">Respondido</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleExportCSV}
                variant="outline"
                className="ml-auto flex items-center gap-2 bg-transparent"
              >
                <Download className="w-4 h-4" />
                Exportar CSV
              </Button>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data Resposta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell className="text-muted-foreground">{employee.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{employee.department}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={employee.status === "Respondido" ? "default" : "outline"}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{employee.responseDate || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
