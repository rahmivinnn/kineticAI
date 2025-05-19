"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ChevronRight, Download, FileText, Lock, Shield, Trash2, User, Users } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
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
        <Link href="/profile/notifications" className="text-sm font-medium">
          Notifications
        </Link>
        <Link href="/profile/privacy" className="text-sm font-medium border-b-2 border-primary pb-4 -mb-4">
          Privacy
        </Link>
        <Link href="/profile/billing" className="text-sm font-medium">
          Billing
        </Link>
      </div>

      <div className="space-y-8">
        {/* Data Sharing */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Data Sharing</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Share with Healthcare Providers</div>
                  <div className="text-sm text-muted-foreground">Allow your therapist to access your data</div>
                </div>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Share with Research Partners</div>
                  <div className="text-sm text-muted-foreground">Anonymized data for medical research</div>
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
                  <div className="font-medium">Share with Insurance Provider</div>
                  <div className="text-sm text-muted-foreground">Allow your insurance to access progress data</div>
                </div>
              </div>
              <Switch checked={true} />
            </div>
          </div>
        </div>

        {/* Profile Visibility */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Profile Visibility</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Exercise Progress</div>
                  <div className="text-sm text-muted-foreground">Who can see your exercise completion data</div>
                </div>
              </div>
              <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <option>Healthcare Team Only</option>
                <option>Healthcare Team & Family</option>
                <option>All Connections</option>
                <option>Private</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Recovery Milestones</div>
                  <div className="text-sm text-muted-foreground">Who can see your achievement badges</div>
                </div>
              </div>
              <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <option>Healthcare Team Only</option>
                <option>Healthcare Team & Family</option>
                <option>All Connections</option>
                <option>Private</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Video Submissions</div>
                  <div className="text-sm text-muted-foreground">Who can access your exercise videos</div>
                </div>
              </div>
              <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <option>Healthcare Team Only</option>
                <option>Healthcare Team & Family</option>
                <option>All Connections</option>
                <option>Private</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Data Management</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <Download className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Download My Data</div>
                  <div className="text-sm text-muted-foreground">Export all your personal data</div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <Trash2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Delete Exercise History</div>
                  <div className="text-sm text-muted-foreground">Remove all exercise tracking data</div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <Trash2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Delete Video Submissions</div>
                  <div className="text-sm text-muted-foreground">Remove all uploaded exercise videos</div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Consent Management */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Consent Management</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Terms of Service</div>
                  <div className="text-sm text-muted-foreground">View and manage your agreement</div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <Lock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Privacy Policy</div>
                  <div className="text-sm text-muted-foreground">View our privacy policy</div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Cookie Preferences</div>
                  <div className="text-sm text-muted-foreground">Manage website cookie settings</div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700">Save Privacy Settings</Button>
      </div>
    </div>
  )
}
