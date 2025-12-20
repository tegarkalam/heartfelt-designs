import { FileItem, FolderItem } from '@/types/file';
import { FileIcon } from './FileIcon';
import { formatFileSize, formatDate } from '@/utils/fileUtils';
import { Folder, MoreVertical, Star } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface FileListItemProps {
  item: FileItem | FolderItem;
  isSelected?: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  onAction: (action: string) => void;
  onSelect: (selected: boolean) => void;
}

export function FileListItem({ 
  item, 
  isSelected, 
  onClick, 
  onDoubleClick, 
  onAction,
  onSelect 
}: FileListItemProps) {
  const isFolder = item.type === 'folder';

  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={cn(
        "group flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all duration-150",
        "hover:bg-muted/50",
        isSelected && "bg-accent/50"
      )}
    >
      {/* Checkbox */}
      <Checkbox
        checked={isSelected}
        onCheckedChange={onSelect}
        onClick={(e) => e.stopPropagation()}
        className="opacity-0 group-hover:opacity-100 data-[state=checked]:opacity-100 transition-opacity"
      />

      {/* Icon */}
      <div className="flex-shrink-0">
        {isFolder ? (
          <Folder className="w-6 h-6 text-file-folder" fill="currentColor" fillOpacity={0.2} />
        ) : (
          <FileIcon type={item.type} size="sm" className="w-6 h-6" />
        )}
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate text-foreground">{item.name}</p>
      </div>

      {/* Size */}
      <div className="w-24 text-sm text-muted-foreground hidden sm:block">
        {!isFolder && formatFileSize((item as FileItem).size)}
      </div>

      {/* Modified Date */}
      <div className="w-32 text-sm text-muted-foreground hidden md:block">
        {formatDate(item.modifiedAt)}
      </div>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
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
          {!isFolder && (
            <DropdownMenuItem onClick={() => onAction('star')}>
              <Star className="w-4 h-4 mr-2" />
              Add to Starred
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {!isFolder && (
            <DropdownMenuItem onClick={() => onAction('download')}>
              Download
            </DropdownMenuItem>
          )}
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
    </div>
  );
}
