import React, { memo, useState } from "react";
import styled from "styled-components";

export interface AllJobStates {}

export interface AllJobProps {
  children?: string;
}

const AllJobStyled = styled.div``;
export const AllJob: React.FC<AllJobProps> = memo(({ children }) => {
  return <AllJobStyled></AllJobStyled>;
});
