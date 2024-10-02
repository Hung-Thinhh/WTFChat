import './App.css';
// import AppRoutes from './router/appRoutes';
// import AdminRoutes from './router/adminRouter';
// react route
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
// import CheckAdminRoutes from './router/checkAdminRoutes';

// routes
import { publicRoutes } from '../src/routes';

import ChatDataProvider from './lib/provider/ChatDataProvider';

// import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import RightSidebar from "./components/layout/RightSidebar";
function App(props) {
    const prevPath = localStorage.getItem('prevPath') || '/';

    const [pageProps, setPageProps] = useState({}); // những props muốn chuyền vào pages để sữ dụng

    //   const isAuthentication = useSelector(
    //     (state) => state.Authentication.defaultUser
    //   );
    //   const Mainn = () => (
    //     <div className="main_content">
    //       <AppRoutes />
    //     </div>
    //   );

    // Thêm những giá trị muốn thêm vào page đặc biệt nếu có
    // setPageProps(prev => {...prev, newProps: value})

    return (
        <ChatDataProvider>
            <Router>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        // let Layout = isMobile ? MobileLayout : DefaultLayout;
                        let Layout = Fragment; // sau này chỉ cần tạo ra một layout mặc đinh set ở đây

                        // Phần này dùng để check xem page có layout đặc biệt không nếu có thì chuyển thành layout đó
                        // set up layout trong thư mục routes/routes

                        // if (route.layout) {
                        //   Layout = isMobile ? route.mblayout : route.layout;
                        // } else if (route.layout === null) {
                        //   Layout = Fragment;
                        // }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                      {route.path === '/' ? (""):( <RightSidebar />)}
                                        <Page {...pageProps} />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>

                {/* Code cũ chuyển theo hướng dẫn để có thể sử dụng
        
        <Routes>
          <Route
            path="/admin/*"
            element={<CheckAdminRoutes component={AdminRoutes} />}
          />

          <Route
                path="/login"
                element={
                  isAuthentication &&
                  isAuthentication.isAuthenticated === true ? (
                    <Navigate to={prevPath} />
                  ) : (
                    <LoginPage />
                  )
                }
              />

          <Route path="/*" element={<CheckBan component={Mainn} />} />
          <Route path="/" element={<Mainn />} />
        </Routes> */}
            </Router>
        </ChatDataProvider>
    );
}

export default App;
