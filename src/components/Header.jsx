import React from 'react'
import keep_logo from '../assets/logo/keep_logo3.svg'

function Header() {
    const logo = <img src={keep_logo} style={{width: "40px", height: "40px"}} alt='logo' />

    // Header component
    return (
        <div className='header'>
            {logo}
            <h3>Keep</h3>
        </div>
    )
}

export default Header