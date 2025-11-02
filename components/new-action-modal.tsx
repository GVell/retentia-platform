"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { X, Plus, Trash2, Lightbulb } from "lucide-react"
import type { Employee } from "@/app/page"

type NewActionModalProps = {
  isOpen: boolean
  onClose: () => void
  employees: Employee[]
}

export default function NewActionModal({ isOpen, onClose, employees }: NewActionModalProps) {
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [actionType, setActionType] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [urgency, setUrgency] = useState<"alta" | "media" | "baixa">("media")
  const [deadline, setDeadline] = useState("")
  const [responsible, setResponsible] = useState("")
  const [steps, setSteps] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)

  if (!isOpen) return null

  const selectedEmployeeData = employees.find((e) => e.id.toString() === selectedEmployee)

  const handleAddStep = () => {
    if (currentStep.trim() && steps.length < 5) {
      setSteps([...steps, currentStep.trim()])
      setCurrentStep("")
    }
  }

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    const newErrors: string[] = []

    if (!selectedEmployee) newErrors.push("employee")
    if (!actionType) newErrors.push("type")
    if (!title.trim()) newErrors.push("title")
    if (!urgency) newErrors.push("urgency")
    if (!responsible) newErrors.push("responsible")

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    // Success
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      onClose()
      // Reset form
      setSelectedEmployee("")
      setActionType("")
      setTitle("")
      setDescription("")
      setUrgency("media")
      setDeadline("")
      setResponsible("")
      setSteps([])
      setErrors([])
    }, 2000)
  }

  const getSuggestions = () => {
    if (!selectedEmployeeData) return []

    const suggestions: { type: string; title: string; description: string }[] = []

    if (selectedEmployeeData.causes.includes("Salário")) {
      suggestions.push({
        type: "Remuneração",
        title: "Revisar Faixa Salarial",
        description: "Realizar pesquisa de mercado e propor ajuste salarial competitivo.",
      })
    }

    if (selectedEmployeeData.causes.includes("Estagnação")) {
      suggestions.push({
        type: "Desenvolvimento/Carreira",
        title: "Criar Plano de Desenvolvimento Individual",
        description: "Desenvolver PDI com metas claras de crescimento e capacitação.",
      })
    }

    if (selectedEmployeeData.causes.includes("Adaptação")) {
      suggestions.push({
        type: "Engajamento/Clima",
        title: "Atribuir Mentor/Buddy",
        description: "Designar colaborador experiente para auxiliar na adaptação.",
      })
    }

    return suggestions
  }

  const applySuggestion = (suggestion: { type: string; title: string; description: string }) => {
    setActionType(suggestion.type)
    setTitle(suggestion.title)
    setDescription(suggestion.description)
    setShowSuggestions(false)
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-200" onClick={onClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <Card className="bg-background border-border shadow-2xl">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Criar Nova Ação</h2>
                <p className="text-sm text-muted-foreground">Registre uma intervenção personalizada</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Form */}
            <div className="space-y-5">
              {/* Employee Selection */}
              <div>
                <Label htmlFor="employee" className="text-sm font-medium text-foreground mb-2 block">
                  Colaborador <span className="text-[#ef4444]">*</span>
                </Label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger className={errors.includes("employee") ? "border-[#ef4444]" : ""}>
                    <SelectValue placeholder="Selecione um colaborador..." />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id.toString()}>
                        <div className="flex items-center gap-2">
                          <img src={emp.avatar || "/placeholder.svg"} alt={emp.name} className="w-6 h-6 rounded-full" />
                          <span>
                            {emp.name} - {emp.role}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Suggestions Box */}
              {selectedEmployeeData && getSuggestions().length > 0 && (
                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                  <CardContent className="p-4">
                    <button
                      onClick={() => setShowSuggestions(!showSuggestions)}
                      className="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-300 w-full"
                    >
                      <Lightbulb className="w-4 h-4" />
                      Sugestões baseadas no perfil do colaborador
                    </button>
                    {showSuggestions && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">
                          Sugerimos ações relacionadas a: {selectedEmployeeData.causes.join(", ")}
                        </p>
                        {getSuggestions().map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => applySuggestion(suggestion)}
                            className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                          >
                            <p className="text-sm font-medium text-foreground">{suggestion.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{suggestion.description}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Action Type */}
              <div>
                <Label htmlFor="type" className="text-sm font-medium text-foreground mb-2 block">
                  Tipo de Ação <span className="text-[#ef4444]">*</span>
                </Label>
                <Select value={actionType} onValueChange={setActionType}>
                  <SelectTrigger className={errors.includes("type") ? "border-[#ef4444]" : ""}>
                    <SelectValue placeholder="Selecione o tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Remuneração">Remuneração</SelectItem>
                    <SelectItem value="Desenvolvimento/Carreira">Desenvolvimento/Carreira</SelectItem>
                    <SelectItem value="Engajamento/Clima">Engajamento/Clima</SelectItem>
                    <SelectItem value="Liderança/Gestão">Liderança/Gestão</SelectItem>
                    <SelectItem value="Adaptação/Onboarding">Adaptação/Onboarding</SelectItem>
                    <SelectItem value="Reconhecimento">Reconhecimento</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-foreground mb-2 block">
                  Título da Ação <span className="text-[#ef4444]">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Ex: Revisar faixa salarial"
                  value={title}
                  onChange={(e) => setTitle(e.target.value.slice(0, 100))}
                  className={errors.includes("title") ? "border-[#ef4444]" : ""}
                />
                <p className="text-xs text-muted-foreground mt-1">{title.length}/100 caracteres</p>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-foreground mb-2 block">
                  Descrição/Motivo
                </Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o contexto e motivo desta ação..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">{description.length}/500 caracteres</p>
              </div>

              {/* Urgency */}
              <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">
                  Urgência <span className="text-[#ef4444]">*</span>
                </Label>
                <RadioGroup value={urgency} onValueChange={(value) => setUrgency(value as "alta" | "media" | "baixa")}>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-accent cursor-pointer">
                      <RadioGroupItem value="alta" id="alta" />
                      <Label htmlFor="alta" className="cursor-pointer flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">🔴</span>
                          <span className="font-semibold text-foreground">Alta</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Ação deve ser tomada em até 7 dias</p>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-accent cursor-pointer">
                      <RadioGroupItem value="media" id="media" />
                      <Label htmlFor="media" className="cursor-pointer flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">🟡</span>
                          <span className="font-semibold text-foreground">Média</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Ação pode ser tomada em até 30 dias</p>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-accent cursor-pointer">
                      <RadioGroupItem value="baixa" id="baixa" />
                      <Label htmlFor="baixa" className="cursor-pointer flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">🟢</span>
                          <span className="font-semibold text-foreground">Baixa</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Ação sem prazo definido</p>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Deadline */}
              <div>
                <Label htmlFor="deadline" className="text-sm font-medium text-foreground mb-2 block">
                  Prazo
                </Label>
                <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
              </div>

              {/* Responsible */}
              <div>
                <Label htmlFor="responsible" className="text-sm font-medium text-foreground mb-2 block">
                  Responsável <span className="text-[#ef4444]">*</span>
                </Label>
                <Select value={responsible} onValueChange={setResponsible}>
                  <SelectTrigger className={errors.includes("responsible") ? "border-[#ef4444]" : ""}>
                    <SelectValue placeholder="Selecione o responsável..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RH">RH</SelectItem>
                    <SelectItem value="Gestor Direto">Gestor Direto</SelectItem>
                    <SelectItem value="Diretoria">Diretoria</SelectItem>
                    <SelectItem value="Time de Talentos">Time de Talentos</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Steps */}
              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Passos da Ação (opcional)</Label>
                <div className="space-y-2">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="flex-1 p-2 bg-accent rounded-lg text-sm text-foreground">{step}</div>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveStep(idx)} className="h-8 w-8">
                        <Trash2 className="w-4 h-4 text-[#ef4444]" />
                      </Button>
                    </div>
                  ))}

                  {steps.length < 5 && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Adicionar passo..."
                        value={currentStep}
                        onChange={(e) => setCurrentStep(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddStep()}
                      />
                      <Button variant="outline" onClick={handleAddStep} disabled={!currentStep.trim()}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {errors.length > 0 && (
                <div className="p-3 bg-[#ef4444]/10 border border-[#ef4444] rounded-lg">
                  <p className="text-sm text-[#ef4444]">Por favor, preencha todos os campos obrigatórios</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button variant="outline" onClick={handleSubmit}>
                Salvar como Rascunho
              </Button>
              <Button className="bg-[#6366f1] hover:bg-[#5558e3]" onClick={handleSubmit}>
                Criar Ação
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
                <p className="font-semibold">Ação criada com sucesso!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
