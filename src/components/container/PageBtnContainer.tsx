import React from "react";
import Wrapper from "../../wrappers/PageBtnContainer";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { changePage } from "../../slices/allJobsSlice";

const PageBtnContainer: React.FC = () => {
  const { numOfPages, page } = useAppSelector((state) => state.allJobs);
  const dispatch = useAppDispatch();
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };
  return (
    <Wrapper>
      <button onClick={prevPage} type="button" className="prev-btn">
        <HiChevronDoubleLeft />
        Prev
      </button>

      <div className="btn-container">
        {pages.map((pageNumber: number) => (
          <button
            key={pageNumber}
            onClick={() => dispatch(changePage(pageNumber))}
            className={pageNumber === page ? "pageBtn active" : "pageBtn"}
            type="button"
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button onClick={nextPage} type="button" className="next-btn">
        <HiChevronDoubleRight />
        Right
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
