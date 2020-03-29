import React from 'react'
import {Button} from 'semantic-ui-react'

const PaginationTabs = (props) => {
    return(
    <div>
        <Button onClick={() => { props.onChangeCurrentPage (props.currentPage - 1)  }} type="button" icon={{ name: 'left arrow' }} size='mini' disabled={props.currentPage === 1 ? true : false} />
        <Button size='mini' content={props.currentPage} disabled={true} />...
        <Button onClick={() => { props.onChangeCurrentPage( props.totalPage) }} content={props.totalPage} size='mini' />
        <Button onClick={() => {props.onChangeCurrentPage (props.currentPage + 1) }} type="button" size='mini' disabled={props.currentPage === props.totalPage ? true : false} icon={{ name: 'right arrow' }} />
    </div>)
}
export default PaginationTabs;