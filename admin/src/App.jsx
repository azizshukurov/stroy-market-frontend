import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './Components/Admin/Admin'
import Login from './Pages/Login/Login'
import Auth from './Pages/Auth'
import AddAdmin from './Pages/AddAdmin'
import MahsulotQoshish from './Pages/MahsulotQoshish'
import SotuvdagiMahsulot from './Pages/SotuvdagiMahsulot'
import Buyurtmalar from './Pages/Buyurtmalar'
import UserOrders from './Pages/UserOrders'

function App() {
  // Get the userToken from localStorage or context
  const userToken = localStorage.getItem('userToken')

  return (
    <BrowserRouter>
      <Admin />
      <Login />
      <Routes>
        {/* If userToken is null, redirect to /link1 (Auth page) */}
        {!userToken ? (
          <Route path="*" element={<Auth />} />
        ) : (
          <>
            <Route path="/link1" element={<Auth />} />
            <Route path="/link2" element={<AddAdmin />} />
            <Route path="/link3" element={<MahsulotQoshish />} />
            <Route path="/link4" element={<SotuvdagiMahsulot />} />
            {/* <Route path="/link5" element={<Buyurtmalar />} /> */}
            <Route path="/link5" element={<UserOrders />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
