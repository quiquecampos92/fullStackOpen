import React from 'react'

function Country({ countries, search }) {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

    return (
        filteredCountries.map(country => (
            <div key={country.cca3}>
                <h1>{country.name.common}</h1>
                <h4>capital: {country.capital}</h4>
                <h4>area: {country.area}</h4>
                <img src={country.flags.png} alt="Bandera del país seleccionado" />
            </div>
        ))
    )
}

export default Country