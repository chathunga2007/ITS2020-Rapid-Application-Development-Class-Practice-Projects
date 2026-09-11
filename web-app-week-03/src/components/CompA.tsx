import { createContext, useState } from "react"
import CompB from "./CompB"

export const DataContext = createContext<any>(null)

function CompA() {
  const [data, setData] = useState(10)

  const obj = { name: data }
//   obj.name

  return (
    <div className="bg-yellow-500 p-2">
      <h1 className="text-white">CompA</h1>

      <DataContext.Provider value={obj}>
        <CompB />
      </DataContext.Provider>
    </div>
  )
}

export default CompA