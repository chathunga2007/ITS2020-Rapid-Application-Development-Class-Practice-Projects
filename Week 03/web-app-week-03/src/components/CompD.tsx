import { useContext } from "react"
import { DataContext } from "./CompA"

function CompD() {
  const res = useContext(DataContext)
  console.log("Comp D: ", res)

  return (
    <div className="bg-black p-2">
      <h1 className="text-white">CompD</h1>
    </div>
  )
}

export default CompD