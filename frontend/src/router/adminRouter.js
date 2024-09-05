import React, { useEffect } from "react";
// import "../css/mainpage.scss";
import { useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";
// page

// layout


// component


// import { height } from "@mui/system";

const AdminRoutes = (props) => {
  // get state from redux

  const theme = useSelector((state) => state.theme.theme);
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div style={{ height: "100vh" }} className="main_content" >
      {/* <NavigationBar /> */}
      <div className="main_page">
        {/* <HeaderAdmin /> */}
        <section
          style={{
            paddingTop: "120px",
          }}
          className="main_page_container bg-white">
          <Routes>
            {/* <Route path="/" element={<HomeAdmin />} /> */}
    
          </Routes>
        </section>
        
      </div>
    </div>
  );
};

export default AdminRoutes;
