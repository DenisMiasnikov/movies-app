import React from 'react';

import './header.css';
import SearchInput from '../searchInput';

function Header(props) {
  const { onQueryChange, inputValue } = props;
  return (
    <header className="header">
      <SearchInput onQueryChange={onQueryChange} inputValue={inputValue} />
    </header>
  );
}

export default Header;
