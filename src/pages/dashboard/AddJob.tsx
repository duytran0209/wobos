import React, { memo, useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { FormRaw, FormRawSelect } from "../../components/form";
import {
  clearValues,
  createJob,
  handleChange,
  editJob,
} from "../../slices/jobSlice";
import Wrapper from "../../wrappers/DashboardFormPage";
export interface AddJobProps {
  children?: string;
}

export const AddJob: React.FC<AddJobProps> = memo(({ children }) => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditting,
    editJobId,
  } = useAppSelector((store) => store.job);
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isEditting) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };
  const handleJobInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditting) {
      dispatch(
        handleChange({
          name: "jobLocation",
          value: user.location,
        })
      );
    }
  }, []);

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditting ? "Edit job" : "Add job"}</h3>
        <div className="form-center">
          {/* position */}
          <FormRaw
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInputChange}
            labelText={"Edit Position"}
          />
          {/* company */}

          <FormRaw
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInputChange}
            labelText={"Edit Company"}
          />
          {/* jobLocation */}

          <FormRaw
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInputChange}
            labelText={"Job Location"}
          />
          {/* status */}
          <FormRawSelect
            name="status"
            value={status}
            handleChange={handleJobInputChange}
            labelText={"Status"}
            list={statusOptions}
          />

          {/* jobType */}
          <FormRawSelect
            name="jobType"
            value={jobType}
            handleChange={handleJobInputChange}
            labelText={"Job Type"}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              Clear
            </button>

            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
});
