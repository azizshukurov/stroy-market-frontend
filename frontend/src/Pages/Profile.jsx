import React, { useState, useEffect } from 'react'
import './Css/Profile.css' // Ensure you have your CSS

function Profile() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('userToken')

      if (token) {
        try {
          const response = await fetch(
            'https://qizildasturchi.uz/api/account/me',
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          )

          if (!response.ok) {
            throw new Error('Failed to fetch user data')
          }

          const data = await response.json()
          setUserData(data.data.data) // Adjust this according to your API response structure
          console.log(data.data.data)
        } catch (error) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('cart')
    window.location.href = '/'
  }

  if (loading) return <div>Yuklanmoqda...</div>
  if (error) return <div>Xato: {error}</div>

  return (
    <div className="profile">
      {userData ? (
        <div className="profile-details">
          <h2>Profil</h2>
          <p>Ism: {userData.full_name}</p>
          <p>Telefon raqami: {userData.phone_number}</p>
          {/* Add other user data as needed */}

          <button className="logout-button" onClick={handleLogout}>
            Chiqish
          </button>
        </div>
      ) : (
        <p>Foydalanuvchi ma'lumotlari topilmadi.</p>
      )}
    </div>
  )
}

export default Profile
