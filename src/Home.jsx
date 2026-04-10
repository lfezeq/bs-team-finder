import { useEffect, useState } from "react"
import { supabase } from "./utils/supabase"
import OnlineUsers from "./OnlineUsers"

const tips = [
  "Match players based on ELO",
  "Fast queue system",
  "Competitive team play",
  "Real-time matchmaking"
]

export default function Home({ go }) {
  const [tipIndex, setTipIndex] = useState(0)
  const [online, setOnline] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setTipIndex((p) => (p + 1) % tips.length)
    }, 2500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const load = async () => {
      const { count } = await supabase
        .from("players")
        .select("*", { count: "exact", head: true })

      setOnline(count || 0)
    }

    load()
    const i = setInterval(load, 3000)
    return () => clearInterval(i)
  }, [])

  return (
    <div className="bg animatedBg">

      <div className="particles">
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      <div className="homeContainer">

        <div className="topBar">
          <div className="topLeft">
            <div className="logo">⚡ TEAM FINDER</div>
            <div className="onlineBadge">🔴 Online: {online}</div>
          </div>

          <button className="miniBtn" onClick={() => go("info")}>
            Info
          </button>
        </div>

        <div className="hero">
          <h1 className="heroTitle">Find your perfect team</h1>
          <p className="heroSub">{tips[tipIndex]}</p>
        </div>

        <div className="cardGrid">
          <div className="card">⚔️ Matchmaking</div>
          <div className="card">📊 ELO System</div>
          <div className="card">⚡ Live Queue</div>
        </div>

        <div className="actions">
          <button className="bigBtn" onClick={() => go("play")}>
            PLAY
          </button>
        </div>

        <div className="footer">
          Prototype matchmaking system
        </div>

      </div>
    </div>
  )
}