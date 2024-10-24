import { ReactNode } from "react";
import { isLogin } from "../services/user.service";
import { Navigate } from "react-router-dom";
import { Role } from "../model/user.model";

const ProtectRoutes = ({role, children}: {role?: Role   , children: ReactNode}) => {
    
    return isLogin(role) ? children : <Navigate to={"/auth/login"}></Navigate>;
}

export default ProtectRoutes;