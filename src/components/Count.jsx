import React from 'react'

function Count({ count }) {
//  Count component to display notes count
  return (
    <div className='count'>
        <h4>{count}</h4>
    </div>
  )
}

export default Count