import React from 'react'

const ApiCall = () => {
    const userData = localStorage.getItem('AToken');

    return (
        <>
            if (!userData) {
                window.location.href = "/"
            }
        </>
    )
}

export default ApiCall