import React from 'react';
import './App.css';
import { moviesData } from './MoviesData.js'
import 'bootstrap/dist/css/bootstrap.css';
import MovieItem from './MovieItem.js';
import MovieListItem from './MovieListItem.js'
import { API } from './Api.js'
import DropdownSortBtn from './DropdownSortBtn.js';
import { classNames } from 'classnames';
import PaginationTabs from './PaginationTabs.js';

class Movie extends React.Component {

  constructor() {
    console.log('ctor App')
    super();
    this.state = ({
      show: false, like: false, moviesData: [],
      watchList: [], sortMovies: "&sort_by=popularity.desc",
      isFetched: true, currentPage: 1, totalPage: 0
    })
  }

  deleteHandle = movie => {
    this.setState({ moviesData: this.state.moviesData.filter(function (item) { return item.id !== movie.id }) })
    this.deleteFromWatchList(movie)
  }

  addToWatchList = movie => {
    this.setState({ watchList: [...this.state.watchList, movie] })
  }

  deleteFromWatchList = movie => {
    this.setState({ watchList: this.state.watchList.filter(function (item) { return item.id !== movie.id }) })
  }

  fetchData() {
    this.setState({ isFetched: false })
    fetch(`${API.apiUrl}/discover/movie?api_key=${API.apiKey}${this.state.sortMovies}&page=${this.state.currentPage}`)
      .then(response => { return response.json() })
      .then(data => { console.log(data); this.setState({ moviesData: data.results, isFetched: true, totalPage: data.total_pages }) })
  }

  componentDidMount() {
    this.fetchData();
    console.log('didMount App')
  }

  componentDidUpdate(prevProps, prevState) {
    debugger;
    if (prevState.sortMovies !== this.state.sortMovies || prevState.currentPage !== this.state.currentPage) {
      this.fetchData();
      console.log('didUpdate App')
    }

  }

  onChangeSortHandler = value => {
    this.setState({ sortMovies: value, currentPage: 1 })
  }

  onChangeCurrentPage = (pageNumber) =>{
    this.setState({currentPage: pageNumber})
  }

  render() {
    console.log('render App')
    return (
      <div className="container">
        <div className="row">
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
              {this.state.moviesData.map((movie) => {
                return (
                  <div className="col-4 mb-2 mt-2" key={movie.id}>
                    <MovieItem key={movie.id} movies={movie} deleteHandle={this.deleteHandle} addToWatchList={this.addToWatchList} deleteFromWatchList={this.deleteFromWatchList} state={this.state} />
                  </div>
                )
              })}
            </div>
          </div>
          <div className="col-3 " >
            <div className="App-Sticky">
              <h3>Will Watch1: {this.state.watchList.length}</h3>
              {this.state.watchList.map((movie, index) => {
                return (
                  <div key={movie.id}>
                    <ul className="list-group" >
                      <MovieListItem movie={movie} key={movie.id} index={index} />
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 m-2 " >
           <PaginationTabs currentPage={this.state.currentPage} totalPage={this.state.totalPage} onChangeCurrentPage={this.onChangeCurrentPage}/>
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
