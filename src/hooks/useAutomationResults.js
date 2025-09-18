import { useEffect, useState } from "react"
import { ENDPOINTS } from "../utils/endpoint"
import { useToast } from "../components/ui/toast"

export function useAutomationResults() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { showToast } = useToast()

  const fetchResults = async (showToastOnSuccess = false) => {
    try {
      setLoading(true)
      const accessToken = localStorage.getItem("accessToken")

      const res = await fetch(ENDPOINTS.AUTOMATION_RESULT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      })

      // 🔐 Handle Unauthorized (token expired)
      if (res.status === 401) {
        localStorage.removeItem("accessToken")
        showToast("Session expired, please log in again", "error")

        // optional redirect
        window.location.href = "/login"
        return
      }

      if (!res.ok) throw new Error(`Error ${res.status}`)
      const data = await res.json()

      // 🔹 Map API response → table-friendly objects
      const formatted = data.map(item => ({
        id: item.id,
        fileName: item.filename,
        scenario: item.case_type, // e.g. "one_to_one"
        scenarioName: item.case_type?.replaceAll("_", " ") || "N/A",
        status: item.steps?.[0]?.status || item.status,
        message: item.steps?.[0]?.message || "No message available",
        createdAt: item.created_at,
      }))

      setResults(formatted)
      setError(null)

      if (showToastOnSuccess) {
        showToast("Results refreshed successfully", "success")
      }
    } catch (err) {
      setError(err.message)
      showToast(`Failed to fetch results: ${err.message}`, "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResults()
    const interval = setInterval(() => fetchResults(), 20 * 60 * 1000) // every 20 mins
    return () => clearInterval(interval)
  }, [])

  return { results, loading, error, refetch: () => fetchResults(true) }
}
