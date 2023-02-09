import React from 'react'
import Nav from '../components/nav'
import Errors from '../components/errors'
import { useState } from 'react'
import axiosInstance from '../lib/axiosInstance'

export default function ForgotPasssword() {

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
      const response = await axiosInstance.post('/forgot-password', user)

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
