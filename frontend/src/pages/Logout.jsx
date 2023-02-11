import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useAuth from '../lib/useAuth'

export default function Logout() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  // remove token from local storage on component mount
  useEffect(() => {
    signOut()
    navigate('/login')
  }, [])

  return (
    <div>Loading...</div>
  )
}
