import { Navigate, Route, Routes } from "react-router-dom"
import ResultsPage from "../components/ResultsPage"
import ManyToOneScenario from "../components/scenarios/ManyToOneScenario"
import OneToManyScenario from "../components/scenarios/OneToManyScenario"
import OneToOneScenario from "../components/scenarios/OneToOneScenario"
import { useAuth } from "../contexts/AuthContext"
import Login from "../pages/Login"
import ProtectedRoute from "./ProtectedRoute"

export default function Router() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) {
    <Navigate to={'/scenarios/one-to-one'} />
  }
  else {
    <Navigate to={'/'} />
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/scenarios/one-to-one" element={<OneToOneScenario />} />
        <Route path="/scenarios/one-to-many" element={<OneToManyScenario />} />
        <Route path="/scenarios/many-to-one" element={<ManyToOneScenario />} />
        <Route path="/results" element={<ResultsPage />} />
      </Route>
    </Routes>

  )
}
