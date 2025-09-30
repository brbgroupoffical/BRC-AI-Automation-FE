import { useState , useEffect} from "react"
import { Navigate, Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { useToast } from "../components/ui/toast"
import {Eye , EyeOff} from "lucide-react"

export default function Login() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login, isAuthenticated } = useAuth()
  const { showToast, ToastContainer } = useToast()

  if (isAuthenticated) {
    return <Navigate to="/scenarios/one-to-one" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const result = await login(username, email, password)

    if (result.success) {
      showToast("Login successful!", "success")
    } else {
      if (result.errors && result.errors.length > 0) {
        result.errors.forEach((err) => {
          showToast(err, "error")
          console.error("Login error:", err)
        })
        setError(result.errors.join(", "))
      } else {
        showToast("Login failed", "error")
        console.error("Unknown login error:", result)
        setError("Login failed")
      }
    }

    setIsLoading(false)
  }

  
const togglePassword = () => {
  setShowPassword(!showPassword);
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <ToastContainer />
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <img src="/assets/brc-logo.png" alt="BRC Logo" className="h-16 w-auto" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-700">BRC AP Invoice System</CardTitle>
          <p className="text-sm text-muted-foreground">Sign in to access your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username field */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="focus:ring-green-500 focus:border-green-500"
              />
            </div>
            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:ring-green-500 focus:border-green-500"
              />
            </div>
            {/* Password field */}
            <div className="space-y-2">
  <label htmlFor="password" className="text-sm font-medium">
    Password
  </label>
  <div className="relative">
    <Input
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="focus:ring-green-500 focus:border-green-500 pr-10"
    />
    <button
      type="button"
      onClick={togglePassword}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
  </div>
</div>

            {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
                Create account
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
