import { FileItem } from '@/types/file';
import { FileIcon } from './FileIcon';
import { formatFileSize, formatDate } from '@/utils/fileUtils';
import { MoreVertical, Star } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface FileCardProps {
  file: FileItem;
  isSelected?: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  onAction: (action: string) => void;
}

export function FileCard({ file, isSelected, onClick, onDoubleClick, onAction }: FileCardProps) {
  const isImage = file.type === 'image' && file.thumbnail;

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
          <DropdownMenuItem onClick={() => onAction('star')}>
            <Star className="w-4 h-4 mr-2" />
            Add to Starred
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onAction('download')}>
            Download
          </DropdownMenuItem>
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

      {/* Thumbnail / Icon */}
      <div className="aspect-square rounded-lg bg-muted/50 flex items-center justify-center mb-3 overflow-hidden">
        {isImage ? (
          <img 
            src={file.thumbnail} 
            alt={file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <FileIcon type={file.type} size="lg" />
        )}
      </div>

      {/* File Info */}
      <div className="space-y-1">
        <h3 className="font-medium text-sm truncate text-foreground" title={file.name}>
          {file.name}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatFileSize(file.size)}</span>
          <span>•</span>
          <span>{formatDate(file.modifiedAt)}</span>
        </div>
      </div>
    </div>
  );
}
