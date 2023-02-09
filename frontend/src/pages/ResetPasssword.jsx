import React from 'react'
import Nav from '../components/nav'
import Errors from '../components/errors'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axiosInstance from '../lib/axiosInstance';

export default function ForgotPasssword() {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    // create user object
    const user = {
      password,
      confirmPassword,
    }

    try {
      const response = await axiosInstance.post(
        `/reset-password/${searchParams.get('token')}`,
        user
      )
      setMessage(response.data.message)
      setLoading(false)
      navigate('/login')
    } catch (error) {
      setErrors(error.response)
      setLoading(false)
    }
  }

  return (
    <>
      <Nav />

      <h1>Reset Password</h1>

      <Errors errors={errors} />

      <p>{message}</p>

      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>

        <p>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            autoComplete="off"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
