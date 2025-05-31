import React from 'react'

export default function Splash({setDidUserContinue}) {
    
    return (
    <div className='splashScreen'>
        <h1>Welcome!</h1> 
        <button onClick={() => {
            setDidUserContinue((prev) => !prev)
        }}>Continue</button>   
    </div>
  )
}
