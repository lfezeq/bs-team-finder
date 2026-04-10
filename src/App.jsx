import { useState } from "react"
import Home from "./Home"
import Play from "./Play"
import Info from "./Info"

export default function App() {
  const [page, setPage] = useState("home")

  if (page === "play") return <Play go={setPage} />
  if (page === "info") return <Info go={setPage} />

  return <Home go={setPage} />
}