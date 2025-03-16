import { FolderOpen } from "lucide-react";

export const NoCredentialFound = () => {
    return (
            <div className="flex w-1/2 mx-auto flex-col items-center justify-center h-64 dark:bg-gray-500 bg-muted/50 rounded-lg">
                <FolderOpen className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">No Credential Found</p>
            </div>
    )
};