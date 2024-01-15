import React from 'react'
import './Dashboard.css'
import Card from '../../components/Card'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <h1 className='dashboard__main-title'>Climate Dashboard</h1>
      <div className='dashboard__container'>
        <Card>
          <h2 className='dashboard__title'>Welcome, User!</h2>
          <p>We are showing climate information based on your location</p>
        </Card>
        <Card>
          <h2 className='dashboard__title'>Air pollution in the last 3 months</h2>
        </Card>
        <Card>
          <h2 className='dashboard__title'>Precipitation probability and temperature for the next 5 days</h2>
        </Card>
        <Card>
          <h2 className='dashboard__title'>Current weather</h2>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
