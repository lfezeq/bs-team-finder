export default function Info({ go }) {
  return (
    <div className="bg animatedBg">

      <div className="particles">
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      <div className="glass">

        <div className="badge">ABOUT PROJECT</div>

        <h1 className="title">How it works</h1>

        <p className="subtitle">
          Skill-based matchmaking system inspired by competitive games.
        </p>

        <p className="subtitle">
          🎯 Match players by ELO<br />
          ⚡ Fast queue system<br />
          🎮 Competitive ranked flow
        </p>

        <p className="subtitle">
          No accounts • instant access • prototype system
        </p>

        <div className="buttons">
          <button className="btn primary" onClick={() => go("home")}>
            BACK
          </button>
        </div>

      </div>
    </div>
  )
}