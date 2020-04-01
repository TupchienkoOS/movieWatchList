import React from 'react'
import cx from 'classnames';
import './PaginationTabs1.css';

class PaginationTabs1 extends React.Component {
    render() {
        const { currentPage, totalPage, onChangeCurrentPage } = this.props

        const classBtnPrev = cx({ PaginationTabs1: true })
        const classNextPrev = cx({ PaginationTabs1: true })
        return (
            <div>
                <button onClick={() => { onChangeCurrentPage(currentPage - 1) }} type="button" className={classBtnPrev} >Prev</button>
                <button type="button" className={"PaginationTabs1--small"} disabled>{currentPage}</button>...
                <button onClick={() => { onChangeCurrentPage(totalPage) }} className={"PaginationTabs1--small"}>{totalPage}</button>
                <button onClick={() => { onChangeCurrentPage(currentPage + 1) }} type="button" className={classNextPrev} >Next</button>
            </div>)
    }
}
export default PaginationTabs1;