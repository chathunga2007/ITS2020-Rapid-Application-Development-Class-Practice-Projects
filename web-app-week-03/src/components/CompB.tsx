import CompC from "./CompC"

function CompB() {
  return (
    <div className="bg-blue-600 p-2">
      <h1 className="text-white">CompB</h1>
      <CompC />
    </div>
  )
}

export default CompB