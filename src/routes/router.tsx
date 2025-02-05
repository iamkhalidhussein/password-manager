import { createBrowserRouter } from 'react-router-dom';
import { AddCredential } from '@/pages/add-credential';
import { Dashboard } from '@/pages/dashboard';
import { Home } from '@/pages/home';
import { PrivateRoute } from '@/routes/private-route';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
        // element: <PrivateRoute><Home/></PrivateRoute>
    },
    {
        path: "/dashboard",
        element: <Dashboard/>
    },
    {
        path: "/add-credential",
        element: <AddCredential/>
    }
]);