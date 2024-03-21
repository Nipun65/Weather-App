import { useState } from 'react'

import Card from './components/Card'
import Loader from './components/Loader'
import InputGroup from './components/InputGroup'
import './App.css'
import { CardData } from './interface'

function App() {
  const [weather, setWeather] = useState<CardData>(
    JSON.parse(localStorage.getItem('weather') as string) || null
  )
  const [loading, setLoading] = useState({
    submitLoader: false,
    cardLoader: false,
  })

  return (
    <div className="main">
      <InputGroup
        setLoading={setLoading}
        setWeather={setWeather}
        loading={loading}
      />

      {loading.cardLoader ? (
        <Loader />
      ) : (
        weather && <Card data={weather}></Card>
      )}
    </div>
  )
}

export default App
