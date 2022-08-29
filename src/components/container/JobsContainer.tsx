import React, { useEffect } from "react";
import Job from "./Job";
import Wrapper from "../../wrappers/JobsContainer";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import LoadingSpinner from "../loading";
import { getAllJobs } from "../../slices/allJobsSlice";
const JobsContainer = () => {
  const { jobs, isLoading } = useAppSelector((store) => store.allJobs);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // @ts-ignore
    dispatch(getAllJobs());
  }, []);
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
      <h5>Jobs info</h5>
      <div className="jobs">
        {jobs.map((job: any) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
