import { Routes, Route } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import OneToOneScenario from "../components/scenarios/OneToOneScenario"
import OneToManyScenario from "../components/scenarios/OneToManyScenario"
import ManyToOneScenario from "../components/scenarios/ManyToOneScenario"
import ResultsPage from "../components/ResultsPage"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/scenarios/one-to-one" element={<OneToOneScenario />} />
            <Route path="/scenarios/one-to-many" element={<OneToManyScenario />} />
            <Route path="/scenarios/many-to-one" element={<ManyToOneScenario />} />
            <Route path="/results" element={<ResultsPage />} />
            {/* <Route path="/scenarios" element={<OneToOneScenario />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  )
}
