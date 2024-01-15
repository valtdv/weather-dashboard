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

  // Redirect to dashboard once permission is granted
  const goToDashboard = () => {
    navigate('/dashboard')
  }

  // Show error message on title in case permission isn't granted
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
    // Ask user for location once component is mount
    getLocation()
  }, [])

  return (
    <div className='home'>
      <Card>
        <div className='home__wrapper'>
          <h1 className='home__title'>{title}</h1>
          <p className='home__text'>
            Please allows us to access your location (and remember the decision on your browser to avoid errors) so we can redirect you to
            the dashboard.
          </p>
          <img className='home__image' src={Weather} alt='Image of a woman showing some climate information in a dashboard' />
        </div>
      </Card>
    </div>
  )
}

export default Home
