import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './Components/Admin/Admin'
import Auth from './Pages/Auth'
import AddAdmin from './Pages/AddAdmin'
import MahsulotQoshish from './Pages/MahsulotQoshish'
import SotuvdagiMahsulot from './Pages/SotuvdagiMahsulot'
import Category from './Pages/Category'
import UserOrders from './Pages/UserOrders'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const userToken = localStorage.getItem('userToken')

  return (
    <BrowserRouter>
      <Admin />
      <Routes>
        {!userToken ? (
          <Route path="*" element={<Auth />} />
        ) : (
          <>
            <Route path="/link1" element={<Auth />} />
            <Route path="/link2" element={<AddAdmin />} />
            <Route path="/link3" element={<MahsulotQoshish />} />
            <Route path="/link4" element={<SotuvdagiMahsulot />} />
            <Route path="/link5" element={<UserOrders />} />
            <Route path="/category" element={<Category />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
