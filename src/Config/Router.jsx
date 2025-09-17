import { Route, Routes } from "react-router-dom"
import ResultsPage from "../components/ResultsPage"
import ManyToManyScenario from "../components/scenarios/ManyToManyScenario"
import OneToManyScenario from "../components/scenarios/OneToManyScenario"
import OneToOneScenario from "../components/scenarios/OneToOneScenario"
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
        <Route path="/scenarios/many-to-many" element={<ManyToManyScenario />} />
        <Route path="/results" element={<ResultsPage />} />
      </Route>
    </Routes>
  )
}
