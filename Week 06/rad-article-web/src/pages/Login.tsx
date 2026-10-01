import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getMyDetails, login } from "../service/auth"

export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            return alert("Please fill all fields!")
        }

        try {
            const responData = await login(email, password)

            console.log("Login response:", responData.data)

            const resData = responData.data

            const accessToken = resData.access_token
            const refreshToken = resData.refresh_token

            if (!accessToken || !refreshToken) {
                return alert("Login failed...!")
            }

            localStorage.setItem("ACCESS_TOKEN", accessToken)
            localStorage.setItem("REFRESH_TOKEN", refreshToken)

            try {
                await getMyDetails()
            } catch (err) {
                console.warn("Could not fetch user details:", err)
            }

            navigate("/home")

        } catch (error) {
            console.error("Login error:", error)
            alert("Login failed...!")
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="brand">MyApp</div>

                <h1>Welcome Back</h1>

                <p className="subtitle">
                    Login to your account
                </p>

                <form onSubmit={handleLogin}>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="primary-btn"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <p className="switch-text">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Create Account
                    </Link>
                </p>

            </div>
        </div>
    )
}