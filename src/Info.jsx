export default function Info({ go }) {
  return (
    <div className="bg">
      <div className="glass">
        <div className="badge">ABOUT PROJECT</div>

        <h1 className="title">How it works</h1>

        <p className="subtitle">
          This is a skill-based matchmaking concept inspired by competitive games.
        </p>

        <div className="infoBox">
          <div className="infoItem">
            🎯 Match players by elo
          </div>

          <div className="infoItem">
            ⚡ Fast queue system
          </div>

          <div className="infoItem">
            🎮 Built for rankeds
          </div>
        </div>

        <p className="smallText">
          No accounts required • instant access • demo project
        </p>

        <button className="btn primary" onClick={() => go("home")}>
          Back
        </button>
      </div>
    </div>
  )
}