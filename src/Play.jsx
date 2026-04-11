import { useState } from "react"
import { supabase } from "./utils/supabase"
import "./Play.css"

export default function Play({ go }) {
  const [mode, setMode] = useState("")
  const [error, setError] = useState("")
  const [r, setR] = useState({ n: "", s: "", p: "", c: "" })
  const [l, setL] = useState({ n: "", p: "" })

  const reg = async () => {
    setError("")

    if (r.n.length < 3) return setError("Nick min 3")
    if (!/^[a-zA-Z0-9]+$/.test(r.s)) return setError("ID only letters/numbers")
    if (r.p.length < 6) return setError("Password min 6")
    if (r.p !== r.c) return setError("Passwords not match")

    const { error } = await supabase.from("users").insert([{
      nick: r.n,
      supercell_id: r.s,
      password: r.p,
      online: true
    }])

    if (error) return setError(error.message)
    go("home")
  }

  const log = async () => {
    setError("")

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("nick", l.n)
      .eq("password", l.p)

    if (!data?.length) return setError("Invalid login")

    await supabase
      .from("users")
      .update({ online: true })
      .eq("nick", l.n)

    go("home")
  }

  return (
    <div className="playWrap">
      <div className="playBox">

        {!mode && (
          <>
            <div className="playTitle">PLAY MODE</div>

            <div className="playGrid">
              <div className="playCard" onClick={() => setMode("l")}>
                LOGIN
                <p>I have account</p>
              </div>

              <div className="playCard" onClick={() => setMode("r")}>
                REGISTER
                <p>I’m new here</p>
              </div>
            </div>

            <button className="playBtn" onClick={() => go("home")}>
              BACK
            </button>
          </>
        )}

        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}

        {mode === "r" && (
          <>
            <div className="playTitle">REGISTER</div>

            <input className="playInput" placeholder="Nick"
              onChange={e => setR({ ...r, n: e.target.value })} />

            <input className="playInput" placeholder="Supercell ID"
              onChange={e => setR({ ...r, s: e.target.value })} />

            <input className="playInput" type="password" placeholder="Password"
              onChange={e => setR({ ...r, p: e.target.value })} />

            <input className="playInput" type="password" placeholder="Confirm"
              onChange={e => setR({ ...r, c: e.target.value })} />

            <div className="playBtnRow">
              <button className="playBtn primary" onClick={reg}>CREATE</button>
              <button className="playBtn" onClick={() => setMode("")}>BACK</button>
            </div>
          </>
        )}

        {mode === "l" && (
          <>
            <div className="playTitle">LOGIN</div>

            <input className="playInput" placeholder="Nick"
              onChange={e => setL({ ...l, n: e.target.value })} />

            <input className="playInput" type="password" placeholder="Password"
              onChange={e => setL({ ...l, p: e.target.value })} />

            <div className="playBtnRow">
              <button className="playBtn primary" onClick={log}>LOGIN</button>
              <button className="playBtn" onClick={() => setMode("")}>BACK</button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}