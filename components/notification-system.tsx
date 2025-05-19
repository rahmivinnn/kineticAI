"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, MessageSquare, Calendar, Activity, CheckCircle } from "lucide-react"
import { useSocket } from "@/lib/socket-provider"

export type Notification = {
  id: string
  title: string
  message: string
  type: "message" | "appointment" | "exercise" | "progress"
  read: boolean
  timestamp: Date
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [newNotification, setNewNotification] = useState<Notification | null>(null)
  const { socket, isConnected } = useSocket()

  // Simulate receiving notifications
  useEffect(() => {
    if (isConnected) {
      const initialNotifications: Notification[] = [
        {
          id: "1",
          title: "New Message",
          message: "Dr. Sarah Johnson sent you a message",
          type: "message",
          read: false,
          timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        },
        {
          id: "2",
          title: "Appointment Reminder",
          message: "You have an appointment tomorrow at 2:30 PM",
          type: "appointment",
          read: true,
          timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        },
        {
          id: "3",
          title: "Exercise Completed",
          message: "Great job! You've completed today's exercises",
          type: "exercise",
          read: true,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        },
      ]

      setNotifications(initialNotifications)

      // Simulate receiving a new notification after 10 seconds
      const timer = setTimeout(() => {
        const newNotif: Notification = {
          id: "4",
          title: "Progress Update",
          message: "Your therapist has updated your recovery progress",
          type: "progress",
          read: false,
          timestamp: new Date(),
        }
        setNotifications((prev) => [newNotif, ...prev])
        setNewNotification(newNotif)

        // Auto-hide the notification after 5 seconds
        setTimeout(() => {
          setNewNotification(null)
        }, 5000)
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [isConnected])

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification,
      ),
    )
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "appointment":
        return <Calendar className="h-5 w-5 text-purple-500" />
      case "exercise":
        return <Activity className="h-5 w-5 text-green-500" />
      case "progress":
        return <CheckCircle className="h-5 w-5 text-orange-500" />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="h-6 w-6 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notification Panel */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50"
              style={{ transformOrigin: "top right" }}
            >
              <div className="p-3 bg-[#014585] text-white flex justify-between items-center">
                <h3 className="font-semibold">Notifications</h3>
                <button className="text-sm text-blue-100 hover:text-white transition-colors" onClick={markAllAsRead}>
                  Mark all as read
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3 mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-900">{notification.title}</h4>
                            <button
                              className="text-gray-400 hover:text-gray-600"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeNotification(notification.id)
                              }}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatTime(notification.timestamp)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">No notifications</div>
                )}
              </div>
              <div className="p-2 bg-gray-50 text-center">
                <button className="text-sm text-[#014585] hover:underline">View all notifications</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notification for New Notifications */}
      <AnimatePresence>
        {newNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            transition={{ type: "spring", damping: 15 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 z-50 flex items-start max-w-md"
          >
            <div className="flex-shrink-0 mr-3 mt-1">{getNotificationIcon(newNotification.type)}</div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{newNotification.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{newNotification.message}</p>
            </div>
            <button className="ml-4 text-gray-400 hover:text-gray-600" onClick={() => setNewNotification(null)}>
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
