"use client"

import { Shield, LayoutDashboard, Users, Target, MessageSquare, ClipboardCheck, Briefcase } from "lucide-react"
import type { Page } from "@/app/page"

type SidebarProps = {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: "dashboard" as Page, label: "Painel", icon: LayoutDashboard },
    { id: "onboarding" as Page, label: "Coleta de Dados", icon: ClipboardCheck },
    { id: "employees" as Page, label: "Colaboradores", icon: Users },
    { id: "actions" as Page, label: "Ações", icon: Target },
    { id: "feedback" as Page, label: "Feedback", icon: MessageSquare },
    { id: "rh-dedicado" as Page, label: "RH Dedicado", icon: Briefcase },
  ]

  return (
    <aside className="w-[260px] bg-[#1f2937] text-white flex flex-col shadow-xl">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-[#6366f1]" />
          <h1 className="text-2xl font-bold">RetentIA</h1>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = item.id === currentPage
            return (
              <li key={item.label}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/20"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#6366f1] flex items-center justify-center text-white font-semibold shadow-md">
            RH
          </div>
          <div>
            <p className="text-sm font-medium">Admin RH</p>
            <p className="text-xs text-gray-400">admin@empresa.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
