import { useContext } from "react"
import { DataContext } from "./CompA"
import CompD from "./CompD"

function CompC() {
  const res = useContext(DataContext)
//   res.name

  return (
    <div className="bg-green-500 p-2">
      <h1 className="text-white">CompC</h1>
      <CompD />
    </div>
  )
}

export default CompC