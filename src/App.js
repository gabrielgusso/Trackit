import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalStyle from "./components/GlobalStyle/GlobalStyle"
import Habits from "./pages/Habits/Habits"
import History from "./pages/History/History"
import Login from "./pages/Login/Login"
import Registration from "./pages/Registration/Registration"
import Today from "./pages/Today/Today"
import Auth from "./providers/auth"

export default function App() {
  const [user, setUser] = useState("")
  const [progress, setProgress] = useState(0)
  const [checked, setChecked] = useState(1)

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Auth.Provider value={{ user, setUser, progress, setProgress, checked, setChecked  }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Registration />} />
            <Route path="/habitos" element={<Habits />} />
            <Route path="/hoje" element={<Today />} />
            <Route path="/historico" element={<History />} />
          </Routes>
      </Auth.Provider>
    </BrowserRouter>
  )
}
