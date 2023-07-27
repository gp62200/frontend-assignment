import React, { useState,useEffect } from 'react';
import axios from 'axios';

import { Audio } from  'react-loader-spinner'


function App() {
  const [symbol, setSymbol] = useState('');
  const [date, setDate] = useState();
  const [tradeData, setTradeData] = useState(null);
  const [error, setError] = useState(null);
  const [loader,setLoader] = useState(false)


  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setDate(getCurrentDate());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setTradeData(null);

    try {
		setLoader(true);
      const response = await axios.post('http://localhost:5000/api/fetchStockData', {
        symbol,
        date,
      });
      const data = response.data;
      if (data && data.results && data.results.length > 0) {
        setTradeData(data.results[0]);
      } else {
        setError('No data found for the provided stock and date.');
      }
	  setLoader(false)
    } catch (error) {
      setError('An error occurred while fetching data.');
	  setLoader(false)
    }
  };

  return (
    <div className="container">
      <h1>Stock Trade Statistics</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="symbol">Stock Symbol:</label>
        <input
          type="text"
          id="symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol"
          required
        />
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Get Trade Data</button>
      </form>
	  {
		loader && (
			<div className="loader">
			<Audio
    		height = "80"
    		width = "80"
    		radius = "9"
    		color = 'green'
    		ariaLabel = 'three-dots-loading'     
    		wrapperStyle
    		wrapperClass
  			/>
		</div>
		)
	  }
      {tradeData && (
        <div id="result">
          <p>Stock: {tradeData.T}</p>
          <p>Open: {tradeData.o}</p>
          <p>High: {tradeData.h}</p>
          <p>Low: {tradeData.l}</p>
          <p>Close: {tradeData.c}</p>
          <p>Volume: {tradeData.v}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
