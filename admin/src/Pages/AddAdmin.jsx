import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Css/AddAdmin.css'
import { Navigate } from 'react-router-dom'

function AddAdmin() {
  const [admins, setAdmins] = useState([]) // State to store list of admins
  const [loading, setLoading] = useState(true) // State for loading status
  const [error, setError] = useState('') // State for error handling

  // Fetch the list of admins when the component mounts
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('userToken')
        const response = await axios.get('https://qizildasturchi.uz/api/admin', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }) // Replace with your actual API endpoint
        setAdmins(response.data) // Store the list of admins in the state
        setLoading(false) // Set loading to false after the data is fetched
      } catch (err) {
        setError('Failed to load admins')
        setLoading(false)
      }
    }
    fetchAdmins()
  }, [])
  console.log(admins)
  // Show loading message while fetching data
  if (loading) {
    return <div>Loading...</div>
  }

  // Show error message if something goes wrong
  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="AddAdmin">
      {/* Top section with 'Create Admin' button */}
      <div className="top">
        <div className="background"></div>
        {/* Create Admin button */}
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
            <button>Admin qo'shish</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAdmin
