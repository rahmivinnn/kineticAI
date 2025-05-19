"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Bell, Calendar, CheckCircle, Clock, FileText, MessageSquare, Shield, Trophy, User } from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile Management</h1>
          <p className="text-muted-foreground">Manage your personal information and account settings</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 border-b pb-4">
        <Link href="/profile" className="text-sm font-medium">
          Personal Info
        </Link>
        <Link href="/profile/account-settings" className="text-sm font-medium">
          Account Settings
        </Link>
        <Link href="/profile/notifications" className="text-sm font-medium border-b-2 border-primary pb-4 -mb-4">
          Notifications
        </Link>
        <Link href="/profile/privacy" className="text-sm font-medium">
          Privacy
        </Link>
        <Link href="/profile/billing" className="text-sm font-medium">
          Billing
        </Link>
      </div>

      <div className="space-y-8">
        {/* Email Notifications */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Email Notifications</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Appointment Reminders</div>
                  <div className="text-sm text-muted-foreground">Receive emails about upcoming appointments</div>
                </div>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Exercise Updates</div>
                  <div className="text-sm text-muted-foreground">Get notified when new exercises are assigned</div>
                </div>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Progress Reports</div>
                  <div className="text-sm text-muted-foreground">Weekly summary of your recovery progress</div>
                </div>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Account Updates</div>
                  <div className="text-sm text-muted-foreground">Security and account-related notifications</div>
                </div>
              </div>
              <Switch checked={true} />
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Push Notifications</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Enable Push Notifications</div>
                  <div className="text-sm text-muted-foreground">Allow notifications on your device</div>
                </div>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Appointment Alerts</div>
                  <div className="text-sm text-muted-foreground">Get reminders 1 hour before appointments</div>
                </div>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Exercise Reminders</div>
                  <div className="text-sm text-muted-foreground">Daily reminders to complete your exercises</div>
                </div>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Messages</div>
                  <div className="text-sm text-muted-foreground">Notifications for new messages</div>
                </div>
              </div>
              <Switch checked={true} />
            </div>
          </div>
        </div>

        {/* In-App Notifications */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">In-App Notifications</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <Trophy className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Achievement Badges</div>
                  <div className="text-sm text-muted-foreground">Notifications for earned achievements</div>
                </div>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Milestone Alerts</div>
                  <div className="text-sm text-muted-foreground">Notifications when you reach recovery milestones</div>
                </div>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Feedback Requests</div>
                  <div className="text-sm text-muted-foreground">Prompts to provide feedback after sessions</div>
                </div>
              </div>
              <Switch checked={true} />
            </div>
          </div>
        </div>

        {/* Notification Schedule */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Notification Schedule</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Quiet Hours</div>
                  <div className="text-sm text-muted-foreground">Don't send notifications during selected hours</div>
                </div>
              </div>
              <Switch checked={true} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="start-time" className="text-sm font-medium">
                  Start Time
                </label>
                <div className="relative">
                  <input
                    id="start-time"
                    type="time"
                    defaultValue="22:00"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="end-time" className="text-sm font-medium">
                  End Time
                </label>
                <div className="relative">
                  <input
                    id="end-time"
                    type="time"
                    defaultValue="07:00"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700">Save Notification Preferences</Button>
      </div>
    </div>
  )
}
