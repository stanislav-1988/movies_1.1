/* eslint-disable no-const-assign */
import React from 'react';

import './film-genre.css';

function FilmGenre({ genre }) {
  const item = genre.map((el) => {
    return (
      <div key={el} className="genre-content">
        <span className="genre-card">{el}</span>
      </div>
    );
  });
  return <div className="film-genre">{item}</div>;
}

export default FilmGenre;
