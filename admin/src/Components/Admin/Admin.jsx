import { Link } from 'react-router-dom' // If you are using react-router

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Admin panel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/link1">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/link2">
                Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/link3">
                Mahsulot
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Sotuvdagi Mahsulot
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">
                Kategoriya
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/link5">
                Buyurtmalar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
