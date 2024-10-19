import { useNavigate } from 'react-router-dom' // Import useNavigate
import './Admin.css'
import logopng from '../rasm/Frame 146.png'

function Admin() {
  const navigate = useNavigate() // Initialize navigate

  const handleImageClick = () => {
    navigate(-1) // Navigate to the previous page
  }

  return (
    <div>
      <div className="top">
        <div className="img" onClick={handleImageClick}>
          <img src={logopng} alt="Logo" />
        </div>
        <h2 className="h2">Boshqaruv</h2>
      </div>
      <div className="hr"></div>
    </div>
  )
}

export default Admin
