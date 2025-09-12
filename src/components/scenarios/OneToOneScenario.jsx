
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import FileUpload from "../FileUpload"
import { Play, Eye, Upload } from "lucide-react"
import { useToast } from "../ui/toast"

export default function OneToOneScenario() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [processingTasks, setProcessingTasks] = useState([])
  const [taskCounter, setTaskCounter] = useState(0)
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()

  const handleFileUpload = (file) => {
    setUploadedFile(file)
  }

  const handleStartMatching = async () => {
    if (!uploadedFile) {
      alert("Please upload a PDF file first")
      return
    }

    showToast(`Started matching for "${uploadedFile.name}"`, "success", 4000)

    const newTaskId = taskCounter + 1
    setTaskCounter(newTaskId)

    const newTask = {
      id: newTaskId,
      fileName: uploadedFile.name,
      fileSize: uploadedFile.size,
      status: "processing",
      startTime: new Date(),
      progress: 0,
    }
    setProcessingTasks((prev) => [...prev, newTask])
    setUploadedFile(null)
    try {
      console.log("[v0] Starting AP invoice processing for:", uploadedFile.name, "Task ID:", newTaskId)

      const progressInterval = setInterval(() => {
        setProcessingTasks((prev) =>
          prev.map((task) =>
            task.id === newTaskId ? { ...task, progress: Math.min(task.progress + Math.random() * 20, 90) } : task,
          ),
        )
      }, 500)

      setTimeout(
        () => {
          clearInterval(progressInterval)
          setProcessingTasks((prev) =>
            prev.map((task) =>
              task.id === newTaskId ? { ...task, status: "completed", progress: 100, endTime: new Date() } : task,
            ),
          )
          console.log("[v0] Processing completed for task:", newTaskId)
        },
        3000 + Math.random() * 2000,
      )
    } catch (error) {
      console.error("[v0] Processing error:", error)
      setProcessingTasks((prev) =>
        prev.map((task) => (task.id === newTaskId ? { ...task, status: "error", error: error.message } : task)),
      )
    }
  }

  const handleShowResults = () => {
    navigate("/results")
  }

  return (
    <div className="space-y-6">
      <ToastContainer />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">1:1 AP Invoice Processing</h2>
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
              disabled={!uploadedFile}
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
