import "./App.css"

export default function Home({ go }) {
  return (
    <div className="bg">
      <div className="glass">
        <div className="badge">BRAWL MATCHMAKING</div>

        <h1 className="title">Find your perfect team</h1>

        <p className="subtitle">
          Fast, simple, elo-based team builder.
        </p>

        <div className="buttons">
          <button className="btn primary" onClick={() => go("play")}>
            Play
          </button>

          <button className="btn" onClick={() => go("info")}>
            Info
          </button>
        </div>

        <div className="footer">fan project • no login</div>
      </div>

      <div className="glow glow1" />
      <div className="glow glow2" />
    </div>
  )
}