"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Check,
  MapPin,
  Briefcase,
  Target,
  Calendar,
  MessageSquare,
  Clock,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
} from "lucide-react"

export default function RHDedicado() {
  const [showProfileModal, setShowProfileModal] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">RH Dedicado</h1>
          <p className="text-gray-600 mt-2">Profissionais qualificados para executar as ações de retenção</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 space-y-6">
        {/* SEÇÃO 1: CARD PLANO ATUAL */}
        <Card className="p-6 border-gray-200 bg-gradient-to-br from-indigo-50 to-white">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white">Plano: Pro + RH Dedicado</Badge>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Inclui:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Plataforma completa RetentIA</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>20 horas/mês de especialista RH</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-sm text-gray-600">
                  Seu especialista: <span className="font-semibold text-gray-900">João Silva</span>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowProfileModal(true)}>
                Ver Perfil Completo
              </Button>
              <Button variant="outline">Solicitar Troca</Button>
            </div>
          </div>
        </Card>

        {/* SEÇÃO 2: CARD PERFIL DO ESPECIALISTA */}
        <Card className="p-6 border-gray-200">
          <div className="grid md:grid-cols-2 gap-8">
            {/* COLUNA ESQUERDA */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-[120px] h-[120px] border-4 border-indigo-500">
                  <AvatarImage src="/man.jpg" alt="João Silva" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>

                <div className="flex-1 pt-2">
                  <h2 className="text-2xl font-bold text-gray-900">João Silva</h2>
                  <p className="text-gray-600 mt-1">Especialista em RH</p>

                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-gray-900">4.8</span>
                    </div>
                    <span className="text-sm text-gray-500">(24 avaliações)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span>São Paulo, SP</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                  <span>15 anos de experiência</span>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex flex-wrap gap-2">
                    <span className="text-gray-700">Especialidades:</span>
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                      Tech
                    </Badge>
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                      Varejo
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Atividade Este Mês</h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Horas utilizadas</span>
                  <span className="font-semibold text-gray-900">12h / 20h</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <p className="text-sm text-gray-600 mt-1">Ações executadas</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-2xl font-bold text-gray-900">5</p>
                  <p className="text-sm text-gray-600 mt-1">Colaboradores atendidos</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-sm text-gray-600 mt-1">Reuniões realizadas</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                  <p className="text-sm text-gray-600 mt-1">Taxa de sucesso</p>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="font-medium text-gray-900">Próxima reunião</p>
                  <p className="text-sm text-gray-600">25 Out, 14h00</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button className="flex-1 bg-indigo-500 hover:bg-indigo-600">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Reunião
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* SEÇÃO 3: CARD AÇÕES EM ANDAMENTO */}
        <Card className="p-6 border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Ações em Andamento com João</h3>
          </div>

          <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/diverse-woman-portrait.png" alt="Ana Silva" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Ana Silva - Revisar Remuneração</p>
                    <p className="text-sm text-gray-600 mt-1">Próximo: Reunião com gestor (18/Out)</p>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Em progresso</Badge>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/man.jpg" alt="Carlos Mendes" />
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Carlos Mendes - Criar PDI</p>
                    <p className="text-sm text-gray-600 mt-1">Próximo: Definir metas (20/Out)</p>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Em progresso</Badge>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/professional-woman.png" alt="Mariana Costa" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Mariana Costa - Reunião 1:1</p>
                    <p className="text-sm text-gray-600 mt-1">Próximo: Sessão feedback (22/Out)</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Agendada</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="gap-2 bg-transparent">
              Ver Todas as Ações
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* SEÇÃO 4: CARD CTA */}
        <Card className="p-6 border-gray-200 bg-gray-50">
          <div className="text-center space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Precisa de mais suporte?</h3>
              <p className="text-gray-600 mt-2">
                Aumente suas horas, adicione outro especialista ou conheça outros planos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 py-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 transition-colors cursor-pointer">
                <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Aumentar para 40h/mês</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 transition-colors cursor-pointer">
                <Users className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Adicionar 2º especialista</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 transition-colors cursor-pointer">
                <TrendingUp className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Ver outros planos</p>
              </div>
            </div>

            <Button className="bg-indigo-500 hover:bg-indigo-600 px-8">Falar com Time Comercial</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
