import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const AddCredentialSkeleton = () => {
    return (
        <div className="container mx-auto p-4">
        <Card className="max-w-md mx-auto border bg-card shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <CardHeader>
            <CardTitle className="text-2xl font-bold">
                <Skeleton className="h-8 w-48 bg-muted dark:bg-gray-700" />
            </CardTitle>
            <CardDescription>
                <Skeleton className="h-4 w-64 mt-2 bg-muted dark:bg-gray-700" />
            </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
                <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-muted dark:bg-gray-700" />
                <Skeleton className="h-10 w-full bg-muted dark:bg-gray-700" />
                </div>

                <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-muted dark:bg-gray-700" />
                <Skeleton className="h-10 w-full bg-muted dark:bg-gray-700" />
                </div>

                <div className="space-y-2">
                <Skeleton className="h-4 w-20 bg-muted dark:bg-gray-700" />
                <Skeleton className="h-10 w-full bg-muted dark:bg-gray-700" />
                </div>
            </div>
            </CardContent>
            <CardFooter className="flex justify-between">
            <Skeleton className="h-10 w-24 bg-muted dark:bg-gray-700" />
            <Skeleton className="h-10 w-32 bg-muted dark:bg-gray-700" />
            </CardFooter>
        </Card>
    </div>
    )
};