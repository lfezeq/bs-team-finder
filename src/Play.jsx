import { useState } from "react"
export default function Play({ go }) {
  const [form, setForm] = useState({
    nick: "",
    elo: 0 
  })
  const [submitted, setSubmitted] = useState(false)
  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }))
  }
  const submit = () => {
    if (!form.nick) return
    setSubmitted(true)
  }
  if (submitted) {
    return (
      <div className="bg">
        <div className="glass">
          <div className="badge">PLAYER READY</div>

          <h1 className="title">{form.nick} 🔥</h1>

          <p className="subtitle">
            ELO: {form.elo}
          </p>

          <button className="btn primary">
            Find Match
          </button>

          <button className="btn" onClick={() => go("home")}>
            Exit
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="bg">
      <div className="glass">
        <div className="badge">PLAYER SETUP</div>

        <h1 className="title">COMPLETE THE INFORMATIONS:</h1>
        <input
          className="input"
          placeholder="Nickname"
          value={form.nick}
          onChange={(e) => update("nick", e.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="ELO rating"
          value={form.elo}
          onChange={(e) => update("elo", e.target.value)}
        />

        <div className="buttons">
          <button className="btn primary" onClick={submit}>
            Continue
          </button>

          <button className="btn" onClick={() => go("home")}>
            Back
          </button>
        </div>
      </div>
    </div>
  )
}