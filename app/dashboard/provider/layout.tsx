"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { LogoLoading } from "@/components/logo-loading"

export default function ProviderDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Add console logs for debugging
    console.log("Provider Dashboard Layout - User:", user)
    console.log("Provider Dashboard Layout - isLoading:", isLoading)

    if (!isLoading && !user) {
      console.log("No user found, redirecting to login")
      router.push("/login/patient")
    } else if (!isLoading && user && user.role !== "provider") {
      // Redirect to appropriate dashboard based on role
      console.log("User role is not provider, redirecting based on role:", user.role)
      if (user.role === "patient") {
        router.push("/dashboard")
      } else {
        router.push("/")
      }
    } else if (!isLoading && user) {
      console.log("User is authenticated as provider, showing dashboard")
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

  // If user is not a provider, show logo loading (will be redirected)
  if (user.role !== "provider") {
    return <LogoLoading />
  }

  return <>{children}</>
}
