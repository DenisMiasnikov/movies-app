import { renderCloseIcon } from 'antd/es/modal/PurePanel';
import React, { Component } from 'react';

import './searchInput.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class SearchInput extends Component {
  // constructor() {
  //   super();
  //   this.onChange = (e) => {
  //     const query = e.target.value;
  //     const { onQueryChange } = this.props;
  //     onQueryChange(query);
  //   };
  // }

  render() {
    const { onQueryChange, inputValue } = this.props;
    // console.log(newQuery);
    return (
      // <input
      //   className="search-input"
      //   type="text"
      //   name=""
      //   // value={query}
      //   placeholder="Type to search..."
      //   onChange={(e) => onQueryChange(e)}
      // />
      <input
        className="search-input"
        // type="text"
        // name=""
        value={inputValue}
        placeholder="Type to search..."
        onChange={onQueryChange}
      />
    );
  }
}
