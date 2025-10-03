import { Navigate } from "react-router-dom";


function PrivateRoute({children}){
    const token = localStorage.getItem("authToken");

    return token ? children : <Navigate to = "/" replace/>;

}

export default PrivateRoute;