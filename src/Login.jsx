import { useState } from "react"
import { supabase } from "./utils/supabase"
import "./Login.css"

export default function Login({ go, setUser }) {
  const [mode, setMode] = useState("")
  const [error, setError] = useState("")
  const [r, setR] = useState({ n: "", s: "", p: "", c: "" })
  const [l, setL] = useState({ n: "", p: "" })

  const saveUser = (data) => {
    setUser(data)
    localStorage.setItem("user", JSON.stringify(data))
  }

  const register = async () => {
    setError("")

    if (r.n.length < 3) return setError("Nick min 3")
    if (!/^[a-zA-Z0-9]+$/.test(r.s)) return setError("Invalid ID")
    if (r.p.length < 6) return setError("Password min 6")
    if (r.p !== r.c) return setError("Passwords not match")

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          nick: r.n,
          supercell_id: r.s,
          password: r.p
        }
      ])
      .select()
      .single()

    if (error) return setError(error.message)

    saveUser(data)
    go("lobby")
  }

  const login = async () => {
    setError("")

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("nick", l.n)
      .eq("password", l.p)
      .single()

    if (error || !data) return setError("Wrong login")

    saveUser(data)
    go("lobby")
  }

  return (
    <div className="loginWrap animatedBg">

      <div className="loginBox">

        {!mode && (
          <>
            <div className="loginTitle">LOGIN</div>

            <div className="loginGrid">
              <div className="loginCard" onClick={() => setMode("l")}>
                LOGIN
              </div>

              <div className="loginCard" onClick={() => setMode("r")}>
                REGISTER
              </div>
            </div>

            <button className="loginBtn" onClick={() => go("home")}>
              BACK
            </button>
          </>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {mode === "r" && (
          <>
            <input placeholder="Nick" onChange={e => setR({ ...r, n: e.target.value })} />
            <input placeholder="ID" onChange={e => setR({ ...r, s: e.target.value })} />
            <input type="password" placeholder="Pass" onChange={e => setR({ ...r, p: e.target.value })} />
            <input type="password" placeholder="Confirm" onChange={e => setR({ ...r, c: e.target.value })} />

            <button onClick={register}>CREATE</button>
            <button onClick={() => setMode("")}>BACK</button>
          </>
        )}

        {mode === "l" && (
          <>
            <input placeholder="Nick" onChange={e => setL({ ...l, n: e.target.value })} />
            <input type="password" placeholder="Pass" onChange={e => setL({ ...l, p: e.target.value })} />

            <button onClick={login}>LOGIN</button>
            <button onClick={() => setMode("")}>BACK</button>
          </>
        )}

      </div>
    </div>
  )
}