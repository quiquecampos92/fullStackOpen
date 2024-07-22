import React from 'react'

function SuccessMessage({ message }) {

    if (message === null) {
        return null
    }
    return (
        <div className='succesMessage'>
            <h1>{message}</h1>
        </div>
    )
}

export default SuccessMessage