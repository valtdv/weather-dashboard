import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import Card from '../../components/Card'
import Loading from '../../components/Loading'

const Dashboard = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [isEnabled, setIsEnabled] = useState()
  const [location, setLocation] = useState({ lat: 0, long: 0 })

  //Validate if the browser has been given permissions to access the location
  const validateGeoLocation = () => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        //If permission is granted =, latitude and longitude data is saved
        navigator.geolocation.getCurrentPosition((position) => {
          const newObj = { lat: position.coords.latitude, long: position.coords.longitude }
          setLocation(newObj)
          setIsEnabled(true)
        })
      } else {
        setIsEnabled(false)
      }
    })
  }

  useEffect(() => {
    validateGeoLocation()
  }, [])

  //If location access is denied the user is redirected to the home page, otherwise it stops loading
  useEffect(() => {
    if (!isEnabled && isEnabled !== undefined) {
      navigate('/')
    } else if (isEnabled) {
      setLoading(false)
    }
  }, [isEnabled])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='dashboard'>
          <h1 className='dashboard__main-title'>Climate Dashboard</h1>
          <div className='dashboard__container'>
            <Card>
              <h2 className='dashboard__title'>Welcome, User!</h2>
              <p>We are showing climate information based on your location</p>
            </Card>
            <Card>
              <h2 className='dashboard__title'>Air pollution in the last 3 months</h2>
              <p>{location.lat}</p>
            </Card>
            <Card>
              <h2 className='dashboard__title'>Precipitation probability and temperature for the next 5 days</h2>
              <p>{location.long}</p>
            </Card>
            <Card>
              <h2 className='dashboard__title'>Current weather</h2>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
