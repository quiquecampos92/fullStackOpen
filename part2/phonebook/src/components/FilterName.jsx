import React from 'react'

function FilterName({ handleFilter }) {
    return (
        <div>
            <p>Filter person:</p>
            <input type="text" onChange={handleFilter} />
        </div>
    )
}

export default FilterName