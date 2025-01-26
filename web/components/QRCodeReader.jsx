"use client"

import React, { useState } from "react"
import { QrReader } from "react-qr-reader"

const QRCodeReader = () => {
  const [data, setData] = useState("No result")

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text)
          }

          if (!!error) {
            console.info(error)
          }
        }}
        style={{ width: "100%" }}
      />
      <p className="mt-4">
        <span className="font-semibold">Scanned Data:</span> {data}
      </p>
    </div>
  )
}

export default QRCodeReader

