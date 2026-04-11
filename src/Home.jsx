import { useEffect, useState } from "react"
import { supabase } from "./utils/supabase"
import "./App.css"

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
      const { data, error } = await supabase
        .from("users")
        .select("id")

      if (!error) {
        setOnline(data?.length || 0)
      }
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
            <div className="logo">BS TEAM FINDER</div>
            <div className="onlineBadge">🟢 Users: {online}</div>
          </div>

          <button className="miniBtn" onClick={() => go("info")}>
            Info
          </button>
        </div>

        <div className="hero">
          <h1 className="heroTitle">Find your perfect team</h1>
          <p className="heroSub">{tips[tipIndex]}</p>
        </div>

        <div className="offerSection">
          <div className="offerTitle">SYSTEM FEATURES</div>

          <div className="offerList">

            <div className="offerItem">
              <span className="dot"></span>
              <div>
                <h3>Smart Matchmaking</h3>
                <p>Find teammates based on skill & performance</p>
              </div>
            </div>

            <div className="offerItem">
              <span className="dot"></span>
              <div>
                <h3>ELO Ranking System</h3>
                <p>Competitive rating that evolves with every match</p>
              </div>
            </div>

            <div className="offerItem">
              <span className="dot"></span>
              <div>
                <h3>Live Queue System</h3>
                <p>Real-time matchmaking lobby with instant updates</p>
              </div>
            </div>

            <div className="offerItem">
              <span className="dot"></span>
              <div>
                <h3>Player Stats Tracking</h3>
                <p>Wins, losses, K/D ratio and performance history</p>
              </div>
            </div>

            <div className="offerItem">
              <span className="dot"></span>
              <div>
                <h3>Profile System</h3>
                <p>Custom player profiles with stats and history</p>
              </div>
            </div>

            <div className="offerItem">
              <span className="dot"></span>
              <div>
                <h3>Ranking History</h3>
                <p>Track progress and climb the competitive ladder</p>
              </div>
            </div>

          </div>
        </div>

        <div className="actions">
          <button className="bigBtn" onClick={() => go("lobby")}>
            PLAY
          </button>
        </div>

        <div className="footer">
          version : beta
        </div>

      </div>
    </div>
  )
}