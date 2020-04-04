import React from 'react'
import {Button} from '../../node_modules/semantic-ui-react'

const PaginationTabs = (props) => {
    const {currentPage,totalPages,onChangeCurrentPage}=props
    return(
    <div>
        <Button onClick={() => {onChangeCurrentPage (currentPage - 1)  }} type="button" icon={{ name: 'left arrow' }} size='mini' disabled={currentPage === 1 ? true : false} />
        <Button type="button" size='mini' content={currentPage } disabled={true} />...
        <Button onClick={() => {onChangeCurrentPage( totalPages) }} content={totalPages} size='mini' disabled={currentPage === totalPages?true:false}/>
        <Button onClick={() => {onChangeCurrentPage (currentPage + 1) }} type="button" size='mini' disabled={currentPage === totalPages ? true : false} icon={{ name: 'right arrow' }} />
    </div>)
}
export default PaginationTabs;