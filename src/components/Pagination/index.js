import React from 'react';

//assets
import arrowLeftIcon from "../../assets/ArrowLeftIcon.svg";
import previousIcon from "../../assets/PreviousIcon.svg";
import nextIcon from "../../assets/NextIcon.svg";
import arrowRightIcon from "../../assets/ArrowRightIcon.svg";

const Pagination = ({
    currentPage,
    totalPages,
    startRow,
    endRow,
    totalItems,
    rowsPerPage,
    handleFirstPage,
    handlePreviousPage,
    handleNextPage,
    handleLastPage,
    handleRowsPerPageChange,
}) => {
    return (
        <>
            <div className="rows-per-page">
                <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="rows-per-page-option">
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
            </div>

            <div className="row-range">
                <span className="row-range-text">
                    {startRow}-{endRow} of {totalItems}
                </span>
            </div>

            <div className="pagination-controls">
                <img src={arrowLeftIcon} onClick={handleFirstPage} alt="arrow-left-icon" />
                <img src={previousIcon} onClick={handlePreviousPage} alt="previous-icon" />
                <img src={nextIcon} onClick={handleNextPage} alt="next-icon" />
                <img src={arrowRightIcon} onClick={handleLastPage} alt="arrow-right-icon" />
            </div>
        </>
    )
}

export default Pagination