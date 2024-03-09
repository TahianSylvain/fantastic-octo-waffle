import React, { useState } from 'react'
import { useEffect } from 'react'
import * as XLSX from 'xlsx'
// import { saveAs } from 'file-saver'


export const UploadExcel = () => {
  const [file, setFile] = useState(null)
  const [data, setData] = useState(null) // Optional: state to store extracted data

  const handleFileChange = (event) => {
    
    setFile(event.target.files[0])
  }
useEffect(() => {if (file) {handleUpload()}}, [file])

  const handleUpload = async () => {

    const reader = new FileReader()

    reader.onload = (e) => {
      const arrayBuffer = e.target.result
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })

      // Optional: Access and process data from specific sheets
      const worksheet = workbook.Sheets[workbook.SheetNames[0]] // Get first sheet
      const data = XLSX.utils.sheet_to_json(worksheet) // Convert sheet to JSON
      setData(data) // Update data state (optional)
      console.log(data)
      // Optionally handle or display extracted data here
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <div>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      <button disabled={!file}>Process</button>
      {/* Optionally display extracted data here if using data state */}
      {data && <table className="table container">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.UUID}>
              <th>{d.name}</th>
              <td>${d.price}USD</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  )
}
