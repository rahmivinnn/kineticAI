"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, User, AlertCircle, Shield } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ProviderLoginPage() {
  // Login form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { user, login, isLoading: authLoading } = useAuth()
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      if (user.role === "provider") {
        router.push("/dashboard/provider")
      } else if (user.role === "patient") {
        router.push("/dashboard")
      }
    }
  }, [user, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)

      if (success) {
        // Check if the user is a provider
        if (user?.role === "provider") {
          router.push("/dashboard/provider")
        } else if (user?.role === "patient") {
          setError("This login is for healthcare providers only. Please use the patient login.")
        } else {
          setError("Invalid user role. Please contact support.")
        }
      } else {
        setError("Login failed. Please check your credentials and try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Quick login for demo purposes
  const handleQuickLogin = async () => {
    const providerEmail = "provider@gmail.com"
    const providerPassword = "provider"

    setEmail(providerEmail)
    setPassword(providerPassword)

    setError("")
    setIsLoading(true)

    try {
      const success = await login(providerEmail, providerPassword)

      if (success) {
        if (user?.role === "provider") {
          router.push("/dashboard/provider")
        } else {
          setError("This login is for healthcare providers only.")
        }
      } else {
        setError("Login failed. Please check your credentials and try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#00305a] to-[#0066a2] p-4">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Image src="/kinetic-logo.png" alt="Kinetic Logo" width={80} height={80} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-1">Kinetic</h1>
        <p className="text-xl text-white">Provider Portal</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <div className="bg-[#0066a2] w-12 h-12 rounded-full flex items-center justify-center mr-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Provider Access</h2>
              <p className="text-gray-500 text-sm">
                Manage your patients and monitor their recovery progress
              </p>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 py-6"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 py-6"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            <div className="text-right">
              <Link href="/forgot-password" className="text-[#0066a2] hover:underline text-sm">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full py-6 bg-[#0066a2] hover:bg-[#004d7a] text-white font-medium rounded-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⟳</span> Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Demo Quick Login Button */}
          <div className="mt-4 border-t pt-4">
            <p className="text-xs text-gray-500 mb-2 text-center">Demo Quick Login:</p>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={handleQuickLogin}
            >
              Provider Demo Login (provider@gmail.com / provider)
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Are you a patient?{" "}
              <Link href="/login/patient" className="text-[#0066a2] hover:underline">
                Patient Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
