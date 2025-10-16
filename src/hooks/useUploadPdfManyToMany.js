import { useState } from "react"
import { ENDPOINTS } from "../utils/endpoint"
import { useToast } from "../components/ui/toast"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setLoading } from "../feature/loaderSlice"
export function useUploadPdfManyToMany() {
  const dispatch = useDispatch()
  const { showToast } = useToast()
    const {
    access
  } = useSelector((state) => state.user)

  const uploadPdf = async (file) => {
    if (!file) {
      showToast("No file selected", "error")
      return { success: false, error: "No file selected" }
    }

    try {
      dispatch(setLoading({ key: "manyToManyLoader", value: true }))
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(ENDPOINTS.GRN_UPLOAD_MANYTOMANY, {
        method: "POST",
        headers: {
          Authorization: access ? `Bearer ${access}` : "",
        },
        body: formData,
      })

      const data = await response.json()
      console.log("Upload API response (Many:Many):", data)

      if (response.status === 401) {
        if (Array.isArray(data?.messages)) {
          const expiredMsg = data.messages.find(
            (msg) => msg?.message?.toLowerCase().includes("expired")
          )
          if (expiredMsg) {
            showToast(`message: ${expiredMsg.message}`, "error")
            return { success: false, error: expiredMsg.message }
          }
        }

        if (data?.detail) {
          showToast(data.detail, "error")
          return { success: false, error: data.detail }
        }
      }

      // ❌ Handle other errors
      if (!response.ok) {
        const errors = []
        if (data.detail) errors.push(data.detail)

        Object.entries(data).forEach(([field, value]) => {
          if (Array.isArray(value)) {
            value.forEach((msg) => errors.push(`${field}: ${msg}`))
          } else if (typeof value === "string" && field !== "detail") {
            errors.push(`${field}: ${value}`)
          }
        })

        errors.forEach((msg) => showToast(msg, "error"))
        return { success: false, errors }
      }

      // ✅ Success
      const successMsg = data?.message || "PDF uploaded successfully!"
      showToast(successMsg, "success")
      return { success: true, data }

    } catch (error) {
      console.error("Upload API error:", error)
      showToast(error.message || "Unexpected error occurred", "error",6000)
      return { success: false, error: error.message }
    } finally {
       dispatch(setLoading({ key: "manyToManyLoader", value: false }))
    }
  }

  return { uploadPdf }
}
