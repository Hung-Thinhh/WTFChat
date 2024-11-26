import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currUserSelector } from '../redux/selectors';

const PrivateRoutes = ({ component }, props) => {
    const currUser = useSelector(currUserSelector); // get current user data from global state

    if (currUser) {
        return component;
    } else {
        return <Navigate to="/login" />;
    }
};

export { PrivateRoutes };
