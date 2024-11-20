import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

// routes
import { publicRoutes, privateRoutes } from 'routes';
import { PrivateRoutes } from 'router/privateRoutes';

import { Fragment, useContext, useEffect, useState } from 'react';
import { checkaccount, logout } from 'controller/authen';
import ChatDataContext from 'lib/Context/ChatContext';
import { socket } from 'socket';

function App(props) {
    // const location = useLocation();
    // const prevPath = localStorage.getItem('prevPath') || '/';
    const { setCurrUser } = useContext(ChatDataContext);
    const { setlistStatus } = useContext(ChatDataContext);
    const [checkAcc, setCheckAcc] = useState(false);
    const [pageProps, setPageProps] = useState({}); // những props muốn chuyền vào pages để sữ dụng

    // Thêm những giá trị muốn thêm vào page đặc biệt nếu có
    // setPageProps(prev => {...prev, newProps: value})

    const logout = async () => {
        // logout
        const logoutRes = await logout();

        if (logoutRes.EC === '200') {
            window.location.reload();
        } else if (logoutRes.EC === '500') {
            alert('Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com');
        }
    };
    const handleListStatus = (data) => {
        setlistStatus(data);
    };
    useEffect(() => {
        socket.on('user_status_update', handleListStatus);
        return () => {
            socket.off('user_status_update', handleListStatus);
        };
    }, []);
    useEffect(() => {
        // check account whenever go to page
        const checkAccount = async () => {
            const res = await checkaccount();
            if (res.EC === '200') {
                setCurrUser(res.DT);
                socket.emit('authenticate', res.DT.id);
                // setCurrUser(res.DT)
            } else if (res.EC === '400') {
                alert('Tài khoản đang bị khoá');
                await logout();
            } else if (res.EC === '403') {
                alert('Xác thực thất bại');
                await logout();
            } else if (res.EC === '500') {
                alert(
                    'Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com',
                );
            }
            setCheckAcc(true);
        };
        checkAccount();
    }, []);

    // getPublicKey - use when update key pair to daly change
    // useEffect(() => {
    //     const getPublicKey = async () => {
    //         const res = await getPublicKey();

    //         if (res.EC === '200') {
    //             setPublicKey(res.DT);
    //         }
    //     };
    // }, []);

    return (
        checkAcc && (
            <div className="App">
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
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = Fragment; // layout mặc đinh sẽ được đặt là không có thiết lập trong routes
                            if (route.layout) {
                                Layout = route.layout;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <PrivateRoutes
                                            component={
                                                <Layout>
                                                    <Page {...pageProps} />
                                                </Layout>
                                            }
                                        />
                                    }
                                />
                            );
                        })}
                    </Routes>
                </Router>
            </div>
        )
    );
}

export default App;
