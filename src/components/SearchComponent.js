import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const initialState = { isLoading: false, results: [], value: '' }

export default class SearchComponent extends Component {

    constructor(props) {
        super(props)
        this.state = initialState
    }

    componentDidUpdate(prevProps,prevState){
        if (this.state.value.length<1 && prevState !== this.state) {
            this.props.onSearchHandle();
        }
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })
        debugger;
        setTimeout(() => {
            if (this.state.value.length < 1) { return this.setState(initialState) }
            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.title)
            const source = this.props.moviesdata.map(movie => ({ title: movie.title, id: movie.id }))
            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 300)
    }

    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title })
        this.props.onSearchHandle(result.id);
    }

    render() {
        const { isLoading, results, value } = this.state
        return (
            <div>
                <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                    value={value}
                    results={results}
                />
            </div>
        )
    }
}

