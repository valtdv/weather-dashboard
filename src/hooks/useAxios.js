import { useState, useEffect } from 'react'
import axios from 'axios'

const useAxios = (url) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setloading] = useState(true)

  const getData = () => {
    axios
      .get(url)
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
