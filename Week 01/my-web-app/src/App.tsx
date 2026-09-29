const App=()=>{
  // tsx -> jsx
  // javascript xml
  const isAdmin = true
  return (
    <div>
      <h2>Hello, React</h2>
      {isAdmin ? <h1>Admin</h1> : <h1>User</h1>}
      <div className="test"></div>
      <div style={{
        width: "100px", 
        height: "100px", 
        backgroundColor:"red"
        }}>
      </div>
    </div>
  )
}

export default App