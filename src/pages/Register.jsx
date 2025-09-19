import { useState ,useEffect  } from "react"
import { Navigate, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { useToast } from "../components/ui/toast"

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { register, isAuthenticated } = useAuth()
  const { showToast, ToastContainer } = useToast()
  const navigate = useNavigate()

  if (isAuthenticated) {
    return <Navigate to="/scenarios" replace />
  }

useEffect(() => {
  if (error) {
    const timer = setTimeout(() => {
      setError("") // hide after 2 seconds
    }, 2000)

    return () => clearTimeout(timer) // cleanup
  }
}, [error])



//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError("")

//     if (password1 !== password2) {
//       setError("Passwords do not match")
//       setIsLoading(false)
//       return
//     }

//     if (password1.length < 8) {
//       setError("Password must be at least 8 characters long")
//       setIsLoading(false)
//       return
//     }

//     const result = await register(username, email, password1, password2)

// if (result.success) {
//   showToast("Account created successfully!", "success")
//   navigate("/") // redirect to login
// } else {
//   if (result.errors && result.errors.length > 0) {
//     result.errors.forEach((err) => {
//       showToast(err, "error")
//       console.error("Register error:", err)
//     })
//     setError(result.errors.join(", "))
//   } else {
//     showToast("Registration failed", "error")
//     console.error("Unknown register error:", result)
//     setError("Registration failed")
//   }
// }

//   }

const handleSubmit = async (e) => {
  e.preventDefault()
  setIsLoading(true)
  setError("")

  if (password1 !== password2) {
    setError("Passwords do not match")
    setIsLoading(false)
    return
  }

  if (password1.length < 8) {
    setError("Password must be at least 8 characters long")
    setIsLoading(false)
    return
  }

  try {
    const result = await register(username, email, password1, password2)

    if (result.success) {
      showToast("Account created successfully!", "success")
      navigate("/") // redirect to login
    } else {
      if (result.errors && result.errors.length > 0) {
        result.errors.forEach((err) => {
          showToast(err, "error")
          console.error("Register error:", err)
        })
        setError(result.errors.join(", "))
      } else {
        showToast("Registration failed", "error")
        console.error("Unknown register error:", result)
        setError("Registration failed")
      }
    }
  } catch (err) {
    console.error("Unexpected error:", err)
    showToast("Something went wrong. Please try again.", "error")
    setError("Unexpected error occurred")
  } finally {
    // ✅ loader hamesha stop hoga chahe success ho ya fail
    setIsLoading(false)
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <ToastContainer />
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <img src="/assets/brc-logo.png" alt="BRC Logo" className="h-16 w-auto" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-700">Create Account</CardTitle>
          <p className="text-sm text-muted-foreground">Register for BRC AP Invoice System</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="space-y-2">
              <label htmlFor="password1" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password1"
                type="password"
                placeholder="Enter your password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                required
                className="focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password2" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="password2"
                type="password"
                placeholder="Confirm your password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
                className="focus:ring-green-500 focus:border-green-500"
              />
            </div>
            {error && (
  <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
    {error}
  </div>
)}

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/" className="text-green-600 hover:text-green-700 font-medium">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
