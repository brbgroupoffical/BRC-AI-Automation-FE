import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { CheckCircle, Clock, AlertCircle, Download, Eye, RefreshCw, FileText, X } from "lucide-react"

const mockResults = [
  {
    id: 1,
    fileName: "Invoice_001.pdf",
    scenario: "1:1",
    scenarioName: "One-to-One AP Invoice",
    status: "completed",
    message: "Successfully processed all line items",
    createdAt: "2024-01-15 10:30:00",
    progress: 100,
    startTime: "2024-01-15 10:30:00",
    endTime: "2024-01-15 10:32:15",
    matchedItems: 5,
    totalItems: 5,
    confidence: 98.5,
  },
  {
    id: 2,
    fileName: "Invoice_002.pdf",
    scenario: "1:Many",
    scenarioName: "One-to-Many AP Invoice",
    status: "processing",
    message: "Processing line items...",
    createdAt: "2024-01-15 10:35:00",
    progress: 65,
    startTime: "2024-01-15 10:35:00",
    endTime: null,
    matchedItems: 3,
    totalItems: 6,
    confidence: null,
  },
  {
    id: 3,
    fileName: "Invoice_003.pdf",
    scenario: "Many:1",
    scenarioName: "Many-to-One AP Invoice",
    status: "failed",
    message: "Unable to extract text from PDF",
    createdAt: "2024-01-15 10:28:00",
    progress: 0,
    startTime: "2024-01-15 10:28:00",
    endTime: "2024-01-15 10:29:30",
    matchedItems: 0,
    totalItems: 4,
    confidence: null,
    error: "Unable to extract text from PDF",
  },
]

export default function ResultsPage() {
  const [results, setResults] = useState(mockResults)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedResult, setSelectedResult] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "processing":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      completed: "bg-green-100 text-green-800",
      processing: "bg-blue-100 text-blue-800",
      failed: "bg-red-100 text-red-800",
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-md ${variants[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "N/A"
    try {
      const date = new Date(dateTime)
      if (isNaN(date.getTime())) return "Invalid Date"
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch (error) {
      return "Invalid Date"
    }
  }

  const openModal = (result) => {
    setSelectedResult(result)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedResult(null)
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Processing Results</h2>
          <p className="text-gray-600 mt-1">View results from your uploaded files</p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 bg-transparent"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Results History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">S.No</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">File Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Message</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Created At</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-900">{index + 1}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-md">
                        {result.scenario}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-900">{result.fileName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(result.status)}
                        {getStatusBadge(result.status)}
                      </div>
                      {result.status === "processing" && (
                        <div className="mt-2 w-24">
                          <div className="bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${result.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 mt-1">{result.progress}%</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-gray-700 max-w-xs">
                      <div className="truncate" title={result.message || "No message"}>
                        {result.message || "No message available"}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">{formatDateTime(result.createdAt)}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-700 border-green-200 hover:bg-green-50 bg-transparent"
                          onClick={() => openModal(result)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        {result.status === "completed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-700 border-green-200 hover:bg-green-50 bg-transparent"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Export
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {results.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results yet</h3>
              <p className="text-gray-600">Upload and process files to see results here</p>
            </div>
          )}
        </CardContent>
      </Card>

      {isModalOpen && selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">File Details</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">File Name</label>
                <p className="mt-1 text-gray-900">{selectedResult.fileName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Type</label>
                <p className="mt-1">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-md">
                    {selectedResult.scenario}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1 flex items-center space-x-2">
                  {getStatusIcon(selectedResult.status)}
                  {getStatusBadge(selectedResult.status)}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <p className="mt-1 text-gray-900">{selectedResult.message || "No message available"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Created At</label>
                <p className="mt-1 text-gray-900">{formatDateTime(selectedResult.createdAt)}</p>
              </div>
              {selectedResult.status === "completed" && (
                <div className="flex items-center space-x-2 pt-4">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <Download className="w-3 h-3 mr-1" />
                    Download Results
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
