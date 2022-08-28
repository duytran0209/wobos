import React from "react";
import { NavLink } from "react-router-dom";
import links from "../../utils/links";
interface Props {
  toggleSidebar?: () => void;
}
const Navlinks: React.FC<Props> = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map((link: any) => {
        return (
          <NavLink
            key={link.id}
            to={link.path}
            className={(isActive) => {
              return isActive ? "nav-link active" : "nav-link";
            }}
            onClick={toggleSidebar}
          >
            <span className="icon">{link.icon}</span>
            {link.text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Navlinks;
