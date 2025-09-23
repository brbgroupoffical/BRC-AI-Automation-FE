import { useState } from "react"
import { ENDPOINTS } from "../utils/endpoint"
import { useToast } from "../components/ui/toast"
import { useSelector } from "react-redux"
import { setLoading } from "../feature/loaderSlice"
import { useDispatch } from "react-redux"
export function useUploadPdf() {
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
      dispatch(setLoading({ key: 'oneToOneLoader', value: true }))
      const formData = new FormData()
      formData.append("file", file)
      const response = await fetch(ENDPOINTS.GRN_UPLOAD, {
        method: "POST",
        headers: {
          Authorization: access ? `Bearer ${access}` : "",
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
          if (data.message) errors.push(data.message) // ✅ handle "message"
          if (data.detail) errors.push(data.detail)

          Object.keys(data).forEach((field) => {
            if (Array.isArray(data[field])) {
              data[field].forEach((msg) => errors.push(`${field}: ${msg}`))
            } else if (typeof data[field] === "string" && field !== "message") {
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
      let errorMessage = "An unexpected error occurred";
      if (error.response) {
        // axios style
        errorMessage = error.response.data?.message || error.message;
      } else if (error.message) {
        // native Error
        errorMessage = error.message;
      }

      showToast(errorMessage, "error", 6000);
      return { success: false, error: errorMessage };

      // showToast(error.message, "error" )
      // return { success: false, error: error.message }
    } finally {
    dispatch(setLoading({ key: 'oneToOneLoader', value: false }))
    }
  }

  return { uploadPdf }
}
