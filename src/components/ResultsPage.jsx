

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { CheckCircle, Clock, AlertCircle, Download, Eye, RefreshCw } from "lucide-react"

// Mock data for demonstration
const mockResults = [
  {
    id: 1,
    fileName: "Invoice_001.pdf",
    scenario: "1:1 AP Invoice",
    status: "completed",
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
    scenario: "1:1 AP Invoice",
    status: "processing",
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
    scenario: "1:1 AP Invoice",
    status: "failed",
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "processing":
        return <Clock className="w-5 h-5 text-blue-600" />
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      completed: "bg-green-100 text-green-800",
      processing: "bg-blue-100 text-blue-800",
      failed: "bg-red-100 text-red-800",
    }

    return <Badge className={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const formatDuration = (start, end) => {
    if (!end) return "In progress..."
    const startTime = new Date(start)
    const endTime = new Date(end)
    const duration = Math.round((endTime - startTime) / 1000)
    return `${duration}s`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Processing Results</h2>
          <p className="text-gray-600 mt-2">View the status and results of your AP invoice processing tasks</p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="outline"
          className="flex items-center space-x-2 bg-transparent"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Summary Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {results.filter((r) => r.status === "completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-blue-600">
                  {results.filter((r) => r.status === "processing").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-red-600">{results.filter((r) => r.status === "failed").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{results.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Processing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(result.status)}
                    <div>
                      <h3 className="font-medium text-gray-900">{result.fileName}</h3>
                      <p className="text-sm text-gray-600">{result.scenario}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {getStatusBadge(result.status)}

                    {result.status === "processing" && (
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${result.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{result.progress}%</span>
                      </div>
                    )}

                    {result.status === "completed" && (
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <span className="ml-2 font-medium">{formatDuration(result.startTime, result.endTime)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Matched:</span>
                    <span className="ml-2 font-medium">
                      {result.matchedItems}/{result.totalItems}
                    </span>
                  </div>
                  {result.confidence && (
                    <div>
                      <span className="text-gray-600">Confidence:</span>
                      <span className="ml-2 font-medium text-green-600">{result.confidence}%</span>
                    </div>
                  )}
                  {result.error && (
                    <div className="col-span-2">
                      <span className="text-gray-600">Error:</span>
                      <span className="ml-2 font-medium text-red-600">{result.error}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
