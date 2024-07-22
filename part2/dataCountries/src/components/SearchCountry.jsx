import React from 'react'

import utils from '../services/utils'


function SearchCountry({ setSearch }) {
    return (
        <div>
            <h3>Buscar País</h3>
            <input type="text" onChange={(event) => utils.handleSearch(event, setSearch)} />
        </div>
    )
}

export default SearchCountry