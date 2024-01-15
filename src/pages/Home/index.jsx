import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import Card from '../../components/Card'
import Weather from '../../assets/images/weather.svg'

const Home = () => {
  const [title, setTitle] = useState('Welcome to Climate Dashboard!')
  const navigate = useNavigate()

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(goToDashboard, showError)
    } else {
      setTitle('Oh no! 😢 Geolocation is not supported by this browser.')
    }
  }

  const goToDashboard = () => {
    navigate('/dashboard')
  }

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setTitle('Oh no! 😢 User denied the request for Geolocation.')
        break
      case error.POSITION_UNAVAILABLE:
        setTitle('Oh no! 😢 Location information is unavailable.')
        break
      case error.TIMEOUT:
        setTitle('Oh no! 😢 The request to get user location timed out.')
        break
      case error.UNKNOWN_ERROR:
        setTitle('Oh no! 😢 An unknown error occurred.')
        break
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <div className='home'>
      <Card>
        <div className='home__wrapper'>
          <h1 className='home__title'>{title}</h1>
          <p className='home__text'>Please allows us to access your location so we can redirect you to the dashboard.</p>
          <img className='home__image' src={Weather} alt='Image of a woman showing some climate information in a dashboard' />
        </div>
      </Card>
    </div>
  )
}

export default Home
