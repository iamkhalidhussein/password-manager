import { Skeleton } from '@/components/ui/skeleton';
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export const DashboardRowSkeleton = () => {
    return (
        <TableBody>
            {Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                    <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                    <Skeleton className="h-4 w-[150px]" />
                    </TableCell>
                    <TableCell>
                    <Skeleton className="h-4 w-[200px]" />
                    </TableCell>
                    <TableCell>
                    <Skeleton className="h-8 w-[60px]" />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
};