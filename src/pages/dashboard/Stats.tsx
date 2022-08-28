import React, { memo, useState } from "react";
import styled from "styled-components";

export interface StatsStates {}

export interface StatsProps {
  children?: string;
}

const StatsStyled = styled.div``;
export const Stats: React.FC<StatsProps> = memo(({ children }) => {
  return <StatsStyled></StatsStyled>;
});
