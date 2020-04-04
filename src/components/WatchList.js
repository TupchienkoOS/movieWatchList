import React from 'react'

const WillWatchList = props => {
    return (<div> <h3>Will Watch: {props.watchList.length}</h3>
        {props.watchList.map((movie, index) => {
            return (
                <div key={movie.id}>
                    <ul className="list-group" >
                        <li className="list-group-item">{index + 1}. {movie.title}</li>
                    </ul>
                </div>
            )
        })}</div>)}

export default WillWatchList;
