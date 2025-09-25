import React, { useState } from "react";

function Button() {

    const [input, setInput] = useState("");
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "+", "-", "/","%"];

  const handleButtonClick=(number)=>{

    setInput(prevInput => prevInput + number.toString());
  };
  return (
    <div>
    
        {numbers.map((number, index) => (
        <button
        key={index}
        onClick={()=>handleButtonClick(number)}
        >
            {number} 
        
        </button>

      ))}
      

      <input type="text" value={input}
      onChange={(e)=>setInput(e.target.value)}/>

      <h1>{input}</h1>
    </div>
  );
}

export default Button;
