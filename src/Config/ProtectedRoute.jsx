import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/others/Header"
import Sidebar from "../components/others/Sidebar"
import { useSelector } from "react-redux"

export default function ProtectedRoute() {
  const { isAuthenticated } = useSelector((state) => state.user)


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
