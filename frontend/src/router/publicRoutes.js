import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currUserSelector } from '../redux/selectors';
import config from 'config';

const PublicRoutes = ({ component }, props) => {
    const location = useLocation();

    const currUser = useSelector(currUserSelector); // get current user data from global state

    if (
        currUser &&
        (location.pathname === config.routes.login ||
            location.pathname === config.routes.register ||
            location.pathname === config.routes.forgetpassword)
    ) {
        return <Navigate to={config.routes.home} />;
    } else {
        return component;
    }
};

export { PublicRoutes };
