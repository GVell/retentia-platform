"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Lock, CheckCircle2, Frown, Meh, Smile } from "lucide-react"

type FeedbackType = "reclamacao" | "sugestao" | "elogio"
type Department = "ti" | "marketing" | "vendas" | "rh" | "financeiro" | "produto" | "outro" | ""

type FeedbackItem = {
  id: number
  type: FeedbackType
  department: string
  message: string
  timestamp: string
  sentiment: "negativo" | "neutro" | "positivo"
}

const mockFeedbacks: FeedbackItem[] = [
  {
    id: 1,
    type: "reclamacao",
    department: "Marketing",
    message: "Falta transparência nas decisões de promoção. Nunca sabemos quais são os critérios.",
    timestamp: "Há 3 dias",
    sentiment: "negativo",
  },
  {
    id: 2,
    type: "sugestao",
    department: "TI",
    message: "Seria ótimo ter um dia de home office flexível por semana para melhor equilíbrio.",
    timestamp: "Há 1 semana",
    sentiment: "neutro",
  },
  {
    id: 3,
    type: "elogio",
    department: "Anônimo",
    message: "Quero parabenizar a nova política de horários flexíveis. Fez diferença na minha rotina!",
    timestamp: "Há 5 dias",
    sentiment: "positivo",
  },
  {
    id: 4,
    type: "reclamacao",
    department: "Vendas",
    message: "Metas estão muito altas e irrealistas. Isso está desmotivando a equipe.",
    timestamp: "Há 2 dias",
    sentiment: "negativo",
  },
  {
    id: 5,
    type: "sugestao",
    department: "RH",
    message: "Podíamos ter mais treinamentos sobre desenvolvimento de carreira.",
    timestamp: "Há 4 dias",
    sentiment: "neutro",
  },
  {
    id: 6,
    type: "reclamacao",
    department: "TI",
    message: "Equipamentos desatualizados prejudicam nossa produtividade.",
    timestamp: "Há 1 dia",
    sentiment: "negativo",
  },
  {
    id: 7,
    type: "elogio",
    department: "Marketing",
    message: "Adorei a iniciativa do programa de mentoria!",
    timestamp: "Há 6 dias",
    sentiment: "positivo",
  },
  {
    id: 8,
    type: "sugestao",
    department: "Anônimo",
    message: "Happy hours mensais ajudariam na integração do time.",
    timestamp: "Há 3 dias",
    sentiment: "neutro",
  },
]

