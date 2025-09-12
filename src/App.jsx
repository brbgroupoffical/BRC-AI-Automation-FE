
import { Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import Router from "./Config/Router"

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Router />
    </div>
  )
}

export default App
