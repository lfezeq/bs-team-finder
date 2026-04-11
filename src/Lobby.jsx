import { useEffect, useState } from "react"
import { supabase } from "./utils/supabase"
import "./App.css"

export default function Lobby({ go, user, setUser }) {
  const [users, setUsers] = useState(0)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { count } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })

      setUsers(count || 0)
    }

    load()
    const i = setInterval(load, 3000)
    return () => clearInterval(i)
  }, [])

  // ❌ NIE DOTYKA BAZY
  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    go("home")
  }

  return (
    <div className="animatedBg">

      <div className="particles">
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      <div className="homeContainer">

        <div className="topBar">
          <div className="topLeft">
            <div className="logo">LOBBY</div>
            <div className="onlineBadge">Users: {users}</div>
          </div>

          <button className="miniBtn" onClick={() => setShowModal(true)}>
            Logout
          </button>
        </div>

        <div className="hero">
          <h1 className="heroTitle">Welcome back</h1>
          <p className="heroSub">Logged as <b>{user?.nick}</b></p>
        </div>

        <div className="cardGrid">
          <div className="card">Find Match</div>
          <div className="card">Profile</div>
          <div className="card">Stats</div>
        </div>

        <div className="actions">
          <button className="bigBtn">START</button>
        </div>

        <div className="footer">version: beta</div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modalOverlay" onClick={() => setShowModal(false)}>
          <div className="modalBox" onClick={(e) => e.stopPropagation()}>

            <h3>Are you sure you want to log out?</h3>

            <div className="modalBtns">
              <button className="btn danger" onClick={logout}>
                Yes
              </button>

              <button className="btn" onClick={() => setShowModal(false)}>
                No
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}