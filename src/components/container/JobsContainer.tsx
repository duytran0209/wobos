import React, { useEffect } from "react";
import Job from "./Job";
import Wrapper from "../../wrappers/JobsContainer";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import LoadingSpinner from "../loading";
import PageBtnContainer from "./PageBtnContainer";
import { getAllJobs } from "../../slices/allJobsSlice";

const JobsContainer: React.FC = () => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useAppSelector((store) => store.allJobs);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, search, searchStatus, searchType, sort]);
  if (isLoading) {
    return <LoadingSpinner center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs found</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job: any) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
