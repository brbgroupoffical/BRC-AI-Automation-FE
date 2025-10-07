import { useState } from "react"
import { useToast } from "../components/ui/toast"
import { ENDPOINTS } from "../utils/endpoint"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { removeUser } from "../feature/userSlice"
export function useDashboard() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [caseLoading,setIsCaseLoading] = useState(false)
  const [error, setError] = useState(null)
  const { showToast } = useToast()
  const { access } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const fetchStats = async (selectedDays) => {
    console.log(selectedDays)
    try {
      setLoading(true)

      const url = `${ENDPOINTS.TOTAL_AUTOMATIONS}?days=${selectedDays}`

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
      const url = `${ENDPOINTS.CASE_TYPE_STATS}/${caseType}?days=${selectedDays}`
      console.log(url)

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: access ? `Bearer ${access}` : "",
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