import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { useAuth } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"
export default function ProtectedRoute() {
    const { isAuthenticated } = useAuth()
    if (!isAuthenticated) {
      return <Navigate to="/" replace />
    }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}