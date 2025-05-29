import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminAuth } from "@/components/admin/admin-auth"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminAuth>
        <AdminDashboard />
      </AdminAuth>
    </div>
  )
}
