import { FolderItem } from '@/types/file';
import { Folder, MoreVertical } from 'lucide-react';
import { formatDate } from '@/utils/fileUtils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface FolderCardProps {
  folder: FolderItem;
  isSelected?: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  onAction: (action: string) => void;
}

export function FolderCard({ folder, isSelected, onClick, onDoubleClick, onAction }: FolderCardProps) {
  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={cn(
        "group relative p-4 rounded-xl bg-card border border-border/50 file-card-hover cursor-pointer",
        "animate-scale-in",
        isSelected && "ring-2 ring-primary border-primary/50 bg-accent/30"
      )}
    >
      {/* Action Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "absolute top-3 right-3 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity",
              "bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-muted"
            )}
          >
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={() => onAction('open')}>
            Open
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction('rename')}>
            Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onAction('move')}>
            Move to...
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => onAction('delete')}
            className="text-destructive focus:text-destructive"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Folder Icon */}
      <div className="aspect-square rounded-lg bg-gradient-to-br from-file-folder/20 to-file-folder/5 flex items-center justify-center mb-3">
        <Folder className="w-12 h-12 text-file-folder" fill="currentColor" fillOpacity={0.2} />
      </div>

      {/* Folder Info */}
      <div className="space-y-1">
        <h3 className="font-medium text-sm truncate text-foreground" title={folder.name}>
          {folder.name}
        </h3>
        <p className="text-xs text-muted-foreground">
          {formatDate(folder.modifiedAt)}
        </p>
      </div>
    </div>
  );
}
