/* eslint-disable class-methods-use-this */
import HeaderFilter from '../header';
import SearchResult from '../search-result';
import PaginationMovies from '../footer';
import ApiDate from '../../downloadService';
import { Provider } from '../context/context';

import { Result } from 'antd';
import React from 'react';

import 'antd/dist/antd.min.css';
import './app.css';

export default class App extends React.Component {
  apidate = new ApiDate();

  state = {
    errorDate: false,
    pegeNum: 1,
    searchPageDisplay: true,
  };

  componentDidMount() {
    this.sessionСreationUp();
  }

  componentDidCatch() {
    this.setState({ errorDate: true });
  }

  paginationList = (id) => {
    this.setState({ pegeNum: id });
  };

  sessionСreationUp = () => {
    localStorage.clear();
    this.apidate.sessionСreation().then((el) => {
      this.setState({ sesionKey: el.guest_session_id });
    });
  };

  filterMovie = (id) => {
    this.setState({
      searchPageDisplay: id,
      pegeNum: 1,
    });
  };

  render() {
    const { pegeNum, errorDate, sesionKey, searchPageDisplay } = this.state;
    if (errorDate) {
      return (
        <div className="error-load">
          <Result status="warning" title="Произошла непредвиденная ошибка!" />
        </div>
      );
    }

    return (
      <div className="movie-body">
        <Provider value={this.apidate}>
          <HeaderFilter filterMovie={this.filterMovie} />
          <SearchResult pegeNum={pegeNum} sesionKey={sesionKey} searchPageDisplay={searchPageDisplay} />
          <PaginationMovies paginationList={this.paginationList} pegeNum={pegeNum} />
        </Provider>
      </div>
    );
  }
}
