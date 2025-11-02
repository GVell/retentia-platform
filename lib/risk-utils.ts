export type RiskLevel = "engajado" | "estavel" | "em-risco" | "critico"

export function getRiskLevel(score: number): RiskLevel {
  if (score <= 25) return "engajado"
  if (score <= 50) return "estavel"
  if (score <= 75) return "em-risco"
  return "critico"
}

export function getRiskLabel(level: RiskLevel): string {
  const labels: Record<RiskLevel, string> = {
    engajado: "Engajado",
    estavel: "Estável",
    "em-risco": "Em Risco",
    critico: "Crítico",
  }
  return labels[level]
}

export function getRiskColor(level: RiskLevel): string {
  const colors: Record<RiskLevel, string> = {
    engajado: "#22c55e",
    estavel: "#eab308",
    "em-risco": "#f97316",
    critico: "#ef4444",
  }
  return colors[level]
}

export function getRiskBgColor(level: RiskLevel): string {
  const bgColors: Record<RiskLevel, string> = {
    engajado: "bg-[#22c55e] hover:bg-[#16a34a]",
    estavel: "bg-[#eab308] hover:bg-[#ca8a04]",
    "em-risco": "bg-[#f97316] hover:bg-[#ea580c]",
    critico: "bg-[#ef4444] hover:bg-[#dc2626]",
  }
  return bgColors[level]
}
