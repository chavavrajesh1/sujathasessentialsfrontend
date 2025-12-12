import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
    const userInfo = useSelector((state)=>state.user.userInfo);
    const location = useLocation();

    if(!userInfo){
        // redirect to login and remember where user wanted to go
        return <Navigate to="/login" state={{ from: location }} replace/>;
    }

    return children;
}

export default ProtectedRoute;