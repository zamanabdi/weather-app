import React, { useRef } from 'react';
import "./search.css";

const Search = ({searchWeather}) => {
  const inputref = useRef();

  

  return (
    <div className='search-container'>
      <input ref={inputref} type='text' placeholder='Enter City Name' />
      <button onClick={() => searchWeather(inputref.current.value || "lucknow")}>Search</button>
    </div>
  )
}

export default Search
