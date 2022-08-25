import React from "react";
import styled from "styled-components";
import { uiActions } from "../../slices/uiSlice";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Switch from "@mui/material/Switch";
import { useAppDispatch } from "../../app/hook";

const DarkMode = () => {
  const dispatch = useAppDispatch();
  const handleChangeToggler = () => {
    dispatch(uiActions.toggleTheme());
  };
  return (
    <DarkmodeStyled>
      <div className="left-content">
        <Brightness4Icon />
      </div>
      <div className="right-content">
        <Switch
          value=""
          size="medium"
          inputProps={{ "aria-label": "" }}
          onClick={handleChangeToggler}
        />
      </div>
    </DarkmodeStyled>
  );
};

const DarkmodeStyled = styled.button`
  position: fixed;
  right: 0;
  top: 50%;
  background-color: lightblue;
  width: 6rem;
  height: 2.5rem;
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: none;
  svg {
    display: flex;
    align-items: center;
    font-size: 1.7rem;
    color: #151515;
  }
`;

export default DarkMode;
