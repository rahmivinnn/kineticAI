"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { LogoLoading } from "@/components/logo-loading"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Add console logs for debugging
    console.log("Dashboard Layout - User:", user)
    console.log("Dashboard Layout - isLoading:", isLoading)

    if (!isLoading && !user) {
      console.log("No user found, redirecting to login")
      router.push("/login/patient")
    } else if (!isLoading && user && user.role !== "patient") {
      // Redirect to appropriate dashboard based on role
      console.log("User role is not patient, redirecting based on role:", user.role)
      if (user.role === "provider") {
        router.push("/dashboard/provider")
      } else {
        router.push("/")
      }
    } else if (!isLoading && user) {
      console.log("User is authenticated as patient, showing dashboard")
    }
  }, [user, isLoading, router])

  // Show logo loading while checking authentication
  if (isLoading) {
    return <LogoLoading />
  }

  // If no user, show logo loading (will be redirected)
  if (!user) {
    return <LogoLoading />
  }

  // If user is not a patient, show logo loading (will be redirected)
  if (user.role !== "patient") {
    return <LogoLoading />
  }

  return <>{children}</>
}
