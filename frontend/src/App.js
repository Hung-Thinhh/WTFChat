import "./App.css";
import AppRoutes from "./router/appRoutes";
import AdminRoutes from "./router/adminRouter";

// react route
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import CheckAdminRoutes from "./router/checkAdminRoutes";
import CheckBan from "./router/checkBan";


// rovider

import ChatDataProvider from "./lib/provider/ChatDataProvider";
import { fetchAuthentication } from "./redux/slide/AuthenticationSlice";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { toast, ToastContainer } from "react-toastify";

function App(props) {
  const dispatch = useDispatch();
  const prevPath = localStorage.getItem('prevPath') || '/';

  // useEffect(() => {
  //   dispatch(fetchAuthentication());
  // }, []);

  const isAuthentication = useSelector(
    (state) => state.Authentication.defaultUser
  );
  const Mainn = () => (
    <div className="main_content">
      <AppRoutes />
    </div>
  );
  return (
    <>
      <div className="App">
        <ChatDataProvider>
          <Router>
            <Routes>
              <Route
                path="/admin/*"
                element={<CheckAdminRoutes component={AdminRoutes} />}
              />
             
             
              {/* <Route
                path="/login"
                element={
                  isAuthentication &&
                  isAuthentication.isAuthenticated === true ? (
                    <Navigate to={prevPath} />
                  ) : (
                    <LoginPage />
                  )
                }
              /> */}
           
              {/* <Route path="/*" element={<CheckBan component={Mainn} />} /> */}
              <Route path="/*" element={<Mainn />} />
            </Routes>
          </Router>
        </ChatDataProvider>
      </div>
    </>
  );
}

export default App;
