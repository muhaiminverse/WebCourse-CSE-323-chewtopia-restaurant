import {Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
// second security option if your not an admin you'll be stopped at routes
const AdminRoute = (children) => {
    const [user, loading] = useAuth() 
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation();

    if(loading){
        return <progress className="progress w-56"></progress>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default AdminRoute;