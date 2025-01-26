"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"

const WebcamCapture = () => {
  const [permissionDenied, setPermissionDenied] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      streamRef.current = stream
    } catch (err) {
      handleCaptureError(err as Error)
    }
  }

  const handleCaptureError = (error: Error) => {
    console.error("Error accessing webcam:", error)
    if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
      setPermissionDenied(true)
    }
  }

  useEffect(() => {
    startCapture()
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [startCapture]) // Added startCapture to dependencies

  if (permissionDenied) {
    return (
      <div className="flex items-center justify-center w-full max-w-md aspect-video bg-gray-200 rounded-lg text-gray-500 p-4 text-center">
        Camera permission denied. Please allow access and refresh.
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-full max-w-md aspect-video bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-contain"
          onError={(e) => handleCaptureError(e.target.error)}
        />
      </div>
    </div>
  )
}

export default WebcamCapture

