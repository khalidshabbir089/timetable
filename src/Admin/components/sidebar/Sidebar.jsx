import "./sidebar.css";
import "react-pro-sidebar/dist/css/styles.css";
import { TiHome } from "react-icons/ti";
import { MdRecentActors } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { RiPagesLine } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

export default function Sidebar() {
  return (
    <div className="sidebar ">
      <div className="sidebarWrapper">
        <div className="logo d-flex align-items-center">
          <img src="../assets/images/logopng1231.png" alt="logo" />
          <div className="logoname ">
            <h1>CUI TIMETABLE</h1>
            <p>Comsats University Sahiwal</p>
          </div>
        </div>
        <hr />
      </div>
      <div className=" sidebarlistdiv">
        <ul className="sidebarList">
          <Link to="/Admin/dashboard" className="link">
            <li className="sidebarListItem active d-flex align-items-center ">
              <TiHome className="icons" />
              Dashboard
            </li>
          </Link>
          <Link to="/Admin/lectures_data" className="link">
            <li className="sidebarListItem active d-flex align-items-center ">
              <MdRecentActors className="icons" />
              Lecturess
            </li>
          </Link>

          <Link to="/record/lectures" className="link">
            <li className="sidebarListItem active d-flex align-items-center ">
              <FaClipboardList className="icons" />
              Record
            </li>
          </Link>

          <Link to="/Admin/pages" className="link">
            <li className="sidebarListItem active d-flex align-items-center ">
              <RiPagesLine className="icons" />
              Pages
            </li>
          </Link>
          <Link to="/Admin/feedback" className="link">
            <li className="sidebarListItem active d-flex align-items-center ">
              <RiPagesLine className="icons" />
              Feedback
            </li>
          </Link>
          <Link to="/Admin/signup" className="link">
            <li className="sidebarListItem active d-flex align-items-center ">
              <MdManageAccounts className="icons" />
              Accounts
            </li>
          </Link>
          <Link to="/" className="link">
            <li className="sidebarListItem active d-flex align-items-center ">
              <MdSettings className="icons" />
              Settings
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
