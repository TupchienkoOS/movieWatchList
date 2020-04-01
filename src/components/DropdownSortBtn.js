import React from 'react'
import { Dropdown } from '../../node_modules/semantic-ui-react'

const dropdownList = [{ key: "Popularity desc", text: "Popularity desc", value: "&sort_by=popularity.desc" },
                    { key: "Popularity asc", text: "Popularity asc", value: "&sort_by=popularity.asc" },
                    { key: "Release desc", text: "Release desc", value: "&sort_by=release_date.desc" },
                    { key: "Revenue desc", text: "Revenue desc", value: "&sort_by=revenue.desc" }]



const DropdownSortBtn = (props) => {

    return (
        <Dropdown
            button           
            className='icon'
            placeholder="Select sort"
            fluid
            labeled
            disabled={!props.isFetched}
            icon='filter'
            options={dropdownList}            
            onChange={(e, data) => props.onChangeSortHandler(data.value)} />)
}
export default DropdownSortBtn;