import React from 'react';
import SearchBar from './SearchBar.jsx';
import './Nav.css';

export default function Nav({onSearch}) { 
  return (
    <div className='container'>
     {/*  <h1>My weather app</h1> */}
      <SearchBar onSearch={onSearch}/>
    </div>
  );
};


