import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'
import './AirPollutionGraph.css'

const AirPollutionGraph = ({ location }) => {
  /* 
  Get the dates for today and three months ago. Dates for today and three months ago are set 
  in unix timestamp given the API's requirements
  */
  const date = new Date()
  const today = Date.now()

  date.setMonth(date.getMonth() - 3)

  const threeMonthsAgo = (date / 1000) | 0

  const baseUrl = `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${location.lat}&lon=${location.long}&start=${threeMonthsAgo}&end=${today}&appid=aad3bf7d93300ce6275d92cf0ae5c7d9&exclude=hourly`

  const [airPollutionRoughData, setAirPollutionRoughData] = useState()
  const [airPollutionData, setAirPollutionData] = useState()

  //Given the large amount of data the user has the posibility of filtering air pollution by hour
  const getFilteredData = (time) => {
    const newObj = airPollutionRoughData.filter((el) => el.dateWithHour.includes(time))

    setAirPollutionData(newObj)
  }

  //When the user onChange event is triggered by user selection on the dropdown, event to filter data is called
  const handleChange = (e) => {
    getFilteredData(e.target.value)
  }

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      const data = response.data
      const list = data.list

      let newObj = list.map((el) => {
        return {
          date: new Date(el.dt * 1000).toDateString(),
          dateWithHour: new Date(el.dt * 1000).toLocaleString(),
          ...el.components
        }
      })

      setAirPollutionRoughData(newObj)
    })
  }, [])

  //Once the rough data is obtained the final data is filtered initially by noon
  useEffect(() => {
    if (airPollutionRoughData !== undefined) {
      getFilteredData('12:00:00 PM')
    }
  }, [airPollutionRoughData])

  return (
    <>
      <div className='air-pollution__form'>
        <label htmlFor='hour'>Filter data by hour: </label>
        <select className='air-pollution__form-select' name='hour' id='hour' defaultValue='12:00:00 PM' onChange={handleChange}>
          <option value='12:00:00 AM'>00:00:00</option>
          <option value='1:00:00 AM'>01:00:00</option>
          <option value='2:00:00 AM'>02:00:00</option>
          <option value='3:00:00 AM'>03:00:00</option>
          <option value='4:00:00 AM'>04:00:00</option>
          <option value='5:00:00 AM'>05:00:00</option>
          <option value='6:00:00 AM'>06:00:00</option>
          <option value='7:00:00 AM'>07:00:00</option>
          <option value='8:00:00 AM'>08:00:00</option>
          <option value='9:00:00 AM'>09:00:00</option>
          <option value='10:00:00 AM'>10:00:00</option>
          <option value='11:00:00 AM'>11:00:00</option>
          <option value='12:00:00 PM'>12:00:00</option>
          <option value='1:00:00 PM'>13:00:00</option>
          <option value='2:00:00 PM'>14:00:00</option>
          <option value='3:00:00 PM'>15:00:00</option>
          <option value='4:00:00 PM'>16:00:00</option>
          <option value='5:00:00 PM'>17:00:00</option>
          <option value='6:00:00 PM'>18:00:00</option>
          <option value='7:00:00 PM'>19:00:00</option>
          <option value='8:00:00 PM'>20:00:00</option>
          <option value='9:00:00 PM'>21:00:00</option>
          <option value='10:00:00 PM'>22:00:00</option>
          <option value='11:00:00 PM'>23:00:00</option>
        </select>
      </div>
      <div className='air-pollution__graph'>
        <div className='air-pollution__graph__container'>
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
