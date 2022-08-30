import React, { memo, useState } from "react";
import Wrapper from "../../wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { toggleSidebar, clearStore } from "../../slices/userSlice";
interface NavbarProps {
  children?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = memo(({ children }) => {
  const logo: string = require("../../images/logo.svg").default;
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={(): void => {
            toggle();
          }}
        >
          <FaAlignLeft />
        </button>

        <div>
          <img src={logo} alt="logo-navbar" />
        </div>

        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={(): void => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>

          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(clearStore("Logging out..."))}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
});
