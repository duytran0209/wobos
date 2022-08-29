import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdQueryStats } from "react-icons/md";
import { linksType } from "../models/linksType";

const links: linksType[] = [
  { id: 1, text: "all jobs", path: "/all-jobs", icon: <MdQueryStats /> },
  { id: 2, text: "add job", path: "/add-job", icon: <FaWpforms /> },
  { id: 3, text: "profile", path: "/profile", icon: <ImProfile /> },
];

export default links;
