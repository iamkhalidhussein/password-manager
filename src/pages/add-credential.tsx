import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast, { Toaster } from 'react-hot-toast';
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const AddCredential = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useKindeAuth();
    const [credentialStoring, setCredentialStoring] = useState(false);
    
    const { register, handleSubmit } = useForm({
        defaultValues: {
            website: '',
            username_or_email: '',
            password: '',
            email: user?.email
        }
    });

    const notify = () => toast.success('Credential Successfully Added.', {removeDelay: 4000});

    interface Credentials {
        website: string,
        username_or_email: string,
        password: string,
        email: string | null | undefined
    }

    const onSubmit = async (credentials: Credentials) => {
        console.log(credentials)
        try {
            setCredentialStoring(true);
            const res = await axiosSecure.post('/users/user-credentials', credentials)
            console.log(res);
            if(res.data.success) {
                notify();
            }
        } catch (error) {
            console.error('error while saving credentials', error);
        } finally {
            setCredentialStoring(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
        <Toaster/>
        <Card className="max-w-md mx-auto">
            <CardHeader>
            <CardTitle className="text-2xl font-bold">Add New Password</CardTitle>
            <CardDescription>Enter the details for the new password entry</CardDescription>
            </CardHeader>
            <CardContent>
            <form className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input 
                    id="website" 
                    type="text" 
                    {...register('website')} 
                    placeholder="Enter website URL" 
                    required 
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="username">Username or Email</Label>
                <Input 
                    id="username_or_email" 
                    type="text" 
                    {...register('username_or_email')} 
                    placeholder="Enter username or Email" 
                    required 
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                    id="password" 
                    {...register('password')} 
                    type="password" 
                    placeholder="Enter password" 
                    required 
                />
                </div>
            </form>
            </CardContent>
            <CardFooter className="flex justify-between">
            <Link to="/dashboard">
                <Button variant="outline">Cancel</Button>
            </Link>
            <Button 
                type="submit" 
                onClick={handleSubmit(onSubmit)}>
                {!credentialStoring 
                ? 'Save Password'
                : <>Storing Credentials...<Loader2 className="animate-spin"/></>
                }
            </Button>
            </CardFooter>
        </Card>
    </div>
    )
};

export default AddCredential;