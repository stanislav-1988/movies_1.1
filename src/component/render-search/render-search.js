import SearchResultList from '../search-result-list';
import SpinerLoading from '../spiner loading';

export default function Render({
  searchPageDisplay,
  contentError,
  moviesArr,
  spinerLoading,
  errorLoading,
  debauns,
  onResize,
  sesionKey,
}) {
  const item = moviesArr.map((el) => {
    const { rate, url, key, synopsis, genre, releaseDate, title } = el;
    return (
      <div key={key} className="movieCard">
        <img className="movieImg" alt="#" src={url} />
        <SearchResultList
          sesionKey={sesionKey}
          rate={rate}
          id={key}
          synopsis={synopsis}
          genre={genre}
          releaseDate={releaseDate}
          title={title}
        />
      </div>
    );
  });

  if (errorLoading) {
    return (
      <div className="movies-body">
        <div className="input-search">
          <input onChange={debauns(onResize)} placeholder="Type to search..." />
        </div>
        <div className="moviesContent">
          <div className="error-load">{contentError}</div>
        </div>
      </div>
    );
  }

  if (spinerLoading) {
    return (
      <div className="movies-body">
        <div className="moviesContent">
          <SpinerLoading />
        </div>
      </div>
    );
  }

  const classInput = searchPageDisplay ? '' : 'display-none';
  return (
    <div className="movies-body">
      <div className="input-search">
        <input className={classInput} onChange={debauns(onResize)} placeholder="Type to search..." />
      </div>
      <div className="moviesContent">{item}</div>
    </div>
  );
}
