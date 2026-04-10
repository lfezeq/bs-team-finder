import { useState } from "react"
import { supabase } from "./utils/supabase"

export default function Play({ go }) {
  const [form, setForm] = useState({ nick: "", elo: 1000 })
  const [joined, setJoined] = useState(false)

  const update = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }))
  }

  const join = async () => {
    if (!form.nick) return

    await supabase.from("players").insert({
      nick: form.nick,
      elo: Number(form.elo),
      online: true
    })

    setJoined(true)
  }

  return (
    <div className="bg animatedBg">

      <div className="particles">
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      <div className="glass">

        <div className="badge">PLAYER SETUP</div>

        <h1 className="title">Create profile</h1>

        <input
          className="input"
          placeholder="Nickname"
          value={form.nick}
          onChange={(e) => update("nick", e.target.value)}
        />

        <input
          className="input"
          type="number"
          placeholder="ELO"
          value={form.elo}
          onChange={(e) => update("elo", e.target.value)}
        />

        <div className="buttons">
          <button className="btn primary" onClick={join}>
            JOIN
          </button>

          <button className="btn" onClick={() => go("home")}>
            BACK
          </button>
        </div>

      </div>
    </div>
  )
}