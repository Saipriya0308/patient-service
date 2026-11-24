import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "admin123") {
            setError("");
            onLogin();
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="login-page">
            <form className="login-card" onSubmit={handleSubmit}>
                <h1>HMIS Portal</h1>
                <p className="subtitle">Sign in</p>

                <label>Username</label>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <div className="error">{error}</div>}

                <button type="submit">Sign in</button>
            </form>
        </div>
    );
}

export default Login;