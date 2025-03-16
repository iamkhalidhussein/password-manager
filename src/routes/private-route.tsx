import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useLocation } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton";

interface PrivateRouteProps {
    children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = () => {
    const { user, isLoading } = useKindeAuth();
    const location = useLocation();

    if(isLoading) {
        return <DashboardSkeleton/>;
    } 
    if(user) {
        return <Navigate to='/dashboard' state={{ from: location }} replace />
    }
    
    return (
        <Navigate to='/dashboard' state={{ from: location }} replace />
    )
};