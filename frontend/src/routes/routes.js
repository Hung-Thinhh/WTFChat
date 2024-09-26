import config from '~/config';

// Layouts (là những layout bọc bên ngoài của trang nhưng layout sẽ được đặt trong thư mục layouts)

// Pages (là giao diện những trang web và được đặt bên trong thư mục page)
import Home from '~/pages/Home';

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
    //     icon: <FontAwesomeIcon icon={faHome} />,
    //     layout: HeaderOnly,
    //     mblayout: MobileHeaderOnly,
    },
];

// Private routes (nhưng đường dẫn chỉ có thể truy cập từ phía server hoặc người có thẩm quyền)
const privateRoutes = [];

export { publicRoutes, privateRoutes };