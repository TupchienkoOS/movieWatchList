import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const initialState = {isLoading:false, results:[], value:''}

export default class SearchComponent extends Component {

    constructor (props){
        super(props)
        this.state = initialState
    }
    
    handleSearchChange = (e, {value}) => {        
        this.setState({isLoading: true, value})
        console.log(value)
        
    }

    handleResultSelect = (e,{results}) => {
        console.log(results)
    }

    render() {

        const {isLoading, results, value}= this.state
        return (
            <div>
                <Search 
                 loading={null}
                 onResultSelect={this.props.handleResultSelect}
                 onSearchChange={_.debounce(this.handleSearchChange,500,{leading:true})}
                 value={value}
                 results={results}
                 {...this.props}
                />
            </div>
        )
    }
}

