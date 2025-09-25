import React, { useState } from 'react';

function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    try {
      const response = await fetch('https://api.mathjs.org/v4/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expr: expression }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
        setResult(null);
      } else {
        setResult(data.result);
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch result');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="Enter math expression (e.g., 2 + 3 * sin(pi))"
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result && <p>Result: {result}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default Calculator;