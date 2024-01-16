import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = process.env.REACT_APP_WEATHER_API_URL
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

const useAxios = (url) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setloading] = useState(true)

  const getData = () => {
    axios
      .get(`${API_URL}${url}${API_KEY}`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setloading(false)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return { data, error, loading }
}

export default useAxios
