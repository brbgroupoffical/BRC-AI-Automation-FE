import { useDispatch, useSelector } from "react-redux"
import { useToast } from "../components/ui/toast"
import { setLoading } from "../feature/loaderSlice"
import { ENDPOINTS } from "../utils/endpoint"

export function useUploadPdfOneToMany() {
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
      dispatch(setLoading({ key: "oneToManyLoader", value: true }))
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(ENDPOINTS.GRN_UPLOAD_ONETOMANY, {
        method: "POST",
        headers: {
          Authorization: access ? `Bearer ${access}` : "",
        },
        body: formData,
      })

      const data = await response.json()
      console.log("Upload API response (1:Many):", data)

        

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

        //   if (data?.detail) {
        //     showToast(data.detail, "error")
        //     return { success: false, error: data.detail }
        //   }
        // }

        // ❌ Handle other errors
        // if (!response.ok) {
        //   const errors = []
        //   if (data.detail) errors.push(data.detail)

        //   Object.entries(data).forEach(([field, value]) => {
        //     if (Array.isArray(value)) {
        //       value.forEach((msg) => errors.push(`${field}: ${msg}`))
        //     } else if (typeof value === "string" && field !== "detail") {
        //       errors.push(`${field}: ${value}`)
        //     }
        //   })

        //   errors.forEach((msg) => showToast(msg, "error"))
        //   return { success: false, errors }
        // }
      }
      // ❌ Handle other errors
      if (!response.ok || data.success === false) {
        const errorMsg =
          data?.message || data?.detail || "Something went wrong while uploading"
        showToast(errorMsg, "error", 5000)
        return { success: false, error: errorMsg }
      }



      // ✅ Success
      const successMsg = data?.message || "PDF uploaded successfully!"
      showToast(successMsg, "success")
      return { success: true, data }

    } catch (error) {
      console.error("Upload API error:", error)
      showToast(error.message || "Unexpected error occurred", "error", 6000)
      return { success: false, error: error.message }
    } finally {
      dispatch(setLoading({ key: "oneToManyLoader", value: false }))
    }
  }
  return { uploadPdf }
}
