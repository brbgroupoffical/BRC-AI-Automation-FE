

import { useState, useRef } from "react"
import { Upload, File, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { useToast } from "../ui/toast"

export default function FileUpload({ onFileUpload, acceptedTypes = ".pdf", maxSize = 10, label = "Upload File" }) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const fileInputRef = useRef(null)

const { showToast, ToastContainer } = useToast()

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelection(files[0])
    }
  }

  const handleFileSelection = (file) => {
    if (file.size > maxSize * 1024 * 1024) {
      showToast(`File size must be less than ${maxSize}MB`)
      return
    }

    if (!file.type.includes("pdf") && !file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please upload a PDF file")
      return
    }

    setUploadedFile(file)
    onFileUpload(file)
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFileSelection(file)
    }
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    onFileUpload(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <ToastContainer />
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200",
          isDragOver ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400 hover:bg-green-50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileInputChange}
          className="hidden"
        />

        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{label}</h3>
        <p className="text-sm text-gray-600 mb-2">Drag and drop your PDF file here, or click to browse</p>
        <p className="text-xs text-gray-500">Maximum file size: {maxSize}MB</p>
      </div>

      {uploadedFile && (
        <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <File className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">{uploadedFile.name}</p>
              <p className="text-sm text-gray-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button onClick={handleRemoveFile} className="p-1 text-gray-400 hover:text-red-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
