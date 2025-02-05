import { DashboardRowSkeleton } from "@/components/skeletons/dashboard-row-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Eye, EyeClosed, Edit, Trash2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
    const [credentials, setCredentials] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user } = useKindeAuth();

    const {
        refetch: refetchCredentials,
        isLoading: fetchingCredentials,
        isError
    } = useQuery({
        queryKey: ['credentials', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/user-credentials/${user?.email}`);
            if(res.data?.credentials) {
                setCredentials(res.data?.credentials)
            }
            return res.data?.credentials;
        }
    });

    const [theme, ] = useState(() => {
        return localStorage.getItem("dashdeals-theme") === "dark";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme);
    }, [theme]);

    if(isError) {
        const errorData = () => toast.error('Failed to Load Data.', {removeDelay: 4000});
        errorData();
    }

    return (
        <div className="container mx-auto p-4">
        <Toaster/>
        <Card>
            <CardHeader>
            <CardTitle className="text-2xl font-bold ">Password Dashboard</CardTitle>
            <CardDescription>Manage your stored passwords</CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Website</TableHead>
                    <TableHead>Username or Email</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
                </TableHeader>
                {fetchingCredentials 
                ? <DashboardRowSkeleton/> 
                : <DashboardTableBody credentials={credentials} refetchCredentials={refetchCredentials}/>
                }
            </Table>
            </CardContent>
            <CardFooter>
            <Link to="/add-credential">
                <Button>Add New Password</Button>
            </Link>
            </CardFooter>
        </Card>
    </div>
    )
};

export default Dashboard;

interface Credential {
    _id: string, 
    website: string;
    username_or_email: string;
    password: string;
    email: string;
}

interface Props {
    credentials: Credential[];
    refetchCredentials: () => void
}

const DashboardTableBody: React.FC<Props> = ({credentials, refetchCredentials}) => {
    const [showPass, setShowPass] = useState<Record<string, boolean>>({});
    const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
    const { user } = useKindeAuth()
    const [savingCredential, setSavingCredential] = useState(false);
    
    const togglePassword = (id: string) => {
        setShowPass(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const notify = () => toast.success('Credential Successfully Updated.', {removeDelay: 4000});

    const notifyDel = () => toast.success('Credential Successfully Deleted.', {removeDelay: 4000});
    const axiosSecure = useAxiosSecure();

    const editCredential = (id: string) => {
        console.log(id);
        setIsEditing(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    type CredentialsForm = {
        credentials: Record<string, {
            website: string;
            username_or_email: string;
            password: string;
            email: string;
        }>;
    };    

    const { register, handleSubmit, getValues } = useForm<CredentialsForm>({
        defaultValues: {
            credentials: credentials.reduce((acc, entry) => {
                acc[entry._id] = {
                    website: entry.website,
                    username_or_email: entry.username_or_email,
                    password: entry.password,
                    email: user?.email ?? ""
                }
                return acc;
            }, {} as Record<string, { website: string; username_or_email: string; password: string, email: string }>)
        }
    });

    const saveCredential = async (id: string) => {
        try {
            setSavingCredential(true);
            const credentials = getValues('credentials');
            const updatedCredentials = credentials[id];
            const res = await axiosSecure.patch(`/users/user-credentials/${user?.email}/${id}`, updatedCredentials)
            console.log(res);
            if(res.data.success) {
                refetchCredentials();
                notify();
                setIsEditing({});
            }
        } catch (error) {
            console.error('error while update credential', error);
        } finally {
            setSavingCredential(false);
        }
    };
    
    const handleCredentialDelete = async (id: string) => {
        try {
            const res = await axiosSecure.delete(`/users/user-credentials/${user?.email}/${id}`)
            if(res.data.success) {
                refetchCredentials();
                notifyDel();
            }
        } catch (error) {
            console.error('error while deleting credential', error);
        }
    };

    return (
        <TableBody>
            {credentials.map((entry) => (
                <TableRow key={entry._id}>
                <TableCell>
                    <Input
                        id="website"
                        type="text"
                        {...register(`credentials.${entry._id}.website`)}
                        defaultValue={entry.website} 
                        className={`${!isEditing[entry._id] && 'border-0  pointer-events-none'}`}
                    />
                </TableCell>
                <TableCell>
                    <Input 
                        id="username_or_email"
                        type="text" 
                        {...register(`credentials.${entry._id}.username_or_email`)}
                        defaultValue={entry.username_or_email} 
                        className={`${!isEditing[entry._id] && 'border-0  pointer-events-none'}`}
                    />
                </TableCell>
                <TableCell className="flex gap-2">
                    {showPass[entry._id] 
                    ? <EyeClosed onClick={() => togglePassword(entry._id)}/> 
                    : <Eye onClick={() => togglePassword(entry._id)}/>
                    }
                    {showPass[entry._id] 
                    ? <Input id="password" type="text" {...register(`credentials.${entry._id}.password`)} defaultValue={entry.password} className={`${!isEditing[entry._id] && 'border-0 pointer-events-none'}`}/> 
                    : <><p className="font-bold">********</p></>
                    }
                    
                </TableCell>
                <TableCell>
                <DropdownMenu>
                    {isEditing[entry._id] 
                    ? <Button variant="outline" size="sm" onClick={handleSubmit(() => saveCredential(entry._id))}>{savingCredential ?<>Saving<Loader2/></> : 'Save'} </Button> 
                    :<DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        View
                    </Button>
                    </DropdownMenuTrigger>
                    }
                    <DropdownMenuContent align="center">
                    <DropdownMenuItem onClick={() => editCredential(entry._id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCredentialDelete(entry._id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
};