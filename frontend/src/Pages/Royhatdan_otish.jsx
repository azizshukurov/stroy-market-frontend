import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Css/Sotib_olish.css';
import './Css/Royhatdan_otish.css'
import './Css/Cart.css'

function Royhatdan_Otish() {
  const location = useLocation(); // Hozirgi sahifa manzilini olish
  const [activeLink, setActiveLink] = useState(location.pathname); // Boshlang'ich faol havola

  useEffect(() => {
    setActiveLink(location.pathname); // Sahifa o'zgarganda faol havolani yangilash
  }, [location]);

  return (
    <div className='royhatdan_otish'>
      <ul className='container_ul'>
        <li className='r'>
          <Link
            to="/royhatdan-otish"
            className={`link ${activeLink === '/royhatdan-otish' ? 'active' : ''}`}
          >
            Royhatdan O'tish
          </Link>
        </li>
        <li className='r'>
          <Link
            to="/yetkazib-berish"
            className={`link ${activeLink === '/yetkazib-berish' ? 'active' : ''}`}
          >
            Yetkazib berish
          </Link>
        </li>
        <li className='r'>
          <Link
            to="/sotib-olindi"
            className={`link ${activeLink === '/sotib-olindi' ? 'active' : ''}`}
          >
            Sotib olindi
          </Link>
        </li>
      </ul>

      <div className="login">
        <div className="login2">
                 <input className='input' type="text" placeholder='Telefon raqamingizni kiriting' />
                 <input className='input' type="password" placeholder='kodni kiriting' />
                 <div className="btn">
                 <button className='button1'>Tasdiqlash</button>
                 <button className='button2'>Tadiqlangan</button>
                 </div>
      </div>
      </div>
      <hr className="hr" />
      
    </div>
  );
}

export default Royhatdan_Otish;
