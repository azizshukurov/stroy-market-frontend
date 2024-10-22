import { useState, useEffect } from 'react'
import axios from 'axios'
import './Css/AddAdmin.css'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

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
      const token = localStorage.getItem('userToken')
      const response = await axios.get(
        `https://qizildasturchi.uz/api/admin/create?login=${login}&password=${password}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
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
      <div className="top m-3">
        <Button variant="primary" onClick={handleModalOpen}>
          Admin qo'shish
        </Button>
      </div>

      {/* List of all admins */}
      <div className="adminsList w-50">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Phone Number</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {admins.data.map((admin, index) => (
              <tr key={admin.id}>
                <td>{index + 1}</td>
                <td>{admin.phone_number}</td>
                <td>admin</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {showModal && (
        <div
          className="modal show"
          style={{ display: 'block', position: 'fixed', zIndex: 1050 }}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Yangi admin qo'shish</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="mb-3">
                  <label>Login:</label>
                  <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)} // Update login state
                    placeholder="Loginni kiriting"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label>Parol:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                    placeholder="Parolni kiring"
                    className="form-control"
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={sendAddAdmin}>
                Admin qo'shish
              </Button>
              <Button variant="secondary" onClick={handleModalClose}>
                Bekor qilish
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
    </div>
  )
}

export default AddAdmin
