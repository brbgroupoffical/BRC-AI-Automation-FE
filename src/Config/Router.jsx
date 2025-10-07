import { Route, Routes } from "react-router-dom"
import ResultsPage from "../components/others/ResultsPage"
import ManyToOneScenario from "../components/scenarios/ManyToOneScenario"
import OneToManyScenario from "../components/scenarios/OneToManyScenario"
import OneToOneScenario from "../components/scenarios/OneToOneScenario"
import Dashboard from "../components/Dashboard/dashboard"
import Register from "../pages/Register"
import Login from "../pages/Login"
import ProtectedRoute from "./ProtectedRoute"

export default function Router() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/scenarios/one-to-one" element={<OneToOneScenario />} />
        <Route path="/scenarios/one-to-many" element={<OneToManyScenario />} />
        <Route path="/scenarios/many-to-one" element={<ManyToOneScenario />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}
