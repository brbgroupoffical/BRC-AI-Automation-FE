import { useState, useEffect } from "react"
import { ENDPOINTS } from "../utils/endpoint"
import { useToast } from "../components/ui/toast"

export function useOverallStats(days = 7) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { showToast } = useToast()

  const fetchStats = async (selectedDays = days) => {
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

      setData(result)
      setError(null)
    } catch (err) {
      setError(err.message)
      showToast(`Failed to fetch overall stats: ${err.message}`, "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats(days)
  }, [days])

  return { data, loading, error, refetch: fetchStats }
}
