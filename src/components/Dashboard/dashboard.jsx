import React, { useState, useEffect } from "react"
import { useDashboard } from "../../hooks/useDashboard"
import OverallStatistics from "./OverallStatistics"
import CaseTypeAnalysis from "./CaseTypeAnalysis"

export default function Dashboard() {
  const [overallDaysFilter, setOverallDaysFilter] = useState(7)
  const [casesDaysFilter, setCasesDaysFilter] = useState(7)
  const [selectedCaseType, setSelectedCaseType] = useState("one_to_one")
  const [caseData, setCaseData] = useState(null)
  const { fetchStats, data, loading, error ,fetchCaseStats,caseLoading} = useDashboard()

  useEffect(() => {
    fetchStats(overallDaysFilter)
  }, [overallDaysFilter])

  
  useEffect(() => {
    const loadCaseData = async () => {
      const result = await fetchCaseStats(selectedCaseType, casesDaysFilter)
      if (result) setCaseData(result)
    }
    loadCaseData()
  }, [selectedCaseType, casesDaysFilter])


  return (
    <div className="min-h-screen">
      <header>
        <div className="px-8 py-4">
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Analytics Dashboard</h1>
          <p className="text-gray-500 mt-2 font-medium">
            Monitor your performance metrics in real-time
          </p>
        </div>
      </header>

      <div className="p-8 space-y-12">
        <OverallStatistics
          data={data}
          loading={loading}
          error={error}
          overallDaysFilter={overallDaysFilter}
          setOverallDaysFilter={setOverallDaysFilter}
        />

        <CaseTypeAnalysis
          selectedCaseType={selectedCaseType}
          setSelectedCaseType={setSelectedCaseType}
          casesDaysFilter={casesDaysFilter}
          setCasesDaysFilter={setCasesDaysFilter}
          fetchCaseStats={fetchCaseStats}
          loading={caseLoading}
          caseData={caseData}
        />
      </div>
    </div>
  )
}
