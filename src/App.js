import React from "react";
import "./App.css";
import Home from "./pages/home";
import About from "./pages/about";
import Booking from "./pages/booking";
import Reminder from "./pages/reminder";
import Report from "./pages/report";
import Timetable from "./pages/timetable";
import Fulltimetable from "./pages/fulltimetable";
import Room from "./pages/room";
import Datesheet from "./pages/datesheet";
import TeacherDatesheetLOGIN from "./pages/datesheetlogin";
import TeacherDatesheet from "./pages/teacherdatesheet";
import { Switch, Route } from "react-router-dom";
import Director from "./pages/director";
import Login from "./Admin/pages/Login";
import MainAdminpanel from "./Admin/pages/Admin/MainAdmin";
import MainAdminAboutus from "./Admin/pages/Admin/Aboutus";
import MainAdminDirector from "./Admin/pages/Admin/DirectorV";
import MainAdminFeedback from "./Admin/pages/Admin/Feedback";
import AdminDashboard from "./Admin/pages/Adminpanel";
import ITcontactus from "./Admin/pages/Contactus";
import ITSetting from "./Admin/pages/Settingit";
import Fileuploadit from "./Admin/pages/Admin/Fileuploadit";
import Reportsit from "./Admin/pages/Reportsit";
import MoniteringUsersSettings from "./Admin/pages/Admin/MoniteringUsers";
import ProtectedRoute from "./Admin//components/ProtectedRoute";


function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/booking" component={Booking}></Route>
        <Route exact path="/director" component={Director}></Route>
        <Route exact path="/reminder" component={Reminder}></Route>
        <Route exact path="/report" component={Report}></Route>
        <Route exact path="/timetable" component={Timetable}></Route>
       
        <Route exact path="/fulltimetable" component={Fulltimetable}></Route>
        <Route exact path="/rooms" component={Room}></Route>
        <Route exact path="/datesheet" component={Datesheet}></Route>
        <Route exact path="/teacherdatesheet"  component={TeacherDatesheetLOGIN} ></Route>
        {/* ===============Main Admin panel Routes  =========================== */}
        
        <ProtectedRoute exact path="/admin/main" component={MainAdminpanel} />
        <ProtectedRoute exact path="/admin/about-us" component={MainAdminAboutus} />
        <ProtectedRoute exact path="/admin/director" component={MainAdminDirector} />
        <ProtectedRoute exact path="/admin/feedback" component={MainAdminFeedback} />
        <ProtectedRoute exact path="/admin/monitering_users_settings" component={MoniteringUsersSettings} />
   
         {/* ==========================IT Admin panel Routes======================================= */}
        <Route exact path="/Admin" component={Login}></Route>
        <ProtectedRoute exact path="/Admin/Adminpanel" component={AdminDashboard} />
        <ProtectedRoute exact path="/Admin/Contactusit" component={ITcontactus} />
        <ProtectedRoute exact path="/Admin/Setting" component={ITSetting} />
        <ProtectedRoute exact path="/admin/files-uploding" component={Fileuploadit} />
        <ProtectedRoute exact path="/Admin/Reports" component={Reportsit} />
   
      </Switch>
    </>
  );
}

export default App;
