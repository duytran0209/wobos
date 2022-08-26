import React, { memo, useState } from "react";
import styled from "styled-components";

export interface DashboardStates {}

export interface DashboardProps {
  children?: string;
}

const DashboardStyled = styled.div``;
export const Dashboard: React.FC<DashboardProps> = memo(({ children }) => {
  return <DashboardStyled></DashboardStyled>;
});
