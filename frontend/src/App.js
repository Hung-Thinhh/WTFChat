import './App.css';
// import AppRoutes from './router/appRoutes';
// import AdminRoutes from './router/adminRouter';
// react route
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
// import CheckAdminRoutes from './router/checkAdminRoutes';

// routes
import { publicRoutes } from 'routes';

import ChatDataProvider from './lib/provider/ChatDataProvider';

// import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useContext, useEffect, useState } from 'react';
import { checkaccount } from 'controller/authen';
import ChatDataContext from 'lib/Context/ChatContext';
// import { faArrowLeft, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import RightSidebar from "./components/layout/ChatLayout/RightSidebar";

function App(props) {
    // const location = useLocation();
    // const prevPath = localStorage.getItem('prevPath') || '/';
    const { setCurrUser } = useContext(ChatDataContext);
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

    useEffect(() => { // check account whenever go to page
        const checkAccount = async () => {
            const res = await checkaccount();
            if (res.EC === '200') {
                setCurrUser(res.DT)
            } else if (res.EC === '400') {
                alert('Tài khoản đang bị khoá');
                // logout
            } else if (res.EC === '403') {
                alert('Xác thực thất bại')
                // logout
            }  else if (res.EC === '500') {
                alert(
                    'Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com',
                );
                // logout
            }  

        }
        checkAccount();
    }, [])

    return (
        <ChatDataProvider>
            <Router>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        // let Layout = isMobile ? MobileLayout : DefaultLayout;
                        let Layout = Fragment; // layout mặc đinh sẽ được đặt là không có thiết lập trong routes

                        // Phần này dùng để check xem page có layout đặc biệt không nếu có thì chuyển thành layout đó
                        // set up layout trong thư mục routes/routes

                        if (route.layout) {
                            Layout = route.layout;
                        }

                        // Set layout and Page props base on route.name

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page {...pageProps} />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </ChatDataProvider>
    );
}

export default App;
