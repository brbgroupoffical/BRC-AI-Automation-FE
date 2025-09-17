import { useState } from "react"
import { ENDPOINTS } from "../utils/endpoint"
import { useToast } from "../components/ui/toast"

export function useUploadPdf() {
  const [isUploading, setIsUploading] = useState(false)
  const { showToast } = useToast()

  const uploadPdf = async (file) => {
    if (!file) {
      showToast("No file selected", "error")
      return { success: false, error: "No file selected" }
    }

    try {
      setIsUploading(true)

      const formData = new FormData()
      formData.append("file", file)

      const accessToken = localStorage.getItem("accessToken")

      const response = await fetch(ENDPOINTS.GRN_UPLOAD, {
        method: "POST",
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
        body: formData,
      })

      const data = await response.json()
      console.log("Upload API response:", data)

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

  // fallback if no messages array
  if (data?.detail) {
    showToast(data.detail, "error")
    return { success: false, error: data.detail }
  }
}

      if (!response.ok) {
  const errors = []
  if (typeof data === "object") {
    if (data.detail) errors.push(data.detail)
    Object.keys(data).forEach((field) => {
      if (Array.isArray(data[field])) {
        data[field].forEach((msg) => errors.push(`${field}: ${msg}`))
      } else if (typeof data[field] === "string") {
        errors.push(`${field}: ${data[field]}`)
      }
    })
  }
  errors.forEach((msg) => showToast(msg, "error"))
  return { success: false, errors }
}

      
if (response.ok) {
  const successMsg = data?.message || "PDF uploaded successfully!"
  showToast(successMsg, "success")
  return { success: true, data }
}

    } catch (error) {
      console.error("Upload API error:", error)
      showToast(error.message, "error" )
      return { success: false, error: error.message }
    } finally {
      setIsUploading(false)
    }
  }

  return { uploadPdf, isUploading }
}