export default function Feedback() {
  const [activeTab, setActiveTab] = useState<"send" | "view">("send")
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("sugestao")
  const [department, setDepartment] = useState<Department>("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [filterType, setFilterType] = useState<FeedbackType | "todos">("todos")
  const [filterDept, setFilterDept] = useState<string>("todos")

  const handleSubmit = () => {
    if (message.trim()) {
      setSubmitted(true)
      setTimeout(() => {
        setMessage("")
        setDepartment("")
        setFeedbackType("sugestao")
        setSubmitted(false)
      }, 3000)
    }
  }

  const filteredFeedbacks = mockFeedbacks.filter((feedback) => {
    const typeMatch = filterType === "todos" || feedback.type === filterType
    const deptMatch = filterDept === "todos" || feedback.department === filterDept
    return typeMatch && deptMatch
  })

  const getFeedbackTypeConfig = (type: FeedbackType) => {
    switch (type) {
      case "reclamacao":
        return { label: "Reclamação", emoji: "😔", color: "bg-red-500/10 text-red-500 border-red-500/20" }
      case "sugestao":
        return { label: "Sugestão", emoji: "💡", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" }
      case "elogio":
        return { label: "Elogio", emoji: "👏", color: "bg-green-500/10 text-green-500 border-green-500/20" }
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "negativo":
        return <Frown className="w-4 h-4 text-red-500" />
      case "neutro":
        return <Meh className="w-4 h-4 text-yellow-500" />
      case "positivo":
        return <Smile className="w-4 h-4 text-green-500" />
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Canal de Feedback Anônimo</h1>
          <p className="text-muted-foreground leading-relaxed">
            Espaço seguro para colaboradores compartilharem sugestões, reclamações e elogios de forma anônima
          </p>
        </div>

        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("send")}
            className={`px-6 py-3 font-semibold transition-all duration-200 relative ${
              activeTab === "send"
                ? "text-[#6366f1] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#6366f1]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Enviar Feedback
          </button>
          <button
            onClick={() => setActiveTab("view")}
            className={`px-6 py-3 font-semibold transition-all duration-200 relative ${
              activeTab === "view"
                ? "text-[#6366f1] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#6366f1]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Ver Feedbacks Recebidos
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "send" ? (
          <Card className="p-6 shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Feedback enviado com sucesso!</h3>
                <p className="text-muted-foreground">Obrigado por contribuir.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento (opcional)</Label>
                  <Select value={department} onValueChange={(value) => setDepartment(value as Department)}>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Selecionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ti">TI</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="vendas">Vendas</SelectItem>
                      <SelectItem value="rh">RH</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                      <SelectItem value="produto">Produto</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Feedback Type */}
                <div className="space-y-3">
                  <Label>Tipo de Feedback</Label>
                  <RadioGroup value={feedbackType} onValueChange={(value) => setFeedbackType(value as FeedbackType)}>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="reclamacao" id="reclamacao" />
                      <Label htmlFor="reclamacao" className="flex items-center gap-2 cursor-pointer flex-1">
                        <span className="text-xl">😔</span>
                        <span className="text-red-500 font-medium">Reclamação</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="sugestao" id="sugestao" />
                      <Label htmlFor="sugestao" className="flex items-center gap-2 cursor-pointer flex-1">
                        <span className="text-xl">💡</span>
                        <span className="text-blue-500 font-medium">Sugestão</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="elogio" id="elogio" />
                      <Label htmlFor="elogio" className="flex items-center gap-2 cursor-pointer flex-1">
                        <span className="text-xl">👏</span>
                        <span className="text-green-500 font-medium">Elogio</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                    placeholder="Escreva seu feedback aqui. Lembre-se: sua identidade será 100% protegida."
                    className="min-h-[150px] resize-none"
                  />
                  <p className="text-sm text-muted-foreground text-right">{message.length}/500 caracteres</p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl border border-border">
                  <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Sua identidade é completamente anônima. Nem mesmo o RH consegue rastrear quem enviou.
                  </p>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!message.trim()}
                  className="w-full shadow-sm hover:shadow-md transition-all duration-200"
                  size="lg"
                >
                  Enviar Feedback Anonimamente
                </Button>
              </div>
            )}
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="p-4 shadow-sm">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <Label htmlFor="filter-type" className="text-sm mb-2 block">
                    Filtrar por tipo
                  </Label>
                  <Select value={filterType} onValueChange={(value) => setFilterType(value as FeedbackType | "todos")}>
                    <SelectTrigger id="filter-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="reclamacao">Reclamações</SelectItem>
                      <SelectItem value="sugestao">Sugestões</SelectItem>
                      <SelectItem value="elogio">Elogios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <Label htmlFor="filter-dept" className="text-sm mb-2 block">
                    Filtrar por departamento
                  </Label>
                  <Select value={filterDept} onValueChange={setFilterDept}>
                    <SelectTrigger id="filter-dept">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="TI">TI</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Vendas">Vendas</SelectItem>
                      <SelectItem value="RH">RH</SelectItem>
                      <SelectItem value="Financeiro">Financeiro</SelectItem>
                      <SelectItem value="Produto">Produto</SelectItem>
                      <SelectItem value="Anônimo">Anônimo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Feedback List */}
            {filteredFeedbacks.length === 0 ? (
              <Card className="p-12 text-center shadow-sm">
                <p className="text-4xl mb-4">📬</p>
                <p className="text-muted-foreground">
                  Nenhum feedback para exibir. Incentive sua equipe a compartilhar!
                </p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredFeedbacks.map((feedback) => {
                  const config = getFeedbackTypeConfig(feedback.type)
                  return (
                    <Card
                      key={feedback.id}
                      className="p-5 hover:shadow-lg transition-all duration-200 border-l-4 shadow-sm"
                      style={{
                        borderLeftColor:
                          feedback.type === "reclamacao"
                            ? "#ef4444"
                            : feedback.type === "sugestao"
                              ? "#3b82f6"
                              : "#10b981",
                      }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={config.color}>
                            <span className="mr-1">{config.emoji}</span>
                            {config.label}
                          </Badge>
                          <Badge variant="outline" className="font-medium">
                            {feedback.department}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {getSentimentIcon(feedback.sentiment)}
                          <span>{feedback.timestamp}</span>
                        </div>
                      </div>
                      <p className="text-foreground leading-relaxed">{feedback.message}</p>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
