import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputField from "../components/custom/Input"
import { Button } from "../components/ui/button"
import { CardContent } from "../components/ui/card"
import { useToast } from "../components/ui/toast"
import { useAuth } from "./../hooks/useAuth"
import { useSelector } from "react-redux"
export default function Register() {
  const { isAuthenticated } = useSelector((state) => state.user)
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [error, setError] = useState("")
  const { register, fieldErrors, isLoading } = useAuth()
  const { showToast, ToastContainer } = useToast()
  const navigate = useNavigate()

  // if (isAuthenticated) {
  //   return <Navigate to="/scenarios/one-to-one" replace />
  // }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }
    const result = await register(form)
    if (result.success) {
      showToast("Account created successfully!", "success")
      navigate("/")
    }
    else {
      if (result.errors && result.errors.length > 0) {
        result.errors.forEach((err) => {
          console.error("Register error:", err)
        }
        )
        setError(result.errors.join(", "))
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
      <div className="w-full max-w-md bg-white py-5 rounded-lg shadow-lg">
        <div className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <img src="/assets/brc-logo.png" alt="BRC Logo" className="h-16 w-auto" />
          </div>
          <div className="text-2xl font-bold text-green-700">Create Account</div>
          <p className="text-sm text-muted-foreground">Register for BRC AP Invoice System</p>
        </div>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              error={fieldErrors.username}
              id={'username'}
              placeholder={'Enter Your username'}
              value={form.username} onChange={
                (e) => setForm(
                  { ...form, username: e.target.value }
                )
              }
              label={'Username'}
              type={'text'}
            />

            <InputField
              id={'email'}
              placeholder={'Enter Your email'}
              value={form.email}
              onChange={(e) => setForm(
                { ...form, email: e.target.value }
              )}
              label={'Email'}
              type={'email'}
              error={fieldErrors.email}
            />

            <InputField
              id={'password'}
              placeholder={'Enter Your password'}
              value={form.password}
              onChange={
                (e) => setForm(
                  { ...form, password: e.target.value }
                )
              }
              label={'Password'}
              type={'password'}
              error={error || fieldErrors.password1}
            />
            <InputField
              id={'confirmPassword'}
              placeholder={'Confirm Your password'}
              value={form.confirmPassword}
              onChange={
                (e) => setForm(
                  { ...form, confirmPassword: e.target.value }
                )
              }
              label={'Confirm Password'}
              type={'password'}
              error={fieldErrors.password2}
            />
            {fieldErrors.non_field_errors && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {fieldErrors.non_field_errors}
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
      </div>
    </div>
  )
}
