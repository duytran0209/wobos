import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getAllJobs } from "../../slices/allJobsSlice";
import Wrapper from "../../wrappers/JobsContainer";
import LoadingSpinner from "../loading";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";

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
  if (jobs?.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs found</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs?.length > 1 && "s"} found
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
