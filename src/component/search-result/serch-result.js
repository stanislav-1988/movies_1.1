/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-rest-params */
import Render from '../render-search';
import ApiDate from '../../downloadService';
import { Alert } from 'antd';
import React from 'react';
import './search-result.css';

export default class SearchResult extends React.Component {
  apidate = new ApiDate();

  state = {
    nameSearch: 'return',
    moviesArr: [],
    genre: {
      28: 'Action',
      12: 'Adventure',
      16: 'Animation',
      35: 'Comedy',
      80: 'Crime',
      99: 'Documentary',
      18: 'Drama',
      10751: 'Family',
      14: 'Fantasy',
      36: 'History',
      27: 'Horror',
      10402: 'Music',
      9648: 'Mystery',
      10749: 'Romance',
      878: 'Science Fiction',
      10770: 'TV Movie',
      53: 'Thriller',
      10752: 'War',
      37: 'Western',
    },
    spinerLoading: true,
    errorLoading: false,
    contentError: null,
  };

  componentDidMount() {
    const { pegeNum } = this.props;
    const { nameSearch } = this.state;
    this.resultDisplay(nameSearch, pegeNum);
  }

  componentDidUpdate(prevProps) {
    const { pegeNum, sesionKey, searchPageDisplay } = this.props;
    const { nameSearch } = this.state;
    if (searchPageDisplay !== prevProps.searchPageDisplay) {
      if (searchPageDisplay) {
        this.setState({ spinerLoading: true });
        this.resultDisplay(nameSearch, pegeNum);
      } else {
        this.setState({ spinerLoading: true });
        this.resultRateDisplay(sesionKey, pegeNum);
      }
    }
    if (pegeNum !== prevProps.pegeNum) {
      if (searchPageDisplay) {
        this.setState({ spinerLoading: true });
        this.resultDisplay(nameSearch, pegeNum);
      } else {
        this.setState({ spinerLoading: true });
        this.resultRateDisplay(sesionKey, pegeNum);
      }
    }
  }

  onResize = (e) => {
    this.setState({ nameSearch: e.target.value, spinerLoading: true, errorLoading: false });
    this.resultDisplay(e.target.value, 1);
  };

  debauns = (fn) => {
    let taim;
    // eslint-disable-next-line func-names
    return function () {
      const func = () => {
        fn.apply(this, arguments);
      };
      clearTimeout(taim);
      taim = setTimeout(func, 1000);
    };
  };

  resultRateDisplay = (idSes, pege) => {
    this.apidate
      .getRateMovie(idSes, pege)
      .then((element) => {
        const arr = element.results;
        const newArr = arr.map((el) => {
          const arrGenre = [...el.genre_ids];
          const convertedGenreArr = arrGenre.map((num) => {
            // eslint-disable-next-line react/destructuring-assignment
            return this.state.genre[num];
          });
          return {
            url: `https://image.tmdb.org/t/p/original${el.poster_path}`,
            title: el.title,
            releaseDate: el.release_date,
            genre: convertedGenreArr,
            key: el.id,
            synopsis: el.overview,
            rate: el.vote_average.toFixed(1),
          };
        });
        return this.setState({
          moviesArr: newArr,
          spinerLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          spinerLoading: false,
          errorLoading: true,
          contentError: (
            <Alert
              message="Не удалось получить данные!!!"
              description="пожалуйста проверьте соединение с интернетом!"
              type="error"
            />
          ),
        });
      });
  };

  resultDisplay(str, page) {
    this.apidate
      .searchMovies(str, page)
      .then((element) => {
        const arr = element.results;
        const newArr = arr.map((el) => {
          const arrGenre = [...el.genre_ids];
          const convertedGenreArr = arrGenre.map((num) => {
            // eslint-disable-next-line react/destructuring-assignment
            return this.state.genre[num];
          });

          return {
            url: `https://image.tmdb.org/t/p/original${el.poster_path}`,
            title: el.title,
            releaseDate: el.release_date,
            genre: convertedGenreArr,
            key: el.id,
            synopsis: el.overview,
            rate: el.vote_average,
          };
        });
        return this.setState({
          moviesArr: newArr,
          spinerLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          spinerLoading: false,
          errorLoading: true,
          contentError: (
            <Alert
              message="Не удалось получить данные!!!"
              description="пожалуйста проверьте соединение с интернетом!"
              type="error"
            />
          ),
        });
      });
  }

  render() {
    const { sesionKey, searchPageDisplay } = this.props;
    const { contentError, newListMovie, moviesArr, spinerLoading, errorLoading } = this.state;
    return (
      <Render
        searchPageDisplay={searchPageDisplay}
        sesionKey={sesionKey}
        newListMovie={newListMovie}
        moviesArr={moviesArr}
        spinerLoading={spinerLoading}
        errorLoading={errorLoading}
        debauns={this.debauns}
        onResize={this.onResize}
        contentError={contentError}
      />
    );
  }
}
