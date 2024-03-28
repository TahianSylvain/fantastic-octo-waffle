import Axios from 'axios'
import * as XLSX from 'xlsx'
import res from './CurrencyRate.json'
import React, { useState, useEffect, useRef } from 'react'
// import { GoogleGenerativeAI } from "@google/generative-ai"


export const UploadExcel = () => {
  const [file, setFile] = useState(null)
  const [data, setData] = useState(null) // Optional: state to store extracted data
  useEffect(() => {if (file) {handleUpload()}}, [file])
  const handleFileChange = (event) => setFile(event.target.files[0])

  const handleUpload = async () => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const arrayBuffer = e.target.result
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })

      // Optional: Access and process data from specific sheets
      const worksheet = workbook.Sheets[workbook.SheetNames[0]] // Get first sheet
      const data = XLSX.utils.sheet_to_json(worksheet) // Convert sheet to JSON

      setData(data)
      // console.log(data)

    }
    reader.readAsArrayBuffer(file)
  }
  //-----------------------------------------------------------------------------------
  const [conversionRate, setConversionRate] = useState(0.0); // Store retrieved rate
  const [sourceCurrency, setSourceCurrency] = useState('EUR'); // Initial source currency

  useEffect(() => {
    try { Axios.get(
        "https://v6.exchangerate-api.com/v6/0a13a6729a4a276703205290/latest/MGA")
        .then((res) => {
          console.log(res)
          setConversionRate(res.data.conversion_rates[sourceCurrency])})
    } catch {setConversionRate(res.rates[sourceCurrency]); console.log("429");}
  }, [sourceCurrency])

  const convert = (amount, toCurr) => {
    switch (toCurr) {
      case "$":toCurr = "USD"; break
      case "$usd":toCurr = "USD"; break
      case "$cad":toCurr = "CAD"; break
      case "£":toCurr = "GBP"; break
      case "€":toCurr = "EUR"; break
      default: break
    }
    console.log(toCurr)
    // setSourceCurrency(toCurr)
    
    if (conversionRate) return amount / conversionRate
    else return 0.0
  }
  //----------------------------------------------------------------------------------
  return <div className="Exceller"> 
    <div>
      <label for="formFileLg" class="form-label">Only inject .xlsx or .xls file format</label>
      <input class="form-control form-control-lg" id="formFileLg"
        type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
    </div>
      {data && 
      <table className="table container">
        <thead>
          <tr>
            <th scope="col">Produit</th>
            <th scope="col">Origine</th>
            <th scope="col">Prix</th>     {/* <th scope="col">Description</th> */}
            <th scope="col">Conversion</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => ( d.price && d.symbol && 
            <tr key={d.UUID}>
              <th>{d.name}</th>
              <th>{d.symbol || EUR}</th>
              <td>{d.price}</td> 
              <td>{convert(d.price, d.symbol).toFixed(2)}</td> 
            </tr>
          ))}
        </tbody>
      </table>}
      <div class="d-grid gap-2 col-6 mx-auto">
        <button class="btn btn-primary" 
          disabled={!file} onClick={() => convert(10, "$cad")}>
          Process
        </button>
      </div>
    </div>
}


  /* Access your API key (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI("AIzaSyDCPzfXvicX_KiHBT71gve1ObzB_zmndHg")
  async function run() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"})
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "Hello, I have an inspiration for honey cake!",
        },
        {
          role: "model",
          parts: "Great to meet you. What would you like to know?",
        },
      ],
      generationConfig: {
        maxOutputTokens: 9000,
      },
    })
    const msg = "Write a standard bpmn file to view how to proceed, pls?"
    const result = await chat.sendMessage(msg)
    const response = await result.response
    const text = response.text() console.log(text) // MarkdownFormat!
  }*/
