import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const AddCredentialSkeleton = () => {
    return (
        <div className="container mx-auto p-4">
        <Card className="max-w-md mx-auto">
            <CardHeader>
            <CardTitle className="text-2xl font-bold">
                <Skeleton className="h-8 w-48" /> 
            </CardTitle>
            <CardDescription>
                <Skeleton className="h-4 w-64 mt-2" /> 
            </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">

                <div className="space-y-2">
                <Skeleton className="h-4 w-24" /> 
                <Skeleton className="h-10 w-full" />
                </div>

                <div className="space-y-2">
                <Skeleton className="h-4 w-32" /> 
                <Skeleton className="h-10 w-full" /> 
                </div>

                <div className="space-y-2">
                <Skeleton className="h-4 w-20" /> 
                <Skeleton className="h-10 w-full" /> 
                </div>
            </div>
            </CardContent>
            <CardFooter className="flex justify-between">
            <Skeleton className="h-10 w-24" />

            <Skeleton className="h-10 w-32" />
            </CardFooter>
        </Card>
    </div>
    )
};