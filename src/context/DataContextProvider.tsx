import React, { createContext, useEffect, useState } from 'react'
import { fetchData, isDataValid } from '../../utils/'



export const DataContext = createContext<DataContextType | null>(null)

export default function DataContextProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DataSchema | null>(null)

  useEffect(() => {

    try {
      const cachedData = JSON.parse(localStorage.getItem('cachedData') || '') as DataSchema

      if (!isDataValid(cachedData)) throw new Error("Cached data is corrupted") // Precaution to if some nerds mess up local storage
      setData(cachedData)
      setLoading(false)
    }

    catch (error) {
      fetchData().then(res => {
        setLoading(false)
        setData(res)
        localStorage.setItem('cachedData', JSON.stringify(res))
      })
    }

  }, [])


  const updateData = (newData: DataSchema): void => {
    localStorage.setItem('cachedData', JSON.stringify(newData))
    setData(newData)
  }


  if (loading) return <div>Loading...</div>

  return (
    <DataContext.Provider value={{ data: data!, updateData }}>
      {children}
    </DataContext.Provider>
  )
}

