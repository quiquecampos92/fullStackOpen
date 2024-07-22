import React from 'react'

import CountryDetails from './CountryDetails'

function Country({ countries, search }) {

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    const lengthOfSearch = search.length

    return (
        filteredCountries.map(country => (
            <div key={country.cca3} className='country'>
                <h1>{country.name.common}</h1>
                <CountryDetails country={country} lengthOfSearch={lengthOfSearch} />
            </div>
        ))
    )
}

export default Country