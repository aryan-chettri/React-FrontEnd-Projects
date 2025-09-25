import React, { useState } from 'react'

function HandleApi() {
 
    const [error, setError] = useState("");

    const handleCalculate = async() => {

        const promise = await fetch('https://api.mathjs.org/v4/')
    }

  return (
    <div>
        <button onClick={()=>{handleCalculate()}}>
            Click Me
        </button>      
    </div>
  )
}

export default HandleApi
