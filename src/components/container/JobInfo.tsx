import React from "react";
import Wrapper from "../../wrappers/JobInfo";

interface Props {
  icon?: any;
  text: string;
}
const JobInfo: React.FC<Props> = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
