import React, { useState, useEffect } from 'react'
import useAxios from '../../hooks/useAxios'
import PropTypes from 'prop-types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
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

  const baseUrl = `air_pollution/history?lat=${location.lat}&lon=${location.long}&start=${threeMonthsAgo}&end=${today}&appid=`

  const [airPollutionRoughData, setAirPollutionRoughData] = useState()
  const [airPollutionData, setAirPollutionData] = useState()

  const { data, loading, error } = useAxios(baseUrl)

  //If an error has occurred the component retorns an error message
  if (error) {
    return <p>There has been an error fetching the Open Weather API</p>
  }

  //Given the largeount of data the user has the posibility of filtering air pollution by hour
  const getFilteredData = (time) => {
    const newObj = airPollutionRoughData.filter((el) => el.dateWithHour.includes(time))

    setAirPollutionData(newObj)
  }

  //When the user onChange event is triggered by user selection on the dropdown, event to filter data is called
  const handleChange = (e) => {
    getFilteredData(e.target.value)
  }

  //Once the response has stopped loading data is processed and set
  useEffect(() => {
    if (!loading) {
      const list = data.list

      let newObj = list.map((el) => {
        return {
          //Date without hour to show on X axis
          date: new Date(el.dt * 1000).toDateString(),
          /*
          Date with hour to filter data. toString() function is used instead of toLocaleString() function to standarize
          between browsers
          */
          dateWithHour: new Date(el.dt * 1000).toString(),
          ...el.components
        }
      })

      setAirPollutionRoughData(newObj)
    }
  }, [loading])

  //Once the rough data is obtained the final data is filtered initially by noon
  useEffect(() => {
    if (airPollutionRoughData !== undefined) {
      getFilteredData('12:00:00')
    }
  }, [airPollutionRoughData])

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='air-pollution__form'>
            <label htmlFor='hour'>Filter data by hour: </label>
            <select className='air-pollution__form-select' name='hour' id='hour' defaultValue='12:00:00' onChange={handleChange}>
              <option value='00:00:00'>00:00:00</option>
              <option value='01:00:00'>01:00:00</option>
              <option value='02:00:00'>02:00:00</option>
              <option value='03:00:00'>03:00:00</option>
              <option value='04:00:00'>04:00:00</option>
              <option value='05:00:00'>05:00:00</option>
              <option value='06:00:00'>06:00:00</option>
              <option value='07:00:00'>07:00:00</option>
              <option value='08:00:00'>08:00:00</option>
              <option value='09:00:00'>09:00:00</option>
              <option value='10:00:00'>10:00:00</option>
              <option value='11:00:00'>11:00:00</option>
              <option value='12:00:00'>12:00:00</option>
              <option value='13:00:00'>13:00:00</option>
              <option value='14:00:00'>14:00:00</option>
              <option value='15:00:00'>15:00:00</option>
              <option value='16:00:00'>16:00:00</option>
              <option value='17:00:00'>17:00:00</option>
              <option value='18:00:00'>18:00:00</option>
              <option value='19:00:00'>19:00:00</option>
              <option value='29:00:00'>20:00:00</option>
              <option value='21:00:00'>21:00:00</option>
              <option value='22:00:00'>22:00:00</option>
              <option value='23:00:00'>23:00:00</option>
            </select>
          </div>
          <div className='air-pollution__graph'>
            <div className='air-pollution__graph__container'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart
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
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </>
  )
}

AirPollutionGraph.propTypes = { location: PropTypes.object.isRequired }

export default AirPollutionGraph
