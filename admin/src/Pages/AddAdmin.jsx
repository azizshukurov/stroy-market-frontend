import { useState, useEffect } from 'react'
import axios from 'axios'
import './Css/AddAdmin.css'

function AddAdmin() {
  const [admins, setAdmins] = useState([]) // State to store list of admins
  const [loading, setLoading] = useState(true) // State for loading status
  const [error, setError] = useState('') // State for error handling
  const [showModal, setShowModal] = useState(false) // State to show/hide modal
  const [login, setLogin] = useState('') // State for storing login
  const [password, setPassword] = useState('') // State for storing password

  // Fetch the list of admins when the component mounts
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('userToken')
        const response = await axios.get(
          'https://qizildasturchi.uz/api/admin',
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        ) // Replace with your actual API endpoint
        setAdmins(response.data) // Store the list of admins in the state
        setLoading(false) // Set loading to false after the data is fetched
      } catch (err) {
        setError('Failed to load admins')
        setLoading(false)
      }
    }
    fetchAdmins()
  }, [])

  // Show loading message while fetching data
  if (loading) {
    return <div>Loading...</div>
  }

  // Show error message if something goes wrong
  if (error) {
    return <div>{error}</div>
  }

  // Modal to add a new admin
  const handleModalClose = () => {
    setShowModal(false)
  }

  const handleModalOpen = () => {
    setShowModal(true)
  }

  const sendAddAdmin = async () => {
    try {
      console.log(login)
      console.log(password)
      const token = localStorage.getItem('userToken')
      const response = await axios.get(
        `https://qizildasturchi.uz/api/admin/create?login=${login}&password=${password}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response)
      if (response.status === 200) {
        window.location.href = '/link2' // Redirect to another route after admin is added
      }
    } catch (error) {
      // Handle error response
      setError("Admin qo'shilmadi yoki avval qo'shilgan")
    }
  }

  return (
    <div className="AddAdmin">
      {/* Top section with 'Create Admin' button */}
      <div className="top">
        <div className="background"></div>
        <button onClick={handleModalOpen}>Admin qo'shish</button>
      </div>

      {/* List of all admins */}
      <div className="adminsList">
        <div className="part1">
          <div className="box1">
            {admins.data.map((admin) => (
              <div className="h23" key={admin.id}>
                <h2 className="h21">{admin.phone_number}</h2>
                <h2 className="h22">admin</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Create New Admin</h2>
            <form>
              <div>
                <label>Login:</label>
                <input
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)} // Update login state
                  placeholder="Loginni kiriting"
                />
              </div>
              <div>
                <label>Parol:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  placeholder="Parolni kiring"
                />
              </div>
              <div className="modal-buttons">
                <button type="button" onClick={sendAddAdmin}>
                  Admin qo'shish
                </button>
                <button type="button" onClick={handleModalClose}>
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddAdmin
