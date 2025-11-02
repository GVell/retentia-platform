"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Clock, User, MessageSquare, Target, TrendingUp, Users } from "lucide-react"
import type { Employee } from "@/app/page"

type ActionRecommendationsProps = {
  employee: Employee
  onBack: () => void
}

type ActionStatus = "pending" | "in-progress" | "completed"

type Action = {
  id: number
  urgency: "high" | "medium" | "low"
  title: string
  subsystem: string
  reason: string
  steps: { id: number; text: string; completed: boolean }[]
  deadline: string
  responsible: string
  status: ActionStatus
  comment: string
  showComment: boolean
}

export default function ActionRecommendations({ employee, onBack }: ActionRecommendationsProps) {
  const [expandedActions, setExpandedActions] = useState<string[]>(["action-1"])

  const [actions, setActions] = useState<Action[]>([
    {
      id: 1,
      urgency: "high",
      title: "Revisar Remuneração",
      subsystem: "Remuneração",
      reason: `Salário 25% abaixo do mercado (R$ ${employee.salary.toLocaleString(
        "pt-BR",
      )} vs R$ ${employee.marketSalary.toLocaleString("pt-BR")})`,
      steps: [
        { id: 1, text: "Agendar reunião com gestor esta semana", completed: false },
        { id: 2, text: "Apresentar pesquisa salarial do cargo", completed: false },
        { id: 3, text: "Propor ajuste em até 30 dias ou bônus", completed: false },
      ],
      deadline: "7 dias",
      responsible: "Carlos Mendes (RH)",
      status: "pending",
      comment: "",
      showComment: false,
    },
    {
      id: 2,
      urgency: "medium",
      title: "Criar Plano de Desenvolvimento Individual",
      subsystem: "Desenvolvimento",
      reason: `${employee.lastPromotion} meses sem promoção indica necessidade de crescimento`,
      steps: [
        { id: 1, text: "Mapear competências atuais e desejadas", completed: false },
        { id: 2, text: "Definir metas de desenvolvimento para 6 meses", completed: false },
        { id: 3, text: "Estabelecer cronograma de treinamentos", completed: false },
        { id: 4, text: "Agendar revisões mensais de progresso", completed: false },
      ],
      deadline: "14 dias",
      responsible: "Maria Santos (RH)",
      status: "pending",
      comment: "",
      showComment: false,
    },
    {
      id: 3,
      urgency: "medium",
      title: "Reunião 1:1 para Entender Desmotivadores",
      subsystem: "Engajamento",
      reason: `Engajamento de ${employee.engagement}% indica possíveis problemas não identificados`,
      steps: [
        { id: 1, text: "Agendar conversa individual em ambiente reservado", completed: false },
        { id: 2, text: "Usar perguntas abertas sobre satisfação e desafios", completed: false },
        { id: 3, text: "Documentar feedback e preocupações", completed: false },
        { id: 4, text: "Criar plano de ação baseado no feedback", completed: false },
      ],
      deadline: "7 dias",
      responsible: "Carlos Mendes (RH)",
      status: "pending",
      comment: "",
      showComment: false,
    },
  ])

  const toggleStep = (actionId: number, stepId: number) => {
    setActions((prev) =>
      prev.map((action) =>
        action.id === actionId
          ? {
              ...action,
              steps: action.steps.map((step) => (step.id === stepId ? { ...step, completed: !step.completed } : step)),
            }
          : action,
      ),
    )
  }

  const updateActionStatus = (actionId: number, newStatus: ActionStatus) => {
    setActions((prev) => prev.map((action) => (action.id === actionId ? { ...action, status: newStatus } : action)))
  }

  const toggleComment = (actionId: number) => {
    setActions((prev) =>
      prev.map((action) => (action.id === actionId ? { ...action, showComment: !action.showComment } : action)),
    )
  }

  const updateComment = (actionId: number, comment: string) => {
    setActions((prev) => prev.map((action) => (action.id === actionId ? { ...action, comment } : action)))
  }

  const getUrgencyStyles = (urgency: string, status: ActionStatus) => {
    const isCompleted = status === "completed"
    const baseOpacity = isCompleted ? "opacity-60" : ""

    switch (urgency) {
      case "high":
        return {
          border: "border-l-4 border-l-red-500",
          bg: `bg-red-50 dark:bg-red-950/20 ${baseOpacity}`,
          icon: "🔴",
          label: "ALTA",
          color: "text-red-600 dark:text-red-400",
        }
      case "medium":
        return {
          border: "border-l-4 border-l-amber-500",
          bg: `bg-amber-50 dark:bg-amber-950/20 ${baseOpacity}`,
          icon: "🟡",
          label: "MÉDIA",
          color: "text-amber-600 dark:text-amber-400",
        }
      case "low":
        return {
          border: "border-l-4 border-l-green-500",
          bg: `bg-green-50 dark:bg-green-950/20 ${baseOpacity}`,
          icon: "🟢",
          label: "BAIXA",
          color: "text-green-600 dark:text-green-400",
        }
      default:
        return {
          border: "border-l-4 border-l-gray-500",
          bg: `bg-gray-50 dark:bg-gray-950/20 ${baseOpacity}`,
          icon: "⚪",
          label: "NORMAL",
          color: "text-gray-600 dark:text-gray-400",
        }
    }
  }

  const getSubsystemIcon = (subsystem: string) => {
    switch (subsystem) {
      case "Remuneração":
        return <Target className="w-4 h-4" />
      case "Desenvolvimento":
        return <TrendingUp className="w-4 h-4" />
      case "Engajamento":
        return <Users className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  const urgencyDistribution = {
    high: actions.filter((a) => a.urgency === "high").length,
    medium: actions.filter((a) => a.urgency === "medium").length,
    low: actions.filter((a) => a.urgency === "low").length,
  }

  const subsystems = Array.from(new Set(actions.map((a) => a.subsystem)))

  return (
    <div className="p-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="gap-2 mb-4 hover:bg-accent transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Ações para {employee.name}</h1>
        <p className="text-muted-foreground mt-1">Recomendações personalizadas de retenção</p>
      </div>

      <Card className="mb-6 shadow-md border-border">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <img
              src={employee.avatar || "/placeholder.svg"}
              alt={employee.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-border"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">{employee.name}</h2>
              <p className="text-base text-muted-foreground mt-1">
                {employee.role} • {employee.department}
              </p>
            </div>
            <Badge className="bg-red-500 hover:bg-red-600 text-white text-lg px-4 py-2 font-bold">
              Score: {employee.score}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 shadow-sm border-border">
        <CardHeader>
          <CardTitle className="text-lg">Resumo das Ações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total de Ações</p>
              <p className="text-2xl font-bold text-foreground">{actions.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Distribuição por Urgência</p>
              <div className="flex gap-3">
                {urgencyDistribution.high > 0 && (
                  <Badge variant="outline" className="border-red-500 text-red-600 dark:text-red-400">
                    {urgencyDistribution.high} Alta
                  </Badge>
                )}
                {urgencyDistribution.medium > 0 && (
                  <Badge variant="outline" className="border-amber-500 text-amber-600 dark:text-amber-400">
                    {urgencyDistribution.medium} Média
                  </Badge>
                )}
                {urgencyDistribution.low > 0 && (
                  <Badge variant="outline" className="border-green-500 text-green-600 dark:text-green-400">
                    {urgencyDistribution.low} Baixa
                  </Badge>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Subsistemas Envolvidos</p>
              <div className="flex flex-wrap gap-2">
                {subsystems.map((subsystem) => (
                  <Badge key={subsystem} variant="secondary" className="text-xs">
                    {subsystem}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Accordion type="multiple" value={expandedActions} onValueChange={setExpandedActions} className="space-y-3">
        {actions.map((action) => {
          const styles = getUrgencyStyles(action.urgency, action.status)
          const isCompleted = action.status === "completed"
          const completedSteps = action.steps.filter((s) => s.completed).length

          return (
            <AccordionItem
              key={action.id}
              value={`action-${action.id}`}
              className={`${styles.border} ${styles.bg} rounded-lg border shadow-sm hover:shadow-md transition-all duration-200`}
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]>div>svg]:rotate-180">
                <div className="flex items-center justify-between w-full gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{styles.icon}</span>
                    <div className="text-left">
                      <div className={`text-xs font-semibold ${styles.color} mb-1`}>URGÊNCIA {styles.label}</div>
                      <h3 className={`text-base font-bold text-foreground ${isCompleted ? "line-through" : ""}`}>
                        {action.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                      {getSubsystemIcon(action.subsystem)}
                      {action.subsystem}
                    </Badge>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{action.deadline}</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span className="max-w-[120px] truncate">{action.responsible}</span>
                    </div>

                    <Select
                      value={action.status}
                      onValueChange={(value) => updateActionStatus(action.id, value as ActionStatus)}
                    >
                      <SelectTrigger className="w-[140px] h-8" onClick={(e) => e.stopPropagation()}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="in-progress">Em Andamento</SelectItem>
                        <SelectItem value="completed">Concluída</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-6">
                <div className="space-y-6 pt-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span>💡</span> Motivo
                    </h4>
                    <p className="text-sm text-foreground leading-relaxed pl-6">{action.reason}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span>📝</span> Passos
                      <Badge variant="secondary" className="text-xs ml-2">
                        {completedSteps}/{action.steps.length}
                      </Badge>
                    </h4>
                    <div className="space-y-3 pl-6">
                      {action.steps.map((step) => (
                        <div key={step.id} className="flex items-start gap-3">
                          <Checkbox
                            id={`step-${action.id}-${step.id}`}
                            checked={step.completed}
                            onCheckedChange={() => toggleStep(action.id, step.id)}
                            className="mt-0.5"
                          />
                          <label
                            htmlFor={`step-${action.id}-${step.id}`}
                            className={`text-sm leading-relaxed cursor-pointer ${
                              step.completed ? "line-through text-muted-foreground" : "text-foreground"
                            }`}
                          >
                            {step.text}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleComment(action.id)}
                      className="gap-2 text-muted-foreground hover:text-foreground"
                    >
                      <MessageSquare className="w-4 h-4" />
                      {action.showComment ? "Ocultar nota" : "💬 Adicionar nota"}
                    </Button>
                    {action.showComment && (
                      <Textarea
                        placeholder="Digite suas observações sobre esta ação..."
                        value={action.comment}
                        onChange={(e) => updateComment(action.id, e.target.value)}
                        className="mt-2 min-h-[80px]"
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      {completedSteps === action.steps.length && completedSteps > 0 && (
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          ✓ Todos os passos concluídos
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {action.status === "pending" && (
                        <Button
                          onClick={() => updateActionStatus(action.id, "in-progress")}
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          Marcar Em Andamento
                        </Button>
                      )}
                      {action.status === "in-progress" && (
                        <Button
                          onClick={() => updateActionStatus(action.id, "completed")}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          Marcar Concluída
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
