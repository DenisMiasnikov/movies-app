import React, { Component } from 'react';

import './searchFilter.css';

export default class SearchFilter extends Component {
  constructor() {
    super();
    this.state = {
      search: 'selected',
      rated: '',
    };
    this.onSelect = (e) => {
      if (e.target.id === 'search') {
        this.setState({
          search: 'selected',
          rated: '',
        });
      } else if (e.target.id === 'rated') {
        this.setState({
          search: '',
          rated: 'selected',
        });
      }
    };
  }

  render() {
    const { search, rated } = this.state;
    return (
      <form className="search-filter">
        <input
          onClick={this.onSelect}
          className="hide"
          type="radio"
          id="search"
          value="search"
          name="filter"
          defaultChecked
        />
        <label className={search} htmlFor="search">
          Search
        </label>
        <input onClick={this.onSelect} className="hide" type="radio" id="rated" value="rated" name="filter" />
        <label className={rated} htmlFor="rated">
          Rated
        </label>
      </form>
    );
  }
}
