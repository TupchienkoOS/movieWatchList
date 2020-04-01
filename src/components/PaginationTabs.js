import React from 'react'
import {Button} from '../../node_modules/semantic-ui-react'

const PaginationTabs = (props) => {
    const {currentPage,totalPage,onChangeCurrentPage}=props
    return(
    <div>
        <Button onClick={() => {onChangeCurrentPage (currentPage - 1)  }} type="button" icon={{ name: 'left arrow' }} size='mini' disabled={currentPage === 1 ? true : false} />
        <Button type="button" size='mini' content={currentPage } disabled={true} />...
        <Button onClick={() => {onChangeCurrentPage( totalPage) }} content={totalPage} size='mini' disabled={currentPage === totalPage?true:false}/>
        <Button onClick={() => {onChangeCurrentPage (currentPage + 1) }} type="button" size='mini' disabled={currentPage === totalPage ? true : false} icon={{ name: 'right arrow' }} />
    </div>)
}
export default PaginationTabs;