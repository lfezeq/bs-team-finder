import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [email, setEmail] = useState("")
  const [remember, setRemember] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("rememberEmail")
    if (saved) {
      setEmail(saved)
      setRemember(true)
    }
  }, [])

  const handleLogin = () => {
    if (remember) {
      localStorage.setItem("rememberEmail", email)
    } else {
      localStorage.removeItem("rememberEmail")
    }
  }

  return (
    <div className="bg">
      <div className="glass">
        <div className="badge">BRAWL MATCHMAKING</div>

        <h1 className="title">
          Welcome back
        </h1>

        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="remember">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          Remember me
        </label>

        <div className="buttons">
          <button className="btn primary" onClick={handleLogin}>
            Login
          </button>
          <button className="btn">Register</button>
        </div>

        <div className="footer">
          beta • powered by Supabase
        </div>
      </div>

      <div className="glow glow1" />
      <div className="glow glow2" />
    </div>
  )
}

export default App