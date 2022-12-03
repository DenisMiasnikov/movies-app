import React, { Component } from 'react';

import './moviesList.css';
import MovieCard from '../movieCard';

export default class Header extends Component {
  render() {
    const { data } = this.props;

    this.elements = data.map((item) => {
      const { ...itemProps } = item;

      return <MovieCard {...itemProps} key={item.id} />;
    });

    return (
      <section className="main">
        <ul className="movies-list">{this.elements}</ul>
      </section>
    );
  }
}
