import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="rounded-lg border bg-card shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <div className="space-y-2 p-6">
                <Skeleton className="h-8 w-[200px] bg-muted dark:bg-gray-700" />
                <Skeleton className="h-4 w-[300px] bg-muted dark:bg-gray-700" />
                </div>

                <div className="p-6">
                <div className="space-y-4">
                    <div className="flex justify-between">
                    <Skeleton className="h-6 w-[100px] bg-muted dark:bg-gray-700" />
                    <Skeleton className="h-6 w-[150px] bg-muted dark:bg-gray-700" />
                    <Skeleton className="h-6 w-[100px] bg-muted dark:bg-gray-700" />
                    <Skeleton className="h-6 w-[50px] bg-muted dark:bg-gray-700" />
                    </div>

                    {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex justify-between">
                        <Skeleton className="h-4 w-[100px] bg-muted dark:bg-gray-700" />
                        <Skeleton className="h-4 w-[150px] bg-muted dark:bg-gray-700" />
                        <Skeleton className="h-4 w-[100px] bg-muted dark:bg-gray-700" />
                        <Skeleton className="h-4 w-[50px] bg-muted dark:bg-gray-700" />
                    </div>
                    ))}
                </div>
                </div>

                <div className="p-6">
                <Skeleton className="h-10 w-[150px] bg-muted dark:bg-gray-700" />
                </div>
            </div>
        </div>
    )
};