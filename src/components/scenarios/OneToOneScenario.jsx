

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import FileUpload from "../FileUpload"
import { Play, Eye, Upload, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function OneToOneScenario() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [processingTasks, setProcessingTasks] = useState([])
  const [taskCounter, setTaskCounter] = useState(0)
  const navigate = useNavigate()

  const handleFileUpload = (file) => {
    setUploadedFile(file)
  }

  const handleStartMatching = async () => {
    if (!uploadedFile) {
      alert("Please upload a PDF file first")
      return
    }

    // Create new task with unique ID
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

    // Add task to processing queue
    setProcessingTasks((prev) => [...prev, newTask])

    // Clear uploaded file to allow new uploads
    setUploadedFile(null)

    // Simulate API call to start processing
    try {
      console.log("[v0] Starting AP invoice processing for:", uploadedFile.name, "Task ID:", newTaskId)

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProcessingTasks((prev) =>
          prev.map((task) =>
            task.id === newTaskId ? { ...task, progress: Math.min(task.progress + Math.random() * 20, 90) } : task,
          ),
        )
      }, 500)

      // Simulate async processing completion
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
      ) // Random completion time between 3-5 seconds
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">1:1 AP Invoice Processing</h2>
          <p className="text-gray-600 mt-2">Upload and process invoice documents for one-to-one matching</p>
        </div>
        {/* <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            Active Tasks: {processingTasks.filter((task) => task.status === "processing").length}
          </Badge>
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            Total: {processingTasks.length}
          </Badge>
        </div> */}
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

            {uploadedFile && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-800">{uploadedFile.name}</p>
                    <p className="text-sm text-green-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            )}
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

      <Card>
        <CardHeader>
          <CardTitle>Processing Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {processingTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Upload className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No processing tasks yet</p>
                <p className="text-sm">Upload and start matching to see tasks here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {processingTasks.map((task) => (
                  <div key={task.id} className={`p-4 border rounded-lg ${getStatusColor(task.status)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(task.status)}
                        <span className="font-medium">{task.fileName}</span>
                        <Badge variant="outline" className="text-xs">
                          Task #{task.id}
                        </Badge>
                      </div>
                      <span className="text-sm capitalize font-medium">{task.status}</span>
                    </div>

                    {task.status === "processing" && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{Math.round(task.progress)}%</span>
                        </div>
                        <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                          <div
                            className="bg-current h-2 rounded-full transition-all duration-300"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between text-xs mt-2 opacity-75">
                      <span>{(task.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                      <span>Started: {task.startTime.toLocaleTimeString()}</span>
                      {task.endTime && <span>Completed: {task.endTime.toLocaleTimeString()}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
