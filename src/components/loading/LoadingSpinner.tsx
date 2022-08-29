import React from "react";

interface Props {
  center: boolean;
}

const LoadingSpinner: React.FC<Props> = ({ center }) => {
  return <div className={center ? "loading loading-center" : "loading"}></div>;
};

export default LoadingSpinner;
