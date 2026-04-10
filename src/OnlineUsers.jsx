import { useEffect, useState } from "react"
import { supabase } from "./utils/supabase"

export default function OnlineUsers() {
  const [users, setUsers] = useState([])

  const load = async () => {
    const { data } = await supabase
      .from("players")
      .select("*")
      .eq("online", true)

    setUsers(data || [])
  }

  useEffect(() => {
    load()
    const i = setInterval(load, 2000)
    return () => clearInterval(i)
  }, [])

  return (
    <div className="onlineBox">
      <h3>Online ({users.length})</h3>

      {users.map((u) => (
        <div key={u.id} className="onlineItem">
          {u.nick} • {u.elo}
        </div>
      ))}
    </div>
  )
}