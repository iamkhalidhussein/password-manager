import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useKindeAuth();

    // Add a request interceptor for authorization token
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        if(!token) {
            console.error('No token found');
            navigate('/dashboard');
            return Promise.reject(new Error('No token found'));
        }
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }, function(error) {
        return Promise.reject(error);
    });

    // Response interceptor to handle 401/403 errors
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async function(error) {
        const status = error.response?.status;
        if(status === 401 || status === 403) {
            return Promise.reject({ message: 'status code', status });
        } else {
            await logout();
            navigate('/dashboard');
        }
    })

    return axiosSecure;
};

export default useAxiosSecure;