import React, { memo } from "react";
import { JobsContainer } from "../../components/container";

export interface AllJobProps {
  children?: string;
}

export const AllJob: React.FC<AllJobProps> = memo(({ children }) => {
  return (
    <>
      <JobsContainer />
    </>
  );
});
