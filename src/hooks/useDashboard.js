import { useState, useEffect } from "react"
import { ENDPOINTS } from "../utils/endpoint"
import { useToast } from "../components/ui/toast"

export function useDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [caseLoading,setIsCaseLoading] = useState(false)
  const [error, setError] = useState(null)
  const { showToast } = useToast()

  const fetchStats = async (selectedDays) => {
    console.log(selectedDays)
    try {
      setLoading(true)
      const accessToken = localStorage.getItem("accessToken")

      const url = `${ENDPOINTS.TOTAL_AUTOMATIONS}?days=${selectedDays}`

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      })

      if (res.status === 401) {
        localStorage.removeItem("accessToken")
        showToast("Session expired, please log in again", "error")
        window.location.href = "/"
        return
      }

      if (!res.ok) throw new Error(`Error ${res.status}`)
      const result = await res.json()

      if (result.error) {
        throw new Error(result.error)
      }
      console.log("result inside hook",result)

      setData(result)
      setError(null)
    } catch (err) {
      setError(err.message)
      showToast(`Failed to fetch overall stats: ${err.message}`, "error")
    } finally {
      setLoading(false)
    }
  }

  
const fetchCaseStats = async (caseType, selectedDays) => {
    try {
      setLoading(true)
      const accessToken = localStorage.getItem("accessToken")
      const url = `${ENDPOINTS.CASE_TYPE_STATS}/${caseType}?days=${selectedDays}`
      console.log(url)

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      })

      if (!res.ok) throw new Error(`Error ${res.status}`)
      const result = await res.json()
      return result
    } catch (err) {
      showToast(`Failed to fetch case stats: ${err.message}`, "error")
      return null
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, fetchStats, fetchCaseStats,caseLoading }
}