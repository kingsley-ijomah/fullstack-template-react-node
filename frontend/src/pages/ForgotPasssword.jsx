import React from 'react'
import Nav from '../components/nav'
import Errors from '../components/errors'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ForgotPasssword() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    // create user object
    const user = {
      email,
    }

    try {
      // send user object to backend
      const response = await axios.post(
        'http://localhost:4000/api/forgot-password',
        user
      )

      setMessage(response.data.message)
      setLoading(false)
    } catch (error) {
      setErrors(error.response.data)
      setLoading(false)
    }
  }

  return (
    <>
      <Nav />

      <h1>Forgot Password</h1>

      <Errors errors={errors} />

      <p>{message}</p>

      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>

        <p>
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </p>
      </form>
    </>
  )
}
