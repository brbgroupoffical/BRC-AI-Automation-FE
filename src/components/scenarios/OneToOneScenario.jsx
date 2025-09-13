
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import FileUpload from "../FileUpload"
import { Play, Eye, Upload } from "lucide-react"
import { useToast } from "../ui/toast"
import { MatchingModal } from "../fileMatchingModal"
import { useUploadPdf } from "../../hooks/useUploadPdf"



export default function OneToOneScenario() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [processingTasks, setProcessingTasks] = useState([])
  const [taskCounter, setTaskCounter] = useState(0)
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()
    const { uploadPdf, isUploading } = useUploadPdf()

const [showModal, setShowModal] = useState(false)

  const handleFileUpload = (file) => {
    setUploadedFile(file)
  }

     const handleStartMatching = async () => {
    if (!uploadedFile) {
      showToast("Please upload a PDF file first", "error")
      return
    }

    setShowModal(true)

    const result = await uploadPdf(uploadedFile)

    if (!result.success) {
      console.error("Upload failed:", result.errors || result.error)
      return
    }

    console.log("Upload success:", result.data)
    // TODO: handle successful processing response
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
          <h2 className="text-3xl font-bold text-gray-900"> AP Invoice Processing</h2>
          <p className="text-gray-600 mt-2">Upload and process invoice documents for one-to-one matching</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5 text-green-600" />
              <span>Document Upload</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUpload onFileUpload={handleFileUpload} acceptedTypes=".pdf" maxSize={10} label="Upload Invoice PDF" />
          </CardContent>
        </Card>

        {/* Processing Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Play className="w-5 h-5 text-green-600" />
              <span>Processing Controls</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
        onClick={handleStartMatching}
        disabled={!uploadedFile || isUploading}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        size="lg"
      >
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Start Matching</span>
              </div>
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

            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <p className="font-medium mb-1">Parallel Processing:</p>
              <ul className="space-y-1 text-xs">
                <li>• Upload and start multiple files simultaneously</li>
                <li>• Each task runs independently in the background</li>
                <li>• No need to wait for completion before starting new tasks</li>
                <li>• View results as each task completes</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
