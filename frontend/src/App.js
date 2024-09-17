import "./App.css";
import AppRoutes from "./router/appRoutes";
import AdminRoutes from "./router/adminRouter";
import { styled } from '@mui/material/styles';
// react route
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import CheckAdminRoutes from "./router/checkAdminRoutes";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// rovider

import ChatDataProvider from "./lib/provider/ChatDataProvider";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Container from '@mui/material/Container';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



function App(props) {
  const prevPath = localStorage.getItem('prevPath') || '/';

  const isAuthentication = useSelector(
    (state) => state.Authentication.defaultUser
  );
  const Mainn = () => (
    <div className="main_content">
      <AppRoutes />
    </div>
  );




  return (
    <Container fixed>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
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
      </ThemeProvider>
    </Container>
  );
}

export default App;
