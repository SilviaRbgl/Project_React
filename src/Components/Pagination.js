import React, { useEffect, useState } from "react";
import { FaForward } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";

function Pagination({ data, RenderComponent, title, pageLimit, dataLimit }) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  //goToNextPage will increment the current page by calling setCurrentPage.
  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }
  //goToPreviousPage function will decrement the current page by calling setCurrentPage.
  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }
  //changePage function will be called when the user clicks on any page number.
  //it will change the current page to the page number that was clicked by the user.
  function changePage(event) {
    const pageNumber = Number(event.target.textContent); //we extract the page number
    setCurrentPage(pageNumber); //when we have a number, we call setCurrentPage
  }
  //will return the number of movies equal to the dataLimit
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };
  // to show the group of page numbers in the pagination.
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [currentPage]);

  return (
    <>
      {/* show the posts, 10 posts at a time */}
      <div className="grid">
        {getPaginatedData().map((movie, idx) => (
          <RenderComponent key={idx} movie={movie} />
        ))}
      </div>

      {/* show the pagiantion
        it consists of next and previous buttons
        along with page numbers, in our case, 5 page
        numbers at a time
    */}
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          <FaBackward />
        </button>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          <FaForward />
        </button>
      </div>
    </>
  );
}

export default Pagination;
