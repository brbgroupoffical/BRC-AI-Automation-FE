import { useEffect, useState } from "react"
import { ENDPOINTS } from "../utils/endpoint"
import { useToast } from "../components/ui/toast"

export function useAutomationResults() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [count, setCount] = useState(0)
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const { showToast } = useToast()

  const fetchResults = async (url = ENDPOINTS.AUTOMATION_RESULT, showToastOnSuccess = false) => {
    try {
      setLoading(true)
      const accessToken = localStorage.getItem("accessToken")

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
      const data = await res.json()

      // map results
      const formatted = data.results.map(item => ({
        id: item.id,
        fileName: item.filename,
        scenario: item.case_type,
        scenarioName: item.case_type?.replaceAll("_", " ") || "N/A",
        status: item.steps?.[0]?.status || item.status,
        message: item.steps?.[0]?.message || "No message available",
        createdAt: item.created_at,
      }))

      setResults(formatted)
      setCount(data.count)
      setNext(data.next)
      setPrevious(data.previous)
      setError(null)

      if (showToastOnSuccess) showToast("Results refreshed successfully", "success")
    } catch (err) {
      setError(err.message)
      showToast(`Failed to fetch results: ${err.message}`, "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResults()
    const interval = setInterval(() => fetchResults(), 2 * 60 * 1000)
      // const interval = setInterval(() => fetchResults(), 10 * 1000)


    return () => clearInterval(interval)
  }, [])

  return {
    results,
    loading,
    error,
    count,
    next,
    previous,
    refetch: () => fetchResults(ENDPOINTS.AUTOMATION_RESULT, true),
    fetchPage: (url) => fetchResults(url, false),
  }
}
