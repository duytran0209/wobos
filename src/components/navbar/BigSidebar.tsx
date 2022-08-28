import React, { memo } from "react";
import { useAppSelector } from "../../app/hook";
import Wrapper from "../../wrappers/BigSidebar";
import Navlinks from "./Navlinks";
export interface BigSideBarProps {
  children?: string;
}
const logo: string = require("../../images/logo.svg").default;

export const BigSideBar: React.FC<BigSideBarProps> = memo(({ children }) => {
  const { isSidebarOpen } = useAppSelector((store) => store.user);
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <img src={logo} alt="logo" className="logo" />
          </header>
          <Navlinks />
        </div>
      </div>
    </Wrapper>
  );
});

// thunkAPI typescript - maps API links
