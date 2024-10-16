import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Css/Sotib_olish.css';

function SotibOlindi() {
  const location = useLocation(); // Hozirgi sahifa manzilini olish
  const [activeLink, setActiveLink] = useState(location.pathname); // Boshlang'ich faol havola

  useEffect(() => {
    setActiveLink(location.pathname); // Sahifa o'zgarganda faol havolani yangilash
  }, [location]);

  return (
    <div>
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
    </div>
  );
}

export default SotibOlindi;
