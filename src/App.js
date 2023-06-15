import {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadMovies()
  }, []) // that empty array at the end means it should only run once on startup. This is in fact a lie, it actually runs twice due to "react things"

  const loadMovies = () => {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmZiYzdmM2YzMTNiZDM5NTkwMmFmNDY0ZWY0NzI2MiIsInN1YiI6IjRmZWRmZDAyNzYwZWUzNjBhODAwMDNiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AT_RzLoLZM1RG3jPuNQSWjbGGHdKO8B_LsH7sq6VO48'

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    };

    fetch(url, options) // first go to the page and wait
      .then(res => res.json()) // then get the result and return the json
      .then(json => setMovies(json.results)) // push movies into the state (results holds the movies)
      .catch(err => console.error('error:' + err)); // oh noes!
  }

  return (
    <div className="App">
      <ul>
        {movies.map(movie => {
          return <li>{movie.title}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
