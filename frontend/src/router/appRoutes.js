import React, { useEffect } from 'react';
import '../css/mainpage.scss';
import { useSelector } from 'react-redux';

import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoutes from './privateRoutes';
// page
// import HomePage from "../components/pages/home";
import ChatPage from '../components/pages/chatPage';

// layout
// import Header from "../components/layoutbar/Header";
// import Footer from "../components/layoutbar/Footer";
import RightSidebar from '../components/layout/RightSidebar';

// component

// import { height } from "@mui/system";

const AppRoutes = (props) => {
    const theme = useSelector((state) => state.theme.theme);
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    // get state from redux
    const isAuthentication = useSelector((state) => state.Authentication.defaultUser);

    const prevPath = localStorage.getItem('prevPath') || '/';

    return (
        <>
            <RightSidebar />
            <div
                className="main_page"
                // style={{ height: isPlaying ? "calc(100vh - 92px)" : "100vh" }}
            >
                {/* <Header /> */}
                <section className={`main_page_container ${theme}`}>
                    <Routes>
                        {/* <Route path="/song/:id" element={<Songpage />} /> */}

                        {/* //authentication */}

                        <Route
                            path="/login-gg-success/:id"
                            element={
                                isAuthentication && isAuthentication.isAuthenticated === true ? (
                                    <Navigate to={prevPath} />
                                ) : (
                                    // <LoginPageGG />
                                    <></>
                                )
                            }
                        />

                        {/* <Route
                            path="/chatpage/*"
                            element={<PrivateRoutes component={<ChatPage />} />}
                        /> */}
                        <Route path="/chatpage" element={<ChatPage />} />
                        {/* <Route path="/*" element={<HomePage />} /> */}

                        <Route path="*">404 not found</Route>
                    </Routes>
                </section>

                {/* <Footer /> */}
            </div>
        </>
    );
};

export default AppRoutes;
