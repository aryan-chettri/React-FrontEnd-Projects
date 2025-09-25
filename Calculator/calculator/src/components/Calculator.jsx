import React, { useRef } from "react";
import { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");

  const inputRef = useRef(null);

  const expression = (e) => {
    setInput(e.target.value);
  };

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

  const handleBackspace = () =>{

    const cursorPosition = inputRef.current.selectionStart;

    const newValue = input.slice(0, cursorPosition-1) + input.slice(cursorPosition);

    setInput(newValue);
    

    setTimeout(() => {

        inputRef.current.selectionStart = cursorPosition -1;
      inputRef.current.selectionEnd = cursorPosition -1;
      
    }, 0);

    

  };

  return (
    <div className=" space-y-4">
      <input
        ref={inputRef}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-700 bg-white placeholder-gray-400 shadow-sm"
        type="text"
        placeholder="Enter the Expression"
        value={input}
        onChange={expression}
      />

      <div className="flex space-x-3">
        <button
          className="px-3 py-3 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 shadow-sm"
          onClick={() => {
            handleButtonClick("1");
          }}
        >
          1
        </button>

        <button
          className="px-3 py-3 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 shadow-sm"
          onClick //somefunction
        >
          =
        </button>

        <button
          className="px-3 py-3 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 shadow-sm"
          onClick = {()=>{setInput("")}}
        >
          CLR
        </button>

        <button
          className="px-3 py-3 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 shadow-sm"
          onClick = {()=>{handleBackspace()}}
        >
          ⌫
        </button>
      </div>

      <h1>{input}</h1>
    </div>
  );
}

export default Calculator;
