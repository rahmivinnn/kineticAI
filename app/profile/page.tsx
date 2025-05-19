import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, User, Mail, Phone, Upload, Trash2 } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile Management</h1>
          <p className="text-muted-foreground">Manage your personal information and account settings</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 border-b pb-4">
        <Link href="/profile" className="text-sm font-medium border-b-2 border-primary pb-4 -mb-4">
          Personal Info
        </Link>
        <Link href="/profile/account-settings" className="text-sm font-medium">
          Account Settings
        </Link>
        <Link href="/profile/notifications" className="text-sm font-medium">
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
        {/* Profile Picture */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Profile Picture</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                    <User className="h-12 w-12 text-green-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-center sm:text-left">Alex Johnson</h3>
                  <p className="text-sm text-muted-foreground text-center sm:text-left">
                    Upload a new photo or edit your current profile picture
                  </p>
                  <div className="flex gap-2 justify-center sm:justify-start">
                    <Button size="sm" className="gap-1">
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" defaultValue="Alex Johnson" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Input id="email" defaultValue="alex.johnson@example.com" />
                <Mail className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Input id="phone" defaultValue="(555) 123-4567" />
                <Phone className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <div className="relative">
                <Input id="dob" defaultValue="05/12/1985" />
                <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Medical Information</h2>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="condition">Primary Condition</Label>
              <Input id="condition" defaultValue="Rotator Cuff Injury" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Input id="allergies" defaultValue="None" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea id="medications" defaultValue="Ibuprofen as needed" />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Emergency Contact</h2>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Contact Name</Label>
              <Input id="contact-name" defaultValue="Emily Johnson" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship</Label>
              <Input id="relationship" defaultValue="Spouse" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-phone">Phone Number</Label>
              <div className="relative">
                <Input id="contact-phone" defaultValue="(555) 987-6543" />
                <Phone className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    </div>
  )
}
