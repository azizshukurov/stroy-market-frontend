import React, { useState } from 'react'
import axios from 'axios' // Import axios for HTTP requests

function Auth() {
  const [phoneNumber, setPhoneNumber] = useState('') // State for phone number
  const [code, setCode] = useState('') // State for code
  const [error, setError] = useState('') // State for errors

  // Handle form submission
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://qizildasturchi.uz/api/admin/login',
        {
          login: phoneNumber,
          password: code,
        }
      )

      if (response.status === 200) {
        const { token } = response.data.data // Assuming the backend returns a token
        localStorage.setItem('userToken', token) // Save the token to localStorage
        window.location.href = '/link2' // Redirect to another route after login
      }
    } catch (error) {
      // Handle error response
      setError('Admin topilmadi yoki login va parol xato kiritildi.')
    }
  }

  return (
    <div className="Auth">
      <div className="bottom">
        <div className="login2">
          <div className="inp">
            <input
              className="input"
              type="text"
              placeholder="901112233"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)} // Update phone number state
            />
            <input
              className="input"
              type="password"
              placeholder="Kod kiriting"
              value={code}
              onChange={(e) => setCode(e.target.value)} // Update code state
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="btn">
            <button className="button1" onClick={handleLogin}>
              Kirish
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
