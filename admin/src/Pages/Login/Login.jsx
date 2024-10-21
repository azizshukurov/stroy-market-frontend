import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Login.css'

function Login() {
  const location = useLocation() // Hozirgi sahifa manzilini olish
  const [activeLink, setActiveLink] = useState(location.pathname) // Boshlang'ich faol havola

  useEffect(() => {
    setActiveLink(location.pathname) // Sahifa o'zgarganda faol havolani yangilash
  }, [location])

  return (
    <div className="Top">
      <div className="div">
        <ul className="container_ul">
          <li className="r">
            <Link
              to="/link1"
              className={`link ${activeLink === '/link1' ? 'active' : ''}`}
            >
              <img
                src="https://static-00.iconduck.com/assets.00/user-alt-light-icon-256x256-kit5oi9x.png"
                alt=""
              />
            </Link>
          </li>
          <li className="r">
            <Link
              to="/link2"
              className={`link ${activeLink === '/link2' ? 'active' : ''}`}
            >
              <img
                src="https://cdn.prod.website-files.com/60235b21efae4eae1be0f7dd/60235b21efae4e3a38e0f875_User-Group.webp"
                alt=""
              />
            </Link>
          </li>
          <li className="r">
            <Link
              to="/link3"
              className={`link ${activeLink === '/link3' ? 'active' : ''}`}
            >
              <img
                src="https://static-00.iconduck.com/assets.00/add-ring-light-icon-1024x1022-5hajtieo.png"
                alt=""
              />
            </Link>
          </li>
          <li className="r">
            <Link
              to="/link4"
              className={`link ${activeLink === '/link4' ? 'active' : ''}`}
            >
              <img
                src="https://static-00.iconduck.com/assets.00/user-alt-light-icon-256x256-kit5oi9x.png"
                alt=""
              />
            </Link>
          </li>
          <li className="r">
            <Link
              to="/link5"
              className={`link ${activeLink === '/link5' ? 'active' : ''}`}
            >
              <img
                src="https://static-00.iconduck.com/assets.00/user-alt-light-icon-256x256-kit5oi9x.png"
                alt=""
              />
            </Link>
          </li>
          <li className="r">
            <Link
              to="/category"
              className={`link ${activeLink === '/category' ? 'active' : ''}`}
            >
              <img
                src="https://static-00.iconduck.com/assets.00/user-alt-light-icon-256x256-kit5oi9x.png"
                alt=""
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Login
