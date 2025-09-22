import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import InputField from "../components/custom/Input"
import { Button } from "../components/ui/button"
import { useToast } from "../components/ui/toast"
import { useAuth } from "./../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
export default function Login() {
  const {
    isAuthenticated
  } = useSelector((state) => state.user)

  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const { showToast, ToastContainer } = useToast()
  const { login, isLoading, fieldErrors } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const result = await login(form)
    if (result.success) {
      showToast("Login successful!", "success")
      navigate("/scenarios/one-to-one")
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
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/scenarios/one-to-one")
    }
  }, [isAuthenticated, navigate])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <img src="/assets/brc-logo.png" alt="BRC Logo" className="h-16 w-auto" />
          </div>
          <div className="text-2xl font-bold text-green-700">BRC AP Invoice System</div>
          <p className="text-sm text-muted-foreground">Sign in to access your account</p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Username"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={form.username}
              error={fieldErrors.username}
              onChange={
                (e) => setForm({ ...form, username: e.target.value })
              }
              required
            />
            <InputField
              label="Email"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              error={fieldErrors.email}
              onChange={
                (e) => setForm({ ...form, email: e.target.value })
              }
              required
            />
            <InputField
              label="Password"
              id="password"
              type="password"
              error={fieldErrors.password}
              placeholder="Enter your password"
              value={form.password}
              onChange={
                (e) => setForm({ ...form, password: e.target.value })
              }
              required
            />
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
        </div>
      </div>
    </div>
  )
}
