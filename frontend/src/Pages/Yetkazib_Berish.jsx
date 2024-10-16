import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Css/Sotib_olish.css'
import './Css/Yetkazib_berish.css'
import './Css/Cart.css'

function Yetkazib_Berish() {
  const location = useLocation() // Hozirgi sahifa manzilini olish
  const [activeLink, setActiveLink] = useState(location.pathname) // Boshlang'ich faol havola

  useEffect(() => {
    setActiveLink(location.pathname) // Sahifa o'zgarganda faol havolani yangilash
  }, [location])

  return (
    <div>
      <ul className="container_ul">
        <li className="r">
          <Link
            to="/royhatdan-otish"
            className={`link ${
              activeLink === '/royhatdan-otish' ? 'active' : ''
            }`}
          >
            Royhatdan O'tish
          </Link>
        </li>
        <li className="r">
          <Link
            to="/yetkazib-berish"
            className={`link ${
              activeLink === '/yetkazib-berish' ? 'active' : ''
            }`}
          >
            Yetkazib berish
          </Link>
        </li>
        <li className="r">
          <Link
            to="/sotib-olindi"
            className={`link ${activeLink === '/sotib-olindi' ? 'active' : ''}`}
          >
            Sotib olindi
          </Link>
        </li>
      </ul>

      <div className="big_container">
        <div className="small_container">
          <h2>Shahar</h2>
          <input type="text" placeholder="" />
          <h2>Kocha</h2>
          <input type="text" placeholder="" />
          <h2>Uy nomer</h2>
          <input type="text" placeholder="" />
          <h2>Tel.</h2>
          <input type="text" placeholder="" />
        </div>
        <div className="btn">
          <button className="button3">Tasdiqlash</button>
          <button className="button4">Tasdiqlandi</button>
        </div>

        <div className="product1"></div>
      </div>

      <hr className="hr" />
    </div>
  )
}

export default Yetkazib_Berish
