import ApiDate from '../../downloadService';
import FilmGenre from '../film-genre';
import { format } from 'date-fns';
import { Rate, Progress } from 'antd';
import React from 'react';

import './search-result-list.css';

function SearchResultList({ rate, synopsis, genre, id, releaseDate, title, sesionKey }) {
  const apidate = new ApiDate();
  let date;

  try {
    date = format(new Date(releaseDate), 'MMMM d, yyyy');
  } catch (er) {
    // eslint-disable-next-line no-unused-expressions
    er;
  }

  const postКeview = (idMov, idSes, stars) => {
    apidate.rateMovie(idMov, idSes, stars).then();
  };

  const rateMovie = (cur) => {
    localStorage.setItem(id, cur);
    postКeview(id, sesionKey, cur);
  };

  const stars = localStorage.getItem(id) ? localStorage.getItem(id) : 0;

  const circleСolor =
    // eslint-disable-next-line no-nested-ternary
    rate < 3 ? '#E90000' : rate > 3 && rate < 5 ? '#E97E00' : rate > 5 && rate < 7 ? '#E9D100' : '#66E900';
  return (
    <div className="movies-info">
      <div className="header-card">
        <h5>{title}</h5>
        <div className="progress">
          <Progress type="circle" percent={99.9} strokeColor={circleСolor} width={40} format={() => `${rate}`} />
        </div>
      </div>
      <span className="relase-date">{date}</span>
      <div>
        <FilmGenre genre={genre} />
      </div>
      <p id={id} className="short-description">
        {synopsis}
      </p>
      <Rate onChange={rateMovie} className="rate" count={10} defaultValue={stars} />
    </div>
  );
}

export default SearchResultList;
