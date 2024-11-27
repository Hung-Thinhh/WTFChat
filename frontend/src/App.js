import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReportType, setReportType } from './redux/globalSlice/reportType_Slide';
// routes
import { publicRoutes, privateRoutes } from 'routes';
import { PrivateRoutes } from 'router/privateRoutes';

import { Fragment, useContext, useEffect, useState } from 'react';
import { logout } from 'controller/authen';
import ChatDataContext from 'lib/Context/ChatContext';
import { socket } from 'socket';
import { userSelector } from './redux/selectors';
import { fetchCurrUser } from './redux/globalSlice/userSlice';

function App(props) {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    // const location = useLocation();
    // const prevPath = localStorage.getItem('prevPath') || '/';
    const { setlistStatus } = useContext(ChatDataContext);
    // const [checkAcc, setCheckAcc] = useState(false);
    const [pageProps, setPageProps] = useState({}); // những props muốn chuyền vào pages để sữ dụng

    // Thêm những giá trị muốn thêm vào page đặc biệt nếu có
    // setPageProps(prev => {...prev, newProps: value})
    useEffect(() => {
        // check account whenever go to page
        const checkAccount = async () => {
            dispatch(fetchCurrUser());
        };
        checkAccount();
    }, []);

    const typeReport = useSelector((state) => state.typeReport.reportType);

    useEffect(() => {
        if (typeReport.data.length === 0) {
            dispatch(fetchReportType());
        }
    }, []);

    const handleGetReportType = (data) => {
        console.log(data);

        dispatch(setReportType(data.report));
    };
    useEffect(() => {
        socket.on('delete_report_type', handleGetReportType);
        return () => {
            socket.off('delete_report_type', handleGetReportType);
        };
    }, []);
    const handleListStatus = (data) => {
        setlistStatus(data);
    };
    useEffect(() => {
        socket.on('user_status_update', handleListStatus);
        return () => {
            socket.off('user_status_update', handleListStatus);
        };
    }, []);

    const handleBanUser = async (data) => {
        console.log(data.id, user.currUser.id);
        if (parseInt(data.id) === user.currUser.id) {
            alert('Tài khoản đang bị khoá');
            await logout();
        }
    };
    useEffect(() => {
        socket.on('ban_user', handleBanUser);
        return () => {
            socket.off('ban_user', handleBanUser);
        };
    }, [user]);
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
        user.checkAccount && (
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
