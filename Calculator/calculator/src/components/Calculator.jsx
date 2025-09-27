import React, { useRef } from "react";
import { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");

  const [result, setResult] = useState("");

  const [error, setError] = useState("");

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const operators = ["+", "-", "%", "/"];

  const inputRef = useRef(null);

  const expression = (e) => {
    setInput(e.target.value);
  };

  // ---> Handle Button Click

  const handleButtonClick = (value) => {
    const cursorPosition = inputRef.current.selectionStart;

    console.log(inputRef.current.selectionStart);

    const newValue =
      input.slice(0, cursorPosition) + value + input.slice(cursorPosition);

    setInput(newValue);

    setTimeout(() => {
      inputRef.current.selectionStart = cursorPosition + value.length;
      inputRef.current.selectionEnd = cursorPosition + value.length;
    }, 0);
  };

  // ---> Handle BackSpace

  const handleBackspace = () => {
    // console.log('Initial Cursor Position',cursorPosition);

    // e.preventDefault();

    let cursorPosition = inputRef.current.selectionStart;

    console.log("Final Cursor Position", cursorPosition);

    if (cursorPosition === 0) {
      console.alert("This is wrong");
    } else {
      setInput(
        input.slice(0, cursorPosition - 1) + input.slice(cursorPosition)
      );
    }

    setTimeout(() => {
      console.log("Cursor Postion", cursorPosition);

      inputRef.current.selectionStart = cursorPosition - 1;

      // console.log("Selection Start ",inputRef.current.selectionStart);
      inputRef.current.selectionEnd = cursorPosition - 1;

      // console.log("Selection End ",inputRef.current.selectionEnd);
    }, 0);
  };

  // ---> Handle Equal Click

  const handleEqualClick = async(input) =>{

     try {

      const response = await fetch('https://api.mathjs.org/v4/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expr: input }),
      });

      // const response_error = await fetch('https://api.mathjs.org/v4/', {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ expr: input }),
      // });

      // console.log(response_error);

      const data = await response.json();

      console.log(data.result);

      console.log(data.error);

      if(data.error){

        setError(data.error.message);
        setResult(null);
      }
      else{

        setResult(data.result);
        setError(null);
      }
      
     } catch (error) {
      
      setError('Failed to fetch the error')
      console.log("Error:", error);
      
     }
    //  console.log(error);
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-700 bg-white placeholder-gray-400 shadow-sm"
        type="text"
        placeholder="Enter the Expression"
        value={input}
        onChange={expression}
      />

      <div className="flex space-x-3">
        {/* <button
          className="px-3 py-3 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 shadow-sm"
          onClick={() => {
            handleButtonClick("1");
          }}
        >
          1
        </button> */}

        {numbers.map((number, index) => (
          <button
            key={index}
            className="px-3 py-3 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 shadow-sm"
            onClick={() => {
              handleButtonClick(`${number}`);
            }}
          >
            {number}
          </button>
        ))}

        {
          operators.map((operator, index)=>(
            <button 
            key={index}
            className="px-3 py-3 bg-violet-500 text-white text-sm font-medium rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 shadow-sm"
            onClick={()=>{
              handleButtonClick(`${operator}`)
            }}
            >
              {operator}
            </button>
          ))
        }

        <button
          className="px-3 py-3 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 shadow-sm"
          onClick={()=>{handleEqualClick(input)}}
        >
          =
        </button>

        <button
          className="px-3 py-3 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 shadow-sm"
          onClick={() => {
            setInput("");
          }}
        >
          CLR
        </button>

        <button
          className="px-3 py-3 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 shadow-sm"
          onClick={() => {
            handleBackspace();
          }}
        >
          ⌫
        </button>
      </div>

      {result && <h1>Result: {result}</h1>}

      {result === null || result ===" " ? (<h1>Please check the given expression</h1>):(<></>)}

      {/* {if(result === null){(<p>Please check the expression</p>)}} */}
    </div>
  );
}

export default Calculator;
