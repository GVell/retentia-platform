"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ColetaInicial from "@/components/coleta-inicial"
import PulsosTrimestrais from "@/components/pulsos-trimestrais"

export default function Onboarding() {
  const [activeTab, setActiveTab] = useState("inicial")

  return (
    <div className="p-8 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Coleta de Dados</h1>
        <p className="text-muted-foreground">Configure e acompanhe a coleta de informações</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="inicial" className="px-6">
            Coleta Inicial
          </TabsTrigger>
          <TabsTrigger value="pulsos" className="px-6">
            Pulsos Trimestrais
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inicial">
          <ColetaInicial />
        </TabsContent>

        <TabsContent value="pulsos">
          <PulsosTrimestrais />
        </TabsContent>
      </Tabs>
    </div>
  )
}
