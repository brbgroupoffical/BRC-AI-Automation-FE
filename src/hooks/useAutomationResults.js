import { useEffect, useState } from "react"
import { ENDPOINTS } from "../utils/endpoint"
import { useToast } from "../components/ui/toast"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { removeUser } from "../feature/userSlice"
export function useAutomationResults() {
  const dispatch = useDispatch()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [count, setCount] = useState(0)
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const { showToast } = useToast()
     const {
        access
    } = useSelector((state) => state.user)

  const fetchResults = async (url = ENDPOINTS.AUTOMATION_RESULT, showToastOnSuccess = false) => {
    try {
      setLoading(true)
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: access ? `Bearer ${access}` : "",
        },
      })

      if (res.status === 401) {
         dispatch(removeUser())
        showToast("Session expired, please log in again", "error")
        window.location.href = "/"
        return
      }

        if (!res.ok) {
      let errorMessage = `Error ${res.status}`
      try {
        const errData = await res.json()
        errorMessage = errData.message || errorMessage
      } catch {
        // fallback if response is not JSON
      }
      throw new Error(errorMessage)
    }
      const data = await res.json()

      const formatted = data.results.map(item => ({
        id: item.id,
        fileName: item.filename,
        fileUrl: item.file_url,
        automationStatus: item.status,
        scenario: item.case_type,
        scenarioName: item.case_type?.replaceAll("_", " ") || "N/A",
        // status: item.steps?.[0]?.status || item.status,
        // stepStatus: item.steps?.[0]?.status || "N/A",
        message: item.steps?.[item.steps.length - 1]?.message || "No message available",
          steps: item.steps || [],
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
      const interval = setInterval(() => fetchResults(), 10 * 1000)
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
