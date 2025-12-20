import { FolderOpen, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onUpload: () => void;
}

export function EmptyState({ onUpload }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-6">
        <FolderOpen className="w-10 h-10 text-muted-foreground/50" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">
        This folder is empty
      </h3>
      <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
        Upload files or create folders to get started
      </p>
      <Button onClick={onUpload} className="gap-2">
        <Upload className="w-4 h-4" />
        Upload Files
      </Button>
    </div>
  );
}
