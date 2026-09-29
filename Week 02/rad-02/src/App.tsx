// import { Component } from "react";
// import { Fragment } from "react/jsx-runtime"
// import Card from "./components/card"
import { useState } from "react"

// ---------- Class Component ----------

// class App extends Component{
//   render(){
//     return <h1>Hello World</h1>
//   }
// }

// ---------- Functional component ----------

/* const students = [
  { id: 1, name: "Selvaraja", age: 21, email: "selvaraja@example.com" },
  { id: 2, name: "Sadika", age: 22, email: "sadika@example.com" },
  { id: 3, name: "Sasindu", age: 19, email: "sasindu@example.com" },
  { id: 4, name: "Hirusha", age: 20, email: "hirusha@example.com" },
  { id: 5, name: "Kaveesha", age: 23, email: "kaveesha@example.com" },
  { id: 6, name: "Thamindu", age: 21, email: "thamindu@example.com" },
  { id: 7, name: "Oshan", age: 22, email: "oshan@example.com" },
  { id: 8, name: "Chathura", age: 19, email: "chathura@example.com" },
  { id: 9, name: "Rayan", age: 24, email: "rayan@example.com" },
  { id: 10, name: "Malindu", age: 20, email: "malindu@example.com" }
];

const App = () => {
  // JSX/TSX -> JavaScript XML
  // JS + XML (HTML)
  // return <div></div>

  const name = "Chathunga"

  // map -> old arr -> new arr
  // [ 1, 2, 3 ]

  // for (let i = 0; i < students.length; i++) {
  //   const student = students[i]
  // }

  // [ 10, 20, 30]
  // const newStudent = students.map((student) => {
  //   return { username: student.name }
  // })

  // console.log(students)
  // console.log("------------")
  // console.log(newStudent)

  // H1, P
  return (
    //01. wrapping element using div
    // <div>
    //   <h1>Hello</h1>
    //   <p>Hi React</p>
    // </div>

    //02. wrapping element using fragment
    // <Fragment>
    //   <h1>Hello</h1>
    //   <p>hiiiiiiiiii</p>
    // </Fragment>

    //03. wrapping element using empty brackets
    
    <>
      {/* <h1>App</h1>
      <Card data={name} x={100}></Card> 
      <Card>
        <h1>Hi React</h1>
      </Card>
      self closing tag
      <Card /> }

      <Card 
        name={"chathunga"}
        age={18}
        email={"chathunga@ijse.lk"}
      />

      <Card 
        name={"sahan"}
        age={20}
        email={"sahan@ijse.lk"}
      />


      {students.map((student) => {
        return (
          <Card name={student.name} age={student.age} email={student.email} />
        )
      })}
    </>
  )
}
  */

// Count App
// react hooks

// const App = () => {
//   // state = data, component
//   // let count = 0
//   const [count, setCount] = useState(0) // [0, 1]

//   const handlePlus = () => {
//     setCount(count + 1)
//     console.log(count)
//   }

//   const handleMin = () => {
//     setCount(count - 1)
//     console.log(count)
//   }

//   return (
//     <div>
//       <button onClick={handlePlus}>+</button>
//       <h1>{count}</h1>
//       <button onClick={handleMin}>-</button>
//     </div>
//   )
// }

// Simple Form
// const App = () => {
//   const [name, setName] = useState<string>("")
//   const [age, setAge] = useState<number>(0)
//   const [email, setEmail] = useState<string>("")
//   const [users, setUsers] = useState<any>([])

//   const handleSaveUser = () => {
//       if (!name || !age || !email) {
//       alert("Please fill all fields...!")
//       return
//     } 

//     const user = { name, age, email }
//     // const newUsers = [...users, user] old array + new element
//     setUsers([...users, user])

//     setName("")
//     setAge(0)
//     setEmail("")
//   }

//   return (
//     <div>

//       <div>
//         {users.map((user: any) => {
//           return (
//             <div>
//               <h1>{user.name}</h1>
//               <h2>{user.age}</h2>
//               <h2>{user.email}</h2>
//             </div>
//           )
//         })}
//       </div>
//       <hr />

//       <input
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         type="text"
//         placeholder="name"
//       />

//       <input 
//         value={age}
//         onChange={(e) => setAge(Number(e.target.value))}
//         type="number"
//         placeholder="age" />

//       <input 
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         type="text"
//         placeholder="email" />

//       <button onClick={handleSaveUser}>Save</button>
//     </div>
//   )
// }

// tailwind css try now
const App = () => {
  return(
    <div className="bg-red-500">
      Hello React
    </div>
  )
}

export default App