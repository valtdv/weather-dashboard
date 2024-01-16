import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'
import './AirPollutionGraph.css'

const AirPollutionGraph = ({ location }) => {
  /* 
  Get the dates for today and three months ago.Dates for today and three months ago are set 
  in unix timestamp given the API's requirements
  */
  const date = new Date()
  const today = Date.now()

  date.setMonth(date.getMonth() - 3)

  const threeMonthsAgo = (date / 1000) | 0

  const baseUrl = `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${location.lat}&lon=${location.long}&start=${threeMonthsAgo}&end=${today}&appid=aad3bf7d93300ce6275d92cf0ae5c7d9&exclude=hourly`

  const [airPollutionData, setAirPollutionData] = useState({})

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      const data = response.data
      const list = data.list
      let newObj = list.map((el) => {
        return {
          date: new Date(el.dt * 1000).toString(),
          ...el.components
        }
      })

      //Filter air pollution by noon to reduce data

      newObj = newObj.filter((el) => el.date.includes('12:00:00'))
      console.log(newObj)
      console.log(airPollutionData)
      setAirPollutionData(newObj)
    })
  }, [])

  return (
    <>
      <div className='air-pollution-graph'>
        <div className='air-pollution-graph__container'>
          <ResponsiveContainer width='100%' height='100%'>
            <ComposedChart
              width={500}
              height={400}
              data={airPollutionData}
              margin={{
                top: 8,
                right: 8,
                bottom: 8,
                left: 8
              }}
            >
              <CartesianGrid stroke='#f5f5f5' />
              <XAxis dataKey='date' scale='band' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='no2' stroke='#74A4BC' />
              <Line type='monotone' dataKey='o3' stroke='#444B6E' />
              <Line type='monotone' dataKey='so2' stroke='#9AB87A' />
              <Line type='monotone' dataKey='pm10' stroke='#B81365' />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

AirPollutionGraph.propTypes = { location: PropTypes.isRequired }

export default AirPollutionGraph
