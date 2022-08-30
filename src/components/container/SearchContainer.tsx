import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import Wrapper from "../../wrappers/SearchContainer";
import { FormRaw, FormRawSelect } from "../form";
import { handleChange, clearFilters } from "../../slices/allJobsSlice";

const SearchContainer: React.FC = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useAppSelector((store) => store.allJobs);

  const { jobTypeOptions, statusOptions } = useAppSelector(
    (store) => store.job
  );

  const dispatch = useAppDispatch();
  const handleSearch = (e: { target: { name: any; value: any } }) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>Search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRaw
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />

          {/* search status */}
          <FormRawSelect
            labelText={"Status"}
            name={"searchStatus"}
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />

          {/* search type */}
          <FormRawSelect
            labelText={"type"}
            name={"searchType"}
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />

          {/* sort */}
          <FormRawSelect
            name={"sort"}
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear Filter
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
