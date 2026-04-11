import { useState, useEffect } from "react"
import Home from "./Home"
import Login from "./Login"
import Lobby from "./Lobby"
import Info from "./Info"

export default function App() {
  const [page, setPage] = useState("home")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem("user")

    if (!saved) return

    const parsed = JSON.parse(saved)

    if (parsed?.id) {
      setUser(parsed)
      setPage("lobby")
    } else {
      localStorage.removeItem("user")
    }
  }, [])
  return (
    <>
      {page === "home" && <Home go={setPage} user={user} />}
      {page === "login" && <Login go={setPage} setUser={setUser} />}
      {page === "lobby" && user && (
        <Lobby go={setPage} user={user} setUser={setUser} />
      )}
      {page === "lobby" && !user && (
        <Login go={setPage} setUser={setUser} />
      )}
      {page === "info" && <Info go={setPage} />}
    </>
  )
}