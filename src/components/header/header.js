import React from 'react';

import './header.css';
import SearchInput from '../searchInput';
import SearchFilter from '../searchFilter';

function Header(props) {
  const { onQueryChange, inputValue } = props;
  return (
    <header className="header">
      <SearchFilter />
      <SearchInput onQueryChange={onQueryChange} inputValue={inputValue} />
    </header>
  );
}

export default Header;
