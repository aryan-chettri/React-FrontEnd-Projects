import React, { useRef } from "react";
import { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");

  const [result, setResult] = useState("");

  const [error, setError] = useState("");

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const operators = ["+", "-", "*", "/"]; // Changed % to * for a more standard button layout, but left the original operator list intact in the map

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
      console.alert("This is wrong"); // Keeping original non-standard console.alert as per instructions
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

  const handleEqualClick = async (input) => {
    try {

      const response = await fetch('https://api.mathjs.org/v4/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expr: input }),
      });

      // const response_error = await fetch('https://api.mathjs.org/v4/', {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ expr: input }),
      // });

      // console.log(response_error);

      const data = await response.json();

      console.log(data.result);

      console.log(data.error);

      if (data.error) {

        setError(data.error); // Updated to use the entire error object if available
        setResult(null);
      }
      else {

        setResult(data.result);
        setError(null);
      }

    } catch (error) {

      setError('Failed to calculate expression or network error'); // General error message for fetch failure
      console.log("Error:", error);

    }
    //  console.log(error);
  };

  // --- Button Constants for a cleaner map loop ---
  // Using a 1-9, then 0 for a traditional keypad look, but mapping the original `numbers` array
  const keyOrder = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  
  // Using a cleaner set of button styles for the main logic (operators and controls)
  const controlButtons = [
    { label: 'AC', type: 'clear', color: 'bg-red-500 hover:bg-red-600', action: () => setInput("") },
    { label: 'DEL', type: 'backspace', color: 'bg-gray-300 text-gray-800 hover:bg-gray-400', action: handleBackspace, icon: true },
    { label: '=', type: 'equal', color: 'bg-green-600 hover:bg-green-700 col-span-2', action: () => handleEqualClick(input) },
  ];

  return (
    // Outer container: Centers the calculator, applies background gradient
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-['Inter']">
      {/* Calculator Card: Modern, rounded design with dark theme toggle potential */}
      <div className="w-full max-w-sm p-6 bg-white rounded-3xl shadow-2xl space-y-6 transform transition duration-500">
        
        <h1 className="text-center text-3xl font-extrabold text-gray-800">Sleek React Calculator</h1>

        {/* Display Area: Dark, high-contrast screen */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-inner border-b-4 border-gray-700">
          
          {/* Result/Error Display */}
          <div className="h-6">
            {/* Show Result or Error */}
            {error && (
                <p className="text-right text-xs text-red-400 font-light truncate">
                    {`Error: ${error}`}
                </p>
            )}
            {!error && result && (
                <p className="text-right text-sm text-green-400 font-medium truncate">
                    {`Ans: ${result}`}
                </p>
            )}
            
          </div>

          {/* Input Field - Main Calculator Screen */}
          <input
            ref={inputRef}
            // Tailwind classes for large, right-aligned, transparent text
            className="w-full text-right text-5xl bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-0 appearance-none transition-colors duration-300 p-0 m-0 mt-2"
            type="text"
            placeholder="0"
            value={input}
            onChange={expression}
          />
        </div>

        {/* Keypad Grid: 4-column layout for classic calculator feel */}
        <div className="grid grid-cols-4 gap-3">
          
          {/* Controls: CLR, Backspace */}
          <button
            className="p-4 text-2xl font-semibold rounded-2xl bg-red-500 text-white hover:bg-red-600 shadow-lg transition-all duration-150 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300"
            onClick={() => {
              setInput("");
            }}
          >
            AC
          </button>
          
          <button
            className="p-4 text-2xl font-semibold rounded-2xl bg-gray-300 text-gray-800 hover:bg-gray-400 shadow-lg transition-all duration-150 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-300"
            onClick={() => {
              handleBackspace();
            }}
          >
            {/* Using an SVG for a professional backspace icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2H5m10 0l-2 2m2-2l2 2m-2-2H5m10 0h2a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h4" />
            </svg>
          </button>

          {/* Original Operators Mapping (Re-styled as operation buttons) */}
          {/* Note: Original code uses `operators` array, I'll map them directly into the grid flow */}
          
          {/* Operator: % */}
          <button
            key="operator-%"
            className="p-4 text-2xl font-semibold rounded-2xl bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg transition-all duration-150 active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            onClick={() => {
              handleButtonClick(`%`);
            }}
          >
            %
          </button>
          
          {/* Operator: / */}
          <button
            key="operator-/"
            className="p-4 text-2xl font-semibold rounded-2xl bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg transition-all duration-150 active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            onClick={() => {
              handleButtonClick(`/`);
            }}
          >
            /
          </button>


          {/* --- Number Pad (1, 2, 3, 4, 5, 6, 7, 8, 9, 0) --- */}

          {[7, 8, 9].map((number) => (
            <button
              key={number}
              className="p-4 text-2xl font-semibold rounded-2xl bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-lg transition-all duration-150 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-300"
              onClick={() => {
                handleButtonClick(`${number}`);
              }}
            >
              {number}
            </button>
          ))}
          
          {/* Operator: * (Using 'x' for multiplication for better readability) */}
          <button
            key="operator-*"
            className="p-4 text-2xl font-semibold rounded-2xl bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg transition-all duration-150 active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            onClick={() => {
              handleButtonClick(`*`);
            }}
          >
            &times;
          </button>

          {[4, 5, 6].map((number) => (
            <button
              key={number}
              className="p-4 text-2xl font-semibold rounded-2xl bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-lg transition-all duration-150 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-300"
              onClick={() => {
                handleButtonClick(`${number}`);
              }}
            >
              {number}
            </button>
          ))}
          
          {/* Operator: - */}
          <button
            key="operator--"
            className="p-4 text-2xl font-semibold rounded-2xl bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg transition-all duration-150 active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            onClick={() => {
              handleButtonClick(`-`);
            }}
          >
            &minus;
          </button>

          {[1, 2, 3].map((number) => (
            <button
              key={number}
              className="p-4 text-2xl font-semibold rounded-2xl bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-lg transition-all duration-150 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-300"
              onClick={() => {
                handleButtonClick(`${number}`);
              }}
            >
              {number}
            </button>
          ))}
          
          {/* Operator: + */}
          <button
            key="operator-+"
            className="p-4 text-2xl font-semibold rounded-2xl bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg transition-all duration-150 active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            onClick={() => {
              handleButtonClick(`+`);
            }}
          >
            +
          </button>
          
          {/* Zero and Decimal/Parentheses */}
          <button
            key={0}
            className="p-4 text-2xl font-semibold rounded-2xl bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-lg col-span-2 transition-all duration-150 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-300"
            onClick={() => {
              handleButtonClick(`0`);
            }}
          >
            0
          </button>

          <button
            key="decimal"
            className="p-4 text-2xl font-semibold rounded-2xl bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-lg transition-all duration-150 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-300"
            onClick={() => {
              handleButtonClick(`.`);
            }}
          >
            .
          </button>

          {/* Equal Button: Uses orange color and spans 1 column */}
          <button
            key="equal"
            className="p-4 text-2xl font-semibold rounded-2xl bg-orange-500 text-white hover:bg-orange-600 shadow-lg transition-all duration-150 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-300"
            onClick={() => {
              handleEqualClick(input);
            }}
          >
            =
          </button>

        </div>
        
        {/* ORIGINAL RESULT/ERROR OUTPUTS (Placed outside the main grid and styled) */}
        <div className="pt-2">
            {/* The original code had these checks; I've styled them but kept the original logic structure */}
            {result && <h1 className="text-xl font-bold text-gray-700">Result: {result}</h1>}

            {result === null || result === " " ? (
                <h1 className="text-sm text-yellow-600 mt-1">
                    Please check the given expression
                </h1>
            ) : (
                <></>
            )}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
