import { Link, useLocation, useNavigate } from "react-router-dom"

import { ArrowDownLeft, ArrowRightLeft, ArrowUpRight, BarChart3, LogOut } from "lucide-react"
import { cn } from "../../lib/utils"
import { useToast } from "../ui/toast"
import { useAuth } from "../../hooks/useAuth"
// import { useAuth } from "../../contexts/AuthContext"


const scenarios = [
  
  
  
  {
    id: "one-to-one",
    name: "1:1 AP Invoice",
    icon: ArrowRightLeft,
    path: "/scenarios/one-to-one",
    description: "One-to-One Invoice Matching",
    available: true,
  },
  {
    id: "one-to-many",
    name: "1:Many AP Invoice",
    icon: ArrowUpRight,
    path: "/scenarios/one-to-many",
    description: "One-to-Many Invoice Matching",
    available: true,
  },
  {
    id: "many-to-one",
    name: "Many:1 AP Invoice",
    icon: ArrowDownLeft,
    path: "/scenarios/many-to-one",
    description: "Many-to-One Invoice Matching",
    available: true,
  },
]

const otherItems = [
  {
    id: "results",
    name: "Results",
    icon: BarChart3,
    path: "/results",
    description: "View Processing Results",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    description: "Data visualization",
    available: true,
  },

]

export default function Sidebar() {
  const {
    logout
  } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()

  // const { user, logout } = useAuth()

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      showToast({ title: "Logged out successfully!" })
      navigate("/")
    } else {
      showToast({ title: "Logout failed", variant: "destructive" })
    }
  }



  const NavItem = ({ item, isActive }) => (
    <div className="relative group">
      <Link
        to={item.available !== false ? item.path : "#"}
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200",
          isActive
            ? "bg-green-600 text-white shadow-lg"
            : item.available !== false
              ? "text-gray-600 hover:bg-green-50 hover:text-green-600"
              : "text-gray-400 cursor-not-allowed",
          "relative",
        )}
        onClick={item.available === false ? (e) => e.preventDefault() : undefined}
      >
        <item.icon className="w-5 h-5" />
        {item.available === false && (
          <div className="absolute inset-0 bg-gray-200 bg-opacity-50 rounded-lg flex items-center justify-center">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
        )}
      </Link>

      <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
        <div className="font-medium">{item.name}</div>
        <div className="text-xs text-gray-300">{item.description}</div>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900"></div>
      </div>
    </div>
  )

  return (


    <div className="w-20 bg-white border-r border-gray-200 flex flex-col">
      <ToastContainer />
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <img src="/assets/brc-logo.png" alt="BRC" className="h-8 w-auto" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {/* Scenarios Section */}
        <div className="space-y-2">
          {scenarios.map((item) => (
            <NavItem key={item.id} item={item} isActive={location.pathname === item.path} />
          ))}
        </div>
        <div className="space-y-2">
          {otherItems.map((item) => (
            <NavItem key={item.id} item={item} isActive={location.pathname === item.path} />
          ))}
        </div>
      </nav>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      <div className="flex flex-col items-center space-y-2 p-2">
        {/* User (email tooltip) */}
        {/* <div className="relative group">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600">
            <User className="w-5 h-5" />
          </div>
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
            <div className="font-medium">User</div>
            <div className="text-xs text-gray-300">{user?.email}</div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900"></div>
          </div>
        </div> */}

        {/* Logout */}
        <div className="relative group">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-12 h-12 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="w-5 h-5" />
          </button>
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
            <div className="font-medium">Logout</div>
            <div className="text-xs text-gray-300">Sign out of your account</div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
