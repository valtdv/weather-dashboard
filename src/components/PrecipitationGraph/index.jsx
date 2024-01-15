import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './PrecipitationGraph.css'

const PrecipitationGraph = ({ location }) => {
  const baseUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.long}&appid=aad3bf7d93300ce6275d92cf0ae5c7d9&units=metric`

  const [precipitationData, setPrecipitationData] = useState({})

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      const data = response.data
      const list = data.list

      const newObj = list.map((el) => {
        return {
          // Posibility of precipitation. API returns a number between 0 and 1 so we must multiply for 100 to get a percentage value
          precipitationProbability: el.pop * 100,
          // Temperature. API returns value in celsius after passing query param 'units=metric'
          temperature: el.main.temp,
          // Date. API returns date in 'yyyy-mm-dd hh:mm:ss"
          Date: el.dt_txt
        }
      })

      setPrecipitationData(newObj)
    })
  }, [])

  return (
    <>
      <div className='precipitation-graph'>
        <div className='precipitation-graph__container'>
          <ResponsiveContainer width='100%' height='100%'>
            <ComposedChart
              width={500}
              height={400}
              data={precipitationData}
              margin={{
                top: 8,
                right: 8,
                bottom: 8,
                left: 8
              }}
            >
              <CartesianGrid stroke='#f5f5f5' />
              <XAxis dataKey='Date' scale='band' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type='monotone' dataKey='precipitationProbability' fill='#9a8c98' stroke='#8884d8' />
              <Line type='monotone' dataKey='temperature' stroke='#74A4BC' />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

PrecipitationGraph.propTypes = { location: PropTypes.isRequired }

export default PrecipitationGraph
