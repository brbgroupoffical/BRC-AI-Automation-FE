import { useState } from "react"
import { useAutomationResults } from "../../hooks/useAutomationResults"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { CheckCircle, Clock, AlertCircle, FileText, Eye, RefreshCw, X, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Toast, useToast } from "../ui/toast"

export default function ResultsPage() {
  const { results, loading, error, refetch, next, previous, fetchPage } = useAutomationResults()
  console.log("Results:", results)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedResult, setSelectedResult] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { showToast, ToastContainer } = useToast()
 const navigate = useNavigate()
  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "pending":
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
      success: "bg-green-100 text-green-800",
      completed: "bg-green-100 text-green-800",
      pending: "bg-blue-100 text-blue-800",
      processing: "bg-blue-100 text-blue-800",
      failed: "bg-red-100 text-red-800",
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-md ${variants[status] || "bg-gray-100 text-gray-800"}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refetch()
    setIsRefreshing(false)
  }

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "N/A"
    try {
      const date = new Date(dateTime)
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
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

  const formatScenario = (scenario) => {
    console.log(scenario)
    if (!scenario) return "N/A"
    if (scenario === "many_to_many") {
      scenario = "many_to_one";
    }
    return scenario.replaceAll("_", "-").toUpperCase()
  }


  return (
    <div className="space-y-6">
      <ToastContainer />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Processing Results</h2>
          <p className="text-gray-600 mt-1">View results from your uploaded files</p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing || loading}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 bg-transparent"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>{loading ? "Loading..." : "Refresh"}</span>
        </Button>
      </div>

      {/* {error && <p className="text-red-600">⚠️ {error}</p>} */}

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
                  <th className="text-left py-3 px-4 font-semibold text-gray-700"> Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Message</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Created At</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="7" className="py-10 text-center text-gray-500">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-gray-400" />
                      Loading results...
                    </td>
                  </tr>
                )}

                {/* Results */}
                {!loading &&
                  results.map((result, index) => (
                    <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-900">{index + 1}</td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 text-xs font-medium  text-green-800 rounded-md">
                          {formatScenario(result.scenario)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-gray-500" />
                          {/* <span className="font-medium text-sm text-gray-900">{result.fileName}</span> */}
                          <a
                            href={result.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-sm text-gray-900 hover:underline"
                          >
                            {result.fileName}
                          </a>

                        </div>
                      </td>
                      {/* <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(result.status)}
                          {getStatusBadge(result.status)}
                        </div>
                      </td> */}
                      {/* ✅ Automation Status */}
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(result.automationStatus)}
                          {getStatusBadge(result.automationStatus)}
                        </div>
                      </td>

                      {/* ✅ Step Status */}
                      {/* <td className="py-4 px-4">
          <div className="flex items-center space-x-2">
            {getStatusIcon(result.stepStatus)}
            {getStatusBadge(result.stepStatus)}
          </div>
        </td> */}
                      <td className="py-4 px-4 text-gray-700 max-w-xs">
                        <div className="truncate" title={result.message || "No message"}>
                          {result.message?.length > 50
                            ? result.message.slice(0, 50) + "..."
                            : result.message || "No message available"}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">
                        {formatDateTime(result.createdAt)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className={`cursor-pointer border-green-200 bg-transparent
      ${
        result.automationStatus === "failed"
          ? "text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50"
          : "text-green-700 hover:bg-green-50"
      }`}
                          onClick={() => {
      if (result.automationStatus !== "failed") navigate(`/grn/${result.id}`);
    }}
                          >
                            View Payload
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-700 cursor-pointer border-green-200 hover:bg-green-50 bg-transparent"
                            onClick={() => openModal(result)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}

                {/* Empty State */}
                {!loading && results.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-gray-500">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      No results yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {results.length === 0 && !loading && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results yet</h3>
              <p className="text-gray-600">Upload and process files to see results here</p>
            </div>
          )}
          {/* Pagination Controls */}
          <div className="flex  items-center justify-end mt-4 space-x-2">
            <Button
              onClick={() => previous && fetchPage(previous)}
              disabled={!previous}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            <Button
              onClick={() => next && fetchPage(next)}
              disabled={!next}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      {isModalOpen && selectedResult && (
        <div className="fixed inset-0 bg-gray-200/70 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">File Details</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">

              <div>
                <label className="text-sm font-medium text-gray-700">File Name</label>
                <FileText className="w-4 h-4 text-gray-500" />
                {/* <span className="font-medium text-sm text-gray-900">{result.fileName}</span> */}
                <a
                  href={selectedResult.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-gray-900 hover:underline"
                >
                  {selectedResult.fileName}
                </a>

              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Type</label>
                <p className="mt-1">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-md">

                    {formatScenario(selectedResult.scenario)}
                  </span>
                </p>
              </div>
              {/* <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1 flex items-center space-x-2">
                  {getStatusIcon(selectedResult.status)}
                  {getStatusBadge(selectedResult.status)}
                </div>
              </div> */}

              <div>
                <label className="text-sm font-medium text-gray-700"> Status</label>
                <div className="mt-1 flex items-center space-x-2">
                  {getStatusIcon(selectedResult.automationStatus)}
                  {getStatusBadge(selectedResult.automationStatus)}
                </div>
              </div>
              {/* <div>
  <label className="text-sm font-medium text-gray-700">Step Status</label>
  <div className="mt-1 flex items-center space-x-2">
    {getStatusIcon(selectedResult.stepStatus)}
    {getStatusBadge(selectedResult.stepStatus)}
  </div>
</div> */}

              {/* ✅ Message History Dropdown */}
              <div>
                <label className="text-sm font-medium text-gray-700">Message History</label>

                {selectedResult?.steps?.length > 0 ? (
                  <details className="mt-2 bg-gray-50 rounded-md p-3 border border-gray-200">
                    <summary className="cursor-pointer text-sm font-semibold text-gray-800">
                      View all steps ({selectedResult.steps.length})
                    </summary>
                    <ul className="mt-2 space-y-2 text-sm text-gray-700 max-h-40 overflow-y-auto">
                      {selectedResult.steps.map((step, idx) => (
                        <li key={idx} className="border-b border-gray-100 pb-1">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-900">{step.step_name}</span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded ${step.status === "success"
                                ? "bg-green-100 text-green-800"
                                : step.status === "failed"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-700"
                                }`}
                            >
                              {step.status}
                            </span>
                          </div>
                          <p className="text-xs mt-1 text-gray-600 whitespace-pre-wrap">
                            {step.message}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            {new Date(step.updated_at).toLocaleString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <p className="mt-1 text-gray-500 text-sm">No step history available</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Created At</label>
                <p className="mt-1 text-gray-900">{formatDateTime(selectedResult.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
