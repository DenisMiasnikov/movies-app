import React, { Component } from 'react';

import './searchInput.css';

function SearchInput(props) {
  const { onQueryChange, inputValue } = props;
  return <input className="search-input" value={inputValue} placeholder="Type to search..." onChange={onQueryChange} />;
}

export default SearchInput;
