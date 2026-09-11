import { Outlet } from "react-router-dom"

function AuthDashboard() {
  return (
    <div>
      <h1>AUth Screens</h1>
      <Outlet />
    </div>
  )
}

export default AuthDashboard