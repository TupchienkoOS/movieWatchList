import React from 'react';
import { Button } from 'semantic-ui-react';
import './MovieItem.css';


function Img(props) { return <img src={props.src} alt={props.alt} className={"MovieItem-img"} /> }

class MovieItem extends React.Component {
    constructor(props) {
        console.log('ctor movieItem')
        super(props);
        this.state = ({
            like: false, showOverview: false,
            addedToWatchList: this.props.watchList.some(item => item.id === this.props.key)
        })
    }

    getImgSrc = () => {
        debugger;
        return this.props.movie.poster_path == null ? 'https://ih0.redbubble.net/image.523773899.2261/flat,550x550,075,f.u4.jpg' : `https://image.tmdb.org/t/p/w500${this.props.movie.poster_path}`
    }

    showHideOverwiev = () => {
        this.setState({ showOverview: !this.state.showOverview })
    }

    componentDidMount() { console.log('didMount movieItem') }

    componentDidUpdate() { console.log('didUpdate movieItem') }

    likeHandle = () => {
        this.setState({ like: !this.state.like })
    }

    addInTheWhatchList = () => {
        const { addToWatchList, deleteFromWatchList } = this.props;
        if (this.state.addedToWatchList === true) {
            deleteFromWatchList(this.props.movie)
            this.setState({ addedToWatchList: false })
        } else {
            addToWatchList(this.props.movie)
            this.setState({ addedToWatchList: true })
        }
    }
    render() {
        console.log('render MovItem')
        const { movie: { title, vote_average, overview, poster_path } } = this.props;
        return (
            <div className={"MovieItem"} >
                <div className="d-inline-block w-75 " style={{ height: "60px" }}>
                    <h2 style={{ padding: "10px", fontSize: "95%" }}>{title}</h2>
                </div>
                <div className="d-inline-block float-right m-2">
                    <Button onClick={this.addInTheWhatchList} icon={{ name: this.state.addedToWatchList ? "checkmark" : "add", color: this.state.addedToWatchList ? "green" : null, title: "add to watch list" }} />
                </div>
                <div className="pt-1">
                    <h5 align="center"  >IMDB: {vote_average}</h5>
                </div>
                <div >
                    <Img src={this.getImgSrc()} alt={title} />
                </div>
                <div className="btn-group btn-group d-flex justify-content-center mt-3">
                    <Button onClick={this.showHideOverwiev} icon={{ name: "info" }} className="btn btn-secondary m-2" />
                    <Button content="Like" icon={{ color: this.state.like ? "red" : null, name: 'like' }} className="btn btn-secondary m-2" onClick={this.likeHandle} />
                    <Button icon={{ name: 'delete' }} onClick={this.props.deleteHandle(this.props.movie)} className="btn btn-secondary m-2" />
                </div>
                <div style={{ padding: "7px" }}>
                    {this.state.showOverview ? <p>{overview}</p> : null}
                </div>
            </div>
        )
    }
};
export default MovieItem;
