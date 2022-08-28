import React, { memo } from "react";
import { FaTimes } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { toggleSidebar } from "../../slices/userSlice";
import Wrapper from "../../wrappers/SmallSidebar";
import Navlinks from "./Navlinks";
export interface SmallSideBarProps {
  children?: string;
}
const logo = require("../../images/logo.svg").default;
export const SmallSideBar: React.FC<SmallSideBarProps> = memo(
  ({ children }) => {
    const { isSidebarOpen } = useAppSelector((store) => store.user);
    const dispatch = useAppDispatch();
    const toggle = () => {
      dispatch(toggleSidebar());
    };
    return (
      <Wrapper>
        <div
          className={
            isSidebarOpen
              ? "sidebar-container show-sidebar "
              : "sidebar-container"
          }
        >
          <div className="content">
            <button className="close-btn" onClick={toggle}>
              <FaTimes />
            </button>

            <header>
              <img src={logo} alt="logo" />
            </header>
            <Navlinks toggleSidebar={toggle} />
          </div>
        </div>
      </Wrapper>
    );
  }
);
