import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './CurrentWeatherTable.css'
import useAxios from '../../hooks/useAxios'

const CurrentWeatherTable = ({ location, setUserLocation }) => {
  const baseUrl = `weather?lat=${location.lat}&lon=${location.long}&units=metric&appid=`

  const [weatherData, setWeatherData] = useState({})

  const { data, loading, error } = useAxios(baseUrl)

  //If an error has occurred the component retorns an error message
  if (error) {
    return <p>There has been an error fetching the Open Weather API</p>
  }

  //Once the response has stopped loading data is processed and set
  useEffect(() => {
    if (!loading) {
      const userLocation = `${data.name}, ${data.sys.country}`
      setUserLocation(userLocation)

      const newObj = {
        weather: data.weather[0].main,
        description: data.weather[0].description,
        // API returns value in celsius after passing query param 'units=metric'
        temperature: data.main.temp,
        pressure: data.main.pressure,
        humidity: data.main.humidity
      }

      setWeatherData(newObj)
    }
  }, [loading])

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='current-weather'>
          <div className='current-weather__table-container'>
            <table className='current-weather__table'>
              <thead className='current-weather__table-header'>
                <tr>
                  <th className='current-weather__table-title'>Weather</th>
                  <th className='current-weather__table-title'>Description</th>
                  <th className='current-weather__table-title'>Temperature °C</th>
                  <th className='current-weather__table-title'>Pressure</th>
                  <th className='current-weather__table-title'>Humidity %</th>
                </tr>
              </thead>
              <tbody className='current-weather__table-body'>
                <tr>
                  <td className='current-weather__table-col'>{weatherData.weather}</td>
                  <td className='current-weather__table-col'>{weatherData.description}</td>
                  <td className='current-weather__table-col'>{weatherData.temperature}</td>
                  <td className='current-weather__table-col'>{weatherData.pressure}</td>
                  <td className='current-weather__table-col'>{weatherData.humidity}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}

CurrentWeatherTable.propTypes = { location: PropTypes.object.isRequired, setUserLocation: PropTypes.func.isRequired }

export default CurrentWeatherTable
