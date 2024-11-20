import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import ChatDataContext from 'lib/Context/ChatContext';

const PrivateRoutes = ({ component }, props) => {
    const { currUser } = useContext(ChatDataContext); // get current user data from global state

    if (currUser) {
        return component;
    } else {
        return <Navigate to="/login" />;
    }
};

export { PrivateRoutes };
