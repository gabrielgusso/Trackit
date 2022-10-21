import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalStyle from "./components/GlobalStyle/GlobalStyle"
import Habits from "./pages/Habits/Habits"
import Login from "./pages/Login/Login"
import Registration from "./pages/Registration/Registration"
import Auth from "./providers/auth"

export default function App() {
  const [user, setUser] = useState("")

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Auth.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Registration />} />
          <Route path="/habitos" element={<Habits />} />
        </Routes>
      </Auth.Provider>
    </BrowserRouter>
  )
}
