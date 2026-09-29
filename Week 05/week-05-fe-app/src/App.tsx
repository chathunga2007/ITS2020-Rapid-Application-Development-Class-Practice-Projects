import axios from "axios"
import { useEffect, useState } from "react"

function App() {
  const [item, setItems] = useState([])

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/item/all")
      const data = res.data

      setItems(data.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    // const res = axios.get("http://localhost:3000/api/v1/item/all")
    fetchData()
  }, [])

  return <div>
    {item.map((item: any, index) => (
      <div key={index}>
        <h1>{item.name}</h1>
        <h1>{item.price}</h1>
      </div>
    ))}
  </div>
}

export default App