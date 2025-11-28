import React from 'react'
import { useState, useEffect } from 'react'

function Services() {

  const [quote, setQuote] = useState('');

  const [author, setAuthor] = useState('');

  function handleRefresh(){

    useEffect(()=>{

      handleApi();
    },[]);
  }
  

  async function handleApi(){

    try {

      const response = await fetch('https://dummyjson.com/quotes/random');
      const data = await response.json();

      console.log(response.body);
      console.log(data.quote);
      console.log(data.author);


      setQuote(data.quote);
      setAuthor(data.author);
      
    } catch (error) {
      
      console.log(error);
    }
  }
  

  useEffect(() => {
    let ignore = false;

    async function getInitialQuote() {
      try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();

        if (!ignore) {
          setQuote(data.quote);
          setAuthor(data.author);
        }
      } catch (error) {
        if (!ignore) {
          console.log(error);
          setQuote('Failed to fetch a quote. Please try again.');
        }
      }
    }

    getInitialQuote();

    // Cleanup function to "ignore" the result of the first call in Strict Mode
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      <h1>Services Page</h1>
      <h3>{quote}</h3>
      <h5>{author}</h5>
      <button onClick={handleApi}>Refresh</button>
    </div>
  )
}

export default Services
