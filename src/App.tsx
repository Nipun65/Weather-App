import { useState } from 'react'
import { CardData, Location } from '@interfaces'
import Card from '@components/Card'
import Loader from '@components/Loader'
import InputGroup from '@components/InputGroup'
import './App.css'

function App() {
  const [weather, setWeather] = useState<CardData>(
    JSON.parse(localStorage.getItem('weather') as string) || null
  )
  const [loading, setLoading] = useState({
    submitLoader: false,
    cardLoader: false,
  })
  const [selectedOption, setSelectedOption] = useState<Location | null>(null)

  return (
    <div className="main">
      <InputGroup
        setLoading={setLoading}
        setWeather={setWeather}
        loading={loading}
        setSelectedOption={setSelectedOption}
      />

      {loading.cardLoader ? (
        <Loader />
      ) : (
        weather && <Card data={weather} selectedOption={selectedOption}></Card>
      )}
    </div>
  )
}

export default App
