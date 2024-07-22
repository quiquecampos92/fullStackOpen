import { useEffect, useState } from 'react'

import SearchCountry from './components/SearchCountry'
import Country from './components/Country'

import dataCountries from './services/dataCountries'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const hookEffectCountries = () => {
    dataCountries.getAllCountries()
      .then(response => {
        console.log('Países completados');
        setCountries(response.data)
      })
  }

  useEffect(hookEffectCountries, [])

  return (
    <>
      <SearchCountry setSearch={setSearch} />
      <Country countries={countries} search={search} />
    </>
  )
}

export default App
