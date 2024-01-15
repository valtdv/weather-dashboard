import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import './PrecipitationGraph.css'

const PrecipitationGraph = ({ location }) => {
  const baseUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.long}&appid=aad3bf7d93300ce6275d92cf0ae5c7d9&units=metric`

  const [precipitationData, setPrecipitationData] = useState({})

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      const data = response.data
      const list = data.list

      const precipitationPosibility = list.map((el) => {
        return {
          precipitationPosibility: el.pop * 100,
          date: list.dt
        }
      })

      const temperature = list.map((el) => {
        return {
          temperature: el.main.temp,
          date: list.dt
        }
      })

      const newObj = { precipitationPosibility, temperature }

      setPrecipitationData(newObj)

      console.log(precipitationData)
      console.log(newObj)
    })
  }, [])
  return <div className='precipitation-graph'>{location.lat}</div>
}

PrecipitationGraph.propTypes = { location: PropTypes.isRequired }

export default PrecipitationGraph
