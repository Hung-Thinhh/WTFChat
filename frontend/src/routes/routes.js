import config from '../config';
// Layouts (là những layout bọc bên ngoài của trang nhưng layout sẽ được đặt trong thư mục layouts)
import HomeLayout from 'components/layout/HomeLayout';
import ChatLayout from 'components/layout/ChatLayout';

// Pages (là giao diện những trang web và được đặt bên trong thư mục page)
import Home from '../components/pages/Home';
import ChatPage from '../components/pages/Chat';
import Login from '../components/pages/Login';
import Register from 'components/pages/Register';
import ForgetPass from 'components/pages/ForgerPass';
import ChatHome from 'components/pages/ChatHome';
import Profile from 'components/pages/Profile';

// Public routes (nhưng đường dẫn có thể được truy cập bởi người dùng)
const publicRoutes = [
    // Cấu trúc bao gồm:
    // path - đường dẫn đến - được lấy từ thư mục confic/routes (nhớ phải thêm routes mới)
    // component - giao diện trang web (Pages)
    // name - tên trang web
    // layout - Layout chung của trang web (Layouts)
    // mblayout - Layout cho trang web phiên bản di động
    // có thể thêm để thiết lập nếu cẩn - yêu cầu ghi chú đê coder khác đẹp trai
    {
        path: config.routes.home,
        component: Home,
        name: 'Home',
        layout: HomeLayout,
    },
    {
        path: config.routes.login,
        component: Login,
        name: 'Login',
        layout: HomeLayout,
    },
    {
        path: config.routes.register,
        component: Register,
        name: 'Register',
        layout: HomeLayout,
    },
];

// Private routes (nhưng đường dẫn chỉ có thể truy cập từ phía server hoặc người có thẩm quyền)
const privateRoutes = [
    {
        path: config.routes.profile,
        component: Profile,
        name: 'Profile',
        layout: HomeLayout,
    },
    {
        path: config.routes.forgetpassword,
        component: ForgetPass,
        name: 'ForgetPass',
        layout: HomeLayout,
    },
    {
        path: config.routes.chatpage,
        component: ChatPage,
        name: 'ChatPage',
        layout: ChatLayout,
    },
    {
        path: config.routes.chat,
        component: ChatHome,
        name: 'Chat',
        layout: ChatLayout,
    },
];

export { publicRoutes, privateRoutes };
