"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Home,
  Activity,
  Users,
  MessageSquare,
  BarChart2,
  FileText,
  User,
  Settings,
  Calendar,
  Video,
  Edit,
  X,
  Bell,
  FileTextIcon as FileText2,
  LogOut,
  CheckCircle,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function AppointmentsPage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("appointments")

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      date: "May 15, 2023",
      time: "10:00 AM",
      doctor: "Dr. Sarah Miller",
      type: "Shoulder Assessment",
      mode: "In-person",
    },
    {
      id: 2,
      date: "May 22, 2023",
      time: "2:30 PM",
      doctor: "Dr. Sarah Miller",
      type: "Follow-up Session",
      mode: "Virtual",
    },
    {
      id: 3,
      date: "June 5, 2023",
      time: "11:15 AM",
      doctor: "Dr. James Wilson",
      type: "Progress Evaluation",
      mode: "In-person",
    },
  ]

  // Mock data for therapists
  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Miller",
      specialty: "Shoulder Specialist",
      availability: "Available Mon-Thu",
      color: "green",
    },
    {
      id: 2,
      name: "Dr. James Wilson",
      specialty: "Physical Therapist",
      availability: "Available Tue-Fri",
      color: "orange",
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      specialty: "Rehabilitation Expert",
      availability: "Available Wed-Sat",
      color: "blue",
    },
  ]

  // Mock data for appointment history
  const appointmentHistory = [
    {
      id: 1,
      type: "Initial Assessment",
      date: "April 30, 2023",
      doctor: "Dr. Sarah Miller",
      mode: "In-person",
    },
    {
      id: 2,
      type: "Treatment Planning",
      date: "May 7, 2023",
      doctor: "Dr. Sarah Miller",
      mode: "Virtual",
    },
    {
      id: 3,
      type: "Exercise Introduction",
      date: "May 10, 2023",
      doctor: "Dr. James Wilson",
      mode: "In-person",
    },
  ]

  // Mock data for appointment reminders
  const appointmentReminders = [
    {
      id: 1,
      message: "Bring your exercise journal",
      details: "For your May 15 appointment with Dr. Miller",
      enabled: true,
      icon: "bell",
    },
    {
      id: 2,
      message: "Test your video connection",
      details: "Before your May 22 virtual appointment",
      enabled: true,
      icon: "video",
    },
  ]

  return (
    <div className="flex h-screen bg-[#f0f4f9]">
      {/* Sidebar */}
      <div className="w-[78px] bg-gradient-to-b from-[#001a41] to-[#003366] flex flex-col items-center py-6">
        <div className="mb-8">
          <Image src="/kinetic-ai-logo.png" alt="Kinetic Logo" width={40} height={40} />
          <span className="text-white text-xs font-bold mt-1 block text-center">KINETIC</span>
        </div>

        <nav className="flex flex-col items-center space-y-6 flex-1">
          <Link
            href="/dashboard"
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <Home className="w-5 h-5" />
          </Link>
          <Link
            href="/exercises"
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <Activity className="w-5 h-5" />
          </Link>
          <Link
            href="/appointments"
            className="w-10 h-10 rounded-xl bg-[#7e58f4] bg-opacity-20 flex items-center justify-center text-white"
          >
            <Users className="w-5 h-5" />
          </Link>
          <Link
            href="/messages"
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <MessageSquare className="w-5 h-5" />
          </Link>
          <Link
            href="/progress"
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <BarChart2 className="w-5 h-5" />
          </Link>
          <Link
            href="/video-library"
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <FileText className="w-5 h-5" />
          </Link>
        </nav>

        <div className="mt-auto flex flex-col items-center space-y-6">
          <Link
            href="/profile"
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <User className="w-5 h-5" />
          </Link>
          <Link
            href="/settings"
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <Settings className="w-5 h-5" />
          </Link>
          <button
            onClick={logout}
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-[#111827] mb-1">Appointments</h1>
          <p className="text-gray-500 mb-6">Schedule and manage your therapy sessions</p>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`pb-2 px-1 mr-6 text-sm font-medium ${
                activeTab === "overview"
                  ? "text-[#111827] border-b-2 border-[#7e58f4]"
                  : "text-[#6b7280] hover:text-[#111827]"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`pb-2 px-1 mr-6 text-sm font-medium ${
                activeTab === "exercises"
                  ? "text-[#111827] border-b-2 border-[#7e58f4]"
                  : "text-[#6b7280] hover:text-[#111827]"
              }`}
              onClick={() => setActiveTab("exercises")}
            >
              Exercises
            </button>
            <button
              className={`pb-2 px-1 mr-6 text-sm font-medium ${
                activeTab === "appointments"
                  ? "text-[#111827] border-b-2 border-[#7e58f4]"
                  : "text-[#6b7280] hover:text-[#111827]"
              }`}
              onClick={() => setActiveTab("appointments")}
            >
              Appointments
            </button>
            <button
              className={`pb-2 px-1 mr-6 text-sm font-medium ${
                activeTab === "messages"
                  ? "text-[#111827] border-b-2 border-[#7e58f4]"
                  : "text-[#6b7280] hover:text-[#111827]"
              }`}
              onClick={() => setActiveTab("messages")}
            >
              Messages
            </button>
            <button
              className={`pb-2 px-1 mr-6 text-sm font-medium ${
                activeTab === "progress"
                  ? "text-[#111827] border-b-2 border-[#7e58f4]"
                  : "text-[#6b7280] hover:text-[#111827]"
              }`}
              onClick={() => setActiveTab("progress")}
            >
              Progress
            </button>
            <button
              className={`pb-2 px-1 mr-6 text-sm font-medium ${
                activeTab === "submissions"
                  ? "text-[#111827] border-b-2 border-[#7e58f4]"
                  : "text-[#6b7280] hover:text-[#111827]"
              }`}
              onClick={() => setActiveTab("submissions")}
            >
              My Submissions
            </button>
          </div>

          {/* Upcoming Appointments */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#111827]">Upcoming Appointments</h2>
            <Button className="bg-[#014585] hover:bg-[#013a70]">Schedule New Appointment</Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <table className="w-full">
              <tbody>
                {upcomingAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-gray-100 last:border-0">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="font-medium">{appointment.date}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{appointment.time}</td>
                    <td className="py-4 px-6">{appointment.doctor}</td>
                    <td className="py-4 px-6">{appointment.type}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        {appointment.mode === "Virtual" ? (
                          <Video className="h-4 w-4 text-blue-500 mr-2" />
                        ) : (
                          <User className="h-4 w-4 text-green-500 mr-2" />
                        )}
                        {appointment.mode}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Your Therapists */}
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Your Therapists</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {therapists.map((therapist) => (
              <div key={therapist.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full bg-${therapist.color}-100 mr-3`}
                  >
                    <User className={`h-5 w-5 text-${therapist.color}-500`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{therapist.name}</h3>
                    <p className="text-sm text-gray-500">
                      {therapist.specialty} • {therapist.availability}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    Schedule
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Appointment History */}
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Appointment History</h2>
          <div className="space-y-3 mb-8">
            {appointmentHistory.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mr-4">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{appointment.type}</h3>
                      <p className="text-sm text-gray-500">
                        {appointment.date} • {appointment.doctor} • {appointment.mode}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <FileText2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Appointment Reminders */}
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Appointment Reminders</h2>
          <div className="space-y-3">
            {appointmentReminders.map((reminder) => (
              <div key={reminder.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mr-4">
                      {reminder.icon === "bell" ? (
                        <Bell className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Video className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{reminder.message}</h3>
                      <p className="text-sm text-gray-500">{reminder.details}</p>
                    </div>
                  </div>
                  <Switch checked={reminder.enabled} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
