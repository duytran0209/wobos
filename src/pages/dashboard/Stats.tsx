import React, { memo, useEffect } from "react";
import { useAppDispatch } from "../../app/hook";
import { showStats } from "../../slices/allJobsSlice";

export interface StatsProps {
  children?: string;
}

export const Stats: React.FC<StatsProps> = memo(({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, []);
  return <>Stats</>;
});
