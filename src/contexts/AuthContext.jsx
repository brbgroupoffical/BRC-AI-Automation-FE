

import { createContext, useContext, useState, useEffect  } from "react"
import { ENDPOINTS } from "../utils/endpoint"
import { useToast } from "../components/ui/toast"
const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

function decodeToken(token) {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Failed to decode token:", error)
    return null
  }
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


    useEffect(() => {
  const accessToken = localStorage.getItem("accessToken")
  if (accessToken) {
    const decoded = decodeToken(accessToken)
    if (decoded) {
      setUser({
        username: decoded.username || decoded.user || decoded.sub, // depends on backend claims
        email: decoded.email || null,
      })
      setIsAuthenticated(true)
    }
  }
  setLoading(false)
}, [])



  const login = async (username, email, password) => {
  try {
    const response = await fetch(ENDPOINTS.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })

    const data = await response.json()
    console.log("Login API response:", data)

    if (!response.ok) {
      const errors = []
      if (typeof data === "object") {
        Object.keys(data).forEach((field) => {
          if (Array.isArray(data[field])) {
            data[field].forEach((msg) => errors.push(`${field}: ${msg}`))
          } else if (typeof data[field] === "string") {
            errors.push(`${field}: ${data[field]}`)
          }
        })
      }
      return { success: false, errors: errors.length ? errors : ["Login failed"] }
    }

      if (data.access) localStorage.setItem("accessToken", data.access)
    if (data.refresh) localStorage.setItem("refreshToken", data.refresh)

    // ✅ Save user session
    setUser({
      username: data.username || username,
      email: data.email || email,
    })
    setIsAuthenticated(true)

    return { success: true, data }
  } catch (error) {
    console.error("Login API error:", error)
    return { success: false, errors: [error.message] }
  }
}

const register = async (username, email, password1, password2) => {
    try {
      const response = await fetch(ENDPOINTS.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password1, password2 }),
      })

      const data = await response.json()
      console.log("Register API response:", data)

      if (!response.ok) {
        // Collect error messages
        const errors = []
        if (typeof data === "object") {
          Object.keys(data).forEach((field) => {
            if (Array.isArray(data[field])) {
              data[field].forEach((msg) => errors.push(`${field}: ${msg}`))
            }
          })
        }
        return { success: false, errors: errors.length ? errors : ["Registration failed"] }
      }

      return { success: true, data }
    } catch (error) {
      console.error("Register API error:", error)
      return { success: false, errors: [error.message] }
    }
  }



const logout = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken")
    const accessToken = localStorage.getItem("accessToken")

    const response = await fetch(ENDPOINTS.LOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    // 👇 safely parse response (205 has no body)
    let data = null
    try {
      data = await response.json()
    } catch (err) {
      data = null
    }

    console.log("Logout API response:", data)

    // 🔐 Handle unauthorized with token expired
    if (response.status === 401) {
      if (Array.isArray(data?.messages)) {
        const expiredMsg = data.messages.find(
          (msg) => msg?.message?.toLowerCase().includes("expired")
        )
        if (expiredMsg) {
          showToast(`message: ${expiredMsg.message}`, "error")
          return { success: false, error: expiredMsg.message }
        }
      }

      if (data?.detail) {
        showToast(data.detail, "error")
        return { success: false, error: data.detail }
      }
    }

    // ❌ Generic failure
    if (!response.ok) {
      showToast(data?.detail || "Logout failed", "error")
      return { success: false, errors: [data?.detail || "Logout failed"] }
    }

    // ✅ Clear tokens & session
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setUser(null)
    setIsAuthenticated(false)

    return { success: true }
  } catch (error) {
    console.error("Logout API error:", error)
    return { success: false, errors: [error.message] }
  }
}




  const value = {
    user,
    isAuthenticated,
    loading, setUser, setIsAuthenticated,
    register,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
