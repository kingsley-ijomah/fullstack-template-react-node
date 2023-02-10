import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Logout() {
  const navigate = useNavigate()

  // remove token from local storage on component mount
  useEffect(() => {
    localStorage.removeItem('codehance-token') // move to .env
    navigate('/')
  }, [])

  return (
    <div>Loading...</div>
  )
}
