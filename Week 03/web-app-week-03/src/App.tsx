// import CompA from "./components/CompA"

// const App = () => {
//   return (
//     <>
//       <div className="bg-yellow-300 h-screen p-2">
//         <h1 className="text-white">App</h1>
//         <CompA />
//       </div>
//     </>
//   )
// }

// export default App

import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"

import DashboarLayout from "./layouts/DashboardLayout"
import AUthDashboard from "./layouts/AuthDashboard"

const Home = lazy(() => import("./pages/home"))
const About = lazy(() => import("./pages/about"))
const Me = lazy(() => import("./pages/me"))
const Login = lazy(() => import("./pages/login"))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<DashboarLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/me" element={<Me />} />
          </Route>
          <Route element={<AUthDashboard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<div>Reg</div>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App