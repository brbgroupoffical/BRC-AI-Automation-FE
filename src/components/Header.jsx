
import { useAuth } from "../contexts/AuthContext"
// import { Button } from "./ui/button"
// import { LogOut, User } from "lucide-react"

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white px-6 py-4 shadow-md ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">BRC AP Invoice System</h1>
          <p className="text-sm text-gray-600">Automated Invoice Processing & Matching</p>
        </div>

        {/* <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>{user?.email}</span>
          </div>
          <Button variant="outline" size="sm" onClick={logout} className="flex items-center space-x-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div> */}
      </div>
    </header>
  )
}
