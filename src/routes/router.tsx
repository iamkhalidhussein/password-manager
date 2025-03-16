import { createBrowserRouter } from 'react-router-dom';
import { Home } from '@/pages/home';
import { Suspense, lazy } from 'react';
import { DashboardSkeleton } from '@/components/skeletons/dashboard-skeleton';
import { AddCredentialSkeleton } from '@/components/skeletons/add-credential-skeleton';

const Dashboard = lazy(() => import('@/pages/dashboard'));
const AddCredential = lazy(() => import('@/pages/add-credential'));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/dashboard",
        element: <Suspense fallback={<DashboardSkeleton/>}>
                    <Dashboard/>
                </Suspense>
    },
    {
        path: "/add-credential",
        element: <Suspense fallback={<AddCredentialSkeleton/>}>
                    <AddCredential/> 
                </Suspense>
    }
]);