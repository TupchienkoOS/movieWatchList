import React from 'react';
import './App.css';
import { moviesData } from './utils/MoviesData.js'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import MovieItem from './components/MoviItem/MovieItem.js';
import WillWatchList from './components/WatchList.js'
import { API } from './utils/Api.js'
import DropdownSortBtn from './components/DropdownSortBtn.js';
import PaginationTabs from './components/PaginationTabs.js';
import SearchComponent from './components/SearchComponent.js'

class Movie extends React.Component {
  constructor() {
    console.log('ctor App')
    super();
    this.state = ({
      show: false, like: false, moviesData: [], moviesDataFiltered: [],
      willWatchList: [], sortMovies: "popularity.desc",
      isFetched: true, currentPage: 1, totalPages: 0
    })
  }

getMoviesArr = () => {return this.state.moviesDataFiltered.length === 0 ? this.state.moviesData : this.state.moviesDataFiltered}

  onSearchHandle = movieId => {
    this.setState({ moviesDataFiltered: this.state.moviesData.filter(movie => movie.id === movieId) })
  }

  deleteHandle = movie => {
    return () => {
      this.setState({ moviesData: this.state.moviesData.filter(item => item.id !== movie.id) })
      this.deleteFromWatchList(movie)
    }
  }

  addToWatchList = movie => {
    this.setState({ willWatchList: [...this.state.willWatchList, movie] })
  }

  deleteFromWatchList = movie => {
    this.setState({ willWatchList: this.state.willWatchList.filter(function (item) { return item.id !== movie.id }) })
  }

  fetchData() {
    this.setState({ isFetched: false })
    fetch(`${API.apiUrl}/discover/movie?api_key=${API.apiKey}&sort_by=${this.state.sortMovies}&page=${this.state.currentPage}`)
      .then(response => { return response.json() })
      .then(data => { console.log(data); this.setState({ moviesData: data.results, isFetched: true, totalPages: data.total_pages }) })
  }

  componentDidMount() {
    this.fetchData();
    console.log('didMount App')
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sortMovies !== this.state.sortMovies || prevState.currentPage !== this.state.currentPage) {
      this.fetchData();
      console.log('didUpdate App')
    }
  }

  onChangeSortHandler = value => {
    this.setState({ sortMovies: value, currentPage: 1 })
  }

  onChangeCurrentPage = (pageNumber) => {
    this.setState({ currentPage: pageNumber })
  }
  render() {
    console.log('render App')
    return (
      <div className="container">
        <div className="row">
          <div className="col-3 mt-2">
            <SearchComponent moviesdata={this.state.moviesData} onSearchHandle={this.onSearchHandle} />
          </div>
          <div className="col-3 mt-2">
            <DropdownSortBtn onChangeSortHandler={this.onChangeSortHandler} isFetched={this.state.isFetched} />
          </div>
          <div className="col-3">
            {this.state.isFetched ? "" : "Fetching..."}
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <div className="row">
              {(this.getMoviesArr()).map((movie) => {
                return (
                  <div className="col-4 mb-2 mt-2" key={movie.id}>
                    <MovieItem key={movie.id} movie={movie} deleteHandle={this.deleteHandle} addToWatchList={this.addToWatchList} deleteFromWatchList={this.deleteFromWatchList} willWatchList={this.state.willWatchList} />
                  </div>
                )
              })}
            </div>
          </div>
          <div className="col-3 " >
            <div className="App-Sticky">
              <WillWatchList watchList={this.state.willWatchList} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 m-2 " >
            <PaginationTabs currentPage={this.state.currentPage} totalPages={this.state.totalPages} onChangeCurrentPage={this.onChangeCurrentPage} />
          </div>
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <div>
      <Movie data={moviesData} />
    </div>
  );
}

export default App;