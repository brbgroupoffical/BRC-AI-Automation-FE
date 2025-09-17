
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import FileUpload from "../FileUpload"
import { Play, Eye, FileText, ArrowDownLeft } from "lucide-react"
import { useToast } from "../ui/toast"
import { MatchingModal } from "../fileMatchingModal"
import { useUploadPdfManyToMany } from "../../hooks/useUploadPdfManyToMany"

export default function ManyToManyScenario() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()
  const { uploadPdf, isUploading } = useUploadPdfManyToMany()

  const handleFileUpload = (file) => {
    if (!file) {
      setUploadedFile(null)
      return
    }

    if (file.size > 30 * 1024 * 1024) {
      showToast("File too large. Max size is 30MB.", "error")
      setUploadedFile(null)
      return
    }

    setUploadedFile(file)
  }

  const handleStartMatching = async () => {
    if (!uploadedFile) {
      showToast("Please upload a PDF file first", "error")
      return
    }

    const result = await uploadPdf(uploadedFile)

    if (result.success) {
      showToast(result.data?.message || "PDF uploaded successfully!", "success")

      setUploadedFile(null)

      setTimeout(() => {
        setShowModal(true)
      }, 4000)
    } else {
      const errorMsg = result.error || result.data?.detail || "Upload failed. Please try again."
      showToast(errorMsg, "error")
      console.error("Upload failed:", errorMsg)
    }
  }

  const handleShowResults = () => {
    navigate("/results")
  }

  return (
    <div className="space-y-6">
      <ToastContainer />

      <MatchingModal
        open={showModal}
        onClose={() => setShowModal(false)}
        fileName={uploadedFile?.name}
        onShowResults={handleShowResults}
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <ArrowDownLeft className="w-8 h-8 text-green-600" />
            <span>Many:Many AP Invoice Processing</span>
          </h2>
          <p className="text-gray-600 mt-2">Upload and process multiple invoices against one GRN</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-green-600" />
              <span>Document Upload & Processing</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FileUpload onFileUpload={handleFileUpload} acceptedTypes=".pdf" maxSize={30} label="Upload Invoice PDF" />

            <div className="flex flex-col space-y-3">
              <Button
                onClick={handleStartMatching}
                disabled={!uploadedFile || isUploading}
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
                size="lg"
              >
                {isUploading ? (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <span>Matching...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Start Many:Many Matching</span>
                  </div>
                )}
              </Button>

              <Button
                onClick={handleShowResults}
                variant="outline"
                className="w-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                size="lg"
              >
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Show Results</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
