"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Dashboard from "@/components/dashboard"
import EmployeeProfile from "@/components/employee-profile"
import ActionRecommendations from "@/components/action-recommendations"
import Feedback from "@/components/feedback"
import EmployeeList from "@/components/employee-list"
import ActionsManagement from "@/components/actions-management"
import Onboarding from "@/components/onboarding"
import RHDedicado from "@/components/rh-dedicado"

export type Employee = {
  id: number
  name: string
  email: string
  role: string
  department: string
  score: number
  causes: string[]
  avatar: string
  tenure: number
  rating: number
  engagement: number
  lastPromotion: number
  salary: number
  marketSalary: number
}

export type Page =
  | "dashboard"
  | "profile"
  | "recommendations"
  | "feedback"
  | "employees"
  | "actions"
  | "onboarding"
  | "rh-dedicado"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [employeeRiskFilter, setEmployeeRiskFilter] = useState<string>("all")
  const [actionsTab, setActionsTab] = useState<string>("pendentes")

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee)
    setCurrentPage("profile")
  }

  const handleViewRecommendations = () => {
    setCurrentPage("recommendations")
  }

  const handleBackToDashboard = () => {
    setCurrentPage("dashboard")
    setSelectedEmployee(null)
  }

  const handleBackToProfile = () => {
    setCurrentPage("profile")
  }

  const handleNavigateToEmployees = (riskFilter = "all") => {
    setEmployeeRiskFilter(riskFilter)
    setCurrentPage("employees")
  }

  const handleNavigateToActions = (tab = "pendentes") => {
    setActionsTab(tab)
    setCurrentPage("actions")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-auto">
        {currentPage === "dashboard" && (
          <Dashboard
            onEmployeeClick={handleEmployeeClick}
            onNavigateToEmployees={handleNavigateToEmployees}
            onNavigateToActions={handleNavigateToActions}
          />
        )}
        {currentPage === "onboarding" && <Onboarding />}
        {currentPage === "employees" && (
          <EmployeeList onEmployeeClick={handleEmployeeClick} presetRiskFilter={employeeRiskFilter} />
        )}
        {currentPage === "actions" && (
          <ActionsManagement onEmployeeClick={handleEmployeeClick} presetTab={actionsTab} />
        )}
        {currentPage === "profile" && selectedEmployee && (
          <EmployeeProfile
            employee={selectedEmployee}
            onBack={handleBackToDashboard}
            onViewRecommendations={handleViewRecommendations}
          />
        )}
        {currentPage === "recommendations" && selectedEmployee && (
          <ActionRecommendations employee={selectedEmployee} onBack={handleBackToProfile} />
        )}
        {currentPage === "feedback" && <Feedback />}
        {currentPage === "rh-dedicado" && <RHDedicado />}
      </main>
    </div>
  )
}
