import Card from "./components/Card"

const App = () => {
  const name = "Chathunga"
  return (
    <>
      <div></div>
      <Card data={name}/>
      <Card age = {18}></Card>
    </>
  )
}

export default App