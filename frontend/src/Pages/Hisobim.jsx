import React, { useState } from 'react'
import './Css/Hisobim.css'
import './Css/Royhatdan_otish.css'

function Hisobim() {
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleRegister = async () => {
    setErrorMessage('')

    // Check if phone number and password are provided
    if (!phoneNumber || !password) {
      setErrorMessage('Iltimos, telefon raqamini va parolni kiriting!')
      return
    }

    try {
      // Attempt to register the user
      const registerResponse = await fetch(
        'http://localhost:3334/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: fullName,
            phone_number: phoneNumber,
            password,
          }),
        }
      )

      if (registerResponse.ok) {
        // Successfully registered, handle the token
        const registerData = await registerResponse.json()
        console.log(registerData)
        alert("Ro'yxatdan o'tish muvaffaqiyatli!")
        localStorage.setItem('userToken', registerData.token)
        localStorage.setItem('userId', registerData.data.id)
      } else if (registerResponse.status === 400) {
        // Bad Request (user already exists), try login
        const loginResponse = await fetch('http://localhost:3334/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone_number: phoneNumber, password }),
        })

        const loginData = await loginResponse.json()
        console.log(loginData.data.token)
        if (loginData.success) {
          // Successfully logged in, handle the token
          alert('Tizimga kirish muvaffaqiyatli!')
          localStorage.setItem('userToken', loginData.data.token) // Store token if login is successful
          localStorage.setItem('userId', loginData.data.data.id) // Store token if login is successful
        } else {
          setErrorMessage("Telefon raqami yoki parol noto'g'ri.")
        }
      } else {
        setErrorMessage("Ro'yxatdan o'tishda xato yuz berdi.")
      }
    } catch (error) {
      console.error('Error:', error)
      setErrorMessage("Tarmoq xatosi! Iltimos, qaytadan urinib ko'ring.")
    }
  }

  return (
    <div className="hisobim">
      <h2 className="h2R">Royhatdan Otish</h2>
      <div className="login10">
        <div className="input10">
          <input
            className="input"
            type="text"
            placeholder="Ismingizni kiriting"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Telefon raqamingizni kiriting"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Parolni kiriting"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btn">
          <button className="button1" onClick={handleRegister}>
            Tasdiqlash
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="h3"></div>
    </div>
  )
}

export default Hisobim