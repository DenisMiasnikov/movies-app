import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Tabs } from 'antd';

import './app.css';
import Search from '../search';
import Rated from '../rated';
import Error from '../error';
import MyContext from '../context/contex';
import MoviesService from '../../services/movies-services';

export default class App extends Component {
  constructor() {
    super();

    this.moviesService = new MoviesService();
    this.state = {
      genre: [],
    };
  }

  componentDidMount() {
    const id = JSON.parse(localStorage.getItem('guestId'));
    this.updateGenre();
    if (!id) {
      this.openSession();
    }
  }

  updateGenre() {
    this.moviesService.getGenre().then((res) => {
      this.setState({
        genre: res.genres,
      });
    });
  }

  openSession() {
    this.moviesService.getSession().then((res) => {
      const guestId = res.guest_session_id;
      localStorage.setItem('guestId', JSON.stringify(`${guestId}`));
    });
  }

  render() {
    const { genre } = this.state;
    return (
      <div className="moviesapp">
        <Offline>
          <Error data={{ errorName: 'Offline', errorMessage: 'You are Offline, please check your connection' }} />
        </Offline>
        <MyContext.Provider value={genre}>
          <Online>
            <Tabs
              destroyInactiveTabPane="true"
              defaultActiveKey="1"
              items={[
                {
                  label: 'Search',
                  key: '1',
                  children: <Search />,
                },
                {
                  label: 'Rated',
                  key: '2',
                  children: <Rated />,
                },
              ]}
            />
          </Online>
        </MyContext.Provider>
      </div>
    );
  }
}
