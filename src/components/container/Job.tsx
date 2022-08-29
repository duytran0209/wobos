import moment from "moment";
import React from "react";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { deleteJob, setEditJob } from "../../slices/jobSlice";
import Wrapper from "../../wrappers/Job";
import JobInfo from "./JobInfo";
interface Props {
  _id: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  createAt: string;
  status: string;
}

const Job: React.FC<Props> = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createAt,
  status,
}) => {
  const dispatch = useAppDispatch();
  const date = moment(createAt).format("MMM Do YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />

          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="add-job"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  setEditJob({
                    editJobId: _id,
                    position,
                    company,
                    jobLocation,
                    jobType,
                    status,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              // @ts-ignore
              onClick={() => dispatch(deleteJob(_id))}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
