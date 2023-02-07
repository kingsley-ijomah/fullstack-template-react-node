import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Logout() {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('codehance-token') // move to .env
    navigate('/')
  }, [navigate])

  return (
    <div>Loading...</div>
  )
}
