import { useState } from "react"
import Home from "./Home"
import Play from "./Play"
import Info from "./Info"
import OnlineUsers from "./OnlineUsers"
import "./App.css"

export default function App() {
  const [page, setPage] = useState("home")

  return (
    <>

      {page === "home" && <Home go={setPage} />}
      {page === "play" && <Play go={setPage} />}
      {page === "info" && <Info go={setPage} />}
    </>
  )
}