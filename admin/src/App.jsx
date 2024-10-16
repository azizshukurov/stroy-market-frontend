import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './Components/Admin/Admin'
import Login from './Pages/Login/Login'
import Auth from './Pages/auth'
import AddAdmin from './Pages/AddAdmin'
import MahsulotQoshish from './Pages/MahsulotQoshish'
import SotuvdagiMahsulot from './Pages/SotuvdagiMahsulot'
import Buyurtmalar from './Pages/Buyurtmalar'

function App() {
  return (
    <BrowserRouter>
      <Admin />
      <Login />
      <Routes>
        <Route path="/link1" element={<Auth />} />
        <Route path="/link2" element={<AddAdmin />} />
        <Route path="/link3" element={<MahsulotQoshish />} />
        <Route path="/link4" element={<SotuvdagiMahsulot />} />
        <Route path="/link5" element={<Buyurtmalar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
