
import { useAuth } from "../hooks/useAuth"


export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white px-6 py-4 shadow-md ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">BRC AP Invoice System</h1>
          <p className="text-sm text-gray-600">Automated Invoice Processing & Matching</p>
        </div>
      </div>
    </header>
  )
}
