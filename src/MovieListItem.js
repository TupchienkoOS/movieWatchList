import React from 'react'

const MovieListItem = props => {return( <li className="list-group-item">{props.index+1}. {props.movie.title}</li>)}

export default MovieListItem
