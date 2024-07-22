import React, { useState } from 'react'

function CountryDetails({ country, lengthOfSearch }) {
    const [showDetails, setShowDetails] = useState(false)

    const handleShowClick = () => {
        setShowDetails(!showDetails)
    }

    return (
        <>
            {lengthOfSearch >= 1 ? (
                <button onClick={handleShowClick}>{showDetails ? 'Hide' : 'Show'}</button>
            ) : null}
            {showDetails ? <div>
                <h4>capital: {country.capital}</h4>
                <h4>area: {country.area}</h4>
                <img src={country.flags.png} alt="Bandera del país seleccionado" />
            </div>
                : null}
        </>
    )
}

export default CountryDetails