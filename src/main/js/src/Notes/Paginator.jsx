import React from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '@/Notes/Paginator.css';

const Paginator = (props) => {

    const handlePageClick = (data) => {
        props.setActivePage(data.selected);
    }


    return (
        <ReactPaginate
            containerClassName={'pagination justify-content-end mr-3 mt-3'}
            previousLabel={<FontAwesomeIcon icon="chevron-left" />}
            nextLabel={<FontAwesomeIcon icon="chevron-right" />}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={props.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            nextClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
        />
    )
}

export { Paginator };