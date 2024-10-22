import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import './Css/Login.css'

import BackgroundImage from '../assets/background.png'

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await axios.post(
        'https://qizildasturchi.uz/api/admin/login',
        {
          login: phoneNumber,
          password: code,
        }
      )

      if (response.status === 200) {
        const { token } = response.data.data
        localStorage.setItem('userToken', token)
        window.location.href = '/link2'
      }
    } catch (error) {
      setError('Admin topilmadi yoki login va parol xato kiritildi.')
      setShow(true)
    }
    setLoading(false)
  }

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="h4 mb-2 text-center">Login</div>
        {/* Alert */}
        {show && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            {error}
          </Alert>
        )}
        <Form.Group className="mb-2" controlId="phoneNumber">
          <Form.Label>Telefo raqam</Form.Label>
          <Form.Control
            type="text"
            placeholder="901112233"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="code">
          <Form.Label>Kod</Form.Label>
          <Form.Control
            type="password"
            placeholder="Kod kiriting"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          className="w-100"
          variant="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Log In'}
        </Button>
      </Form>
    </div>
  )
}

export default Login
