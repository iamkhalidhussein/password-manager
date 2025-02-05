import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => {
    return (
        <div className="container mx-auto p-4">
        
        <div className="rounded-lg border bg-card shadow-sm">

            <div className="space-y-2 p-6">
            <Skeleton className="h-8 w-[200px]" /> 
            <Skeleton className="h-4 w-[300px]" /> 
            </div>

            <div className="p-6">
            <div className="space-y-4">
                
                <div className="flex justify-between">
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[50px]" />
                </div>

                {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex justify-between">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[50px]" />
                </div>
                ))}
            </div>
            </div>

            <div className="p-6">
            <Skeleton className="h-10 w-[150px]" />
            </div>
        </div>
    </div>
    )
};