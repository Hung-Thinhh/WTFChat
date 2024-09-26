import config from '~/config';

// Layouts
import HeaderOnly from '~/layouts/HeaderOnly';
import MobileHeaderOnly from '~/layouts/MobileHeaderOnly';

// Pages
import Home from '~/pages/Home';

// Public routes
const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
        name: 'Home',
    //     icon: <FontAwesomeIcon icon={faHome} />,
    //     layout: HeaderOnly,
    //     mblayout: MobileHeaderOnly,
    },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };