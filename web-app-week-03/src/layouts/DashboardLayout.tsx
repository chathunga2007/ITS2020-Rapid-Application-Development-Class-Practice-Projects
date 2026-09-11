import { Link, Outlet } from "react-router-dom"

function DashboardLayout() {
  return (
    <div>
      <nav className="flex justify-evenly bg-green-400">
        <Link className="border border-white" to={"/"}>
          Home
        </Link>
        <Link className="border border-white" to={"/about"}>
          About
        </Link>
        <Link className="border border-white" to={"/me"}>
          ME
        </Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default DashboardLayout