import { FileItem, FolderItem } from '@/types/file';
import { FileListItem } from './FileListItem';

interface FileListProps {
  folders: FolderItem[];
  files: FileItem[];
  selectedItems: Set<string>;
  onSelect: (id: string) => void;
  onToggleSelect: (id: string, selected: boolean) => void;
  onOpen: (item: FileItem | FolderItem) => void;
  onAction: (item: FileItem | FolderItem, action: string) => void;
}

export function FileList({ 
  folders, 
  files, 
  selectedItems, 
  onSelect, 
  onToggleSelect,
  onOpen, 
  onAction 
}: FileListProps) {
  const allItems = [...folders, ...files];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border mb-2">
        <div className="w-6" /> {/* Checkbox space */}
        <div className="w-6" /> {/* Icon space */}
        <div className="flex-1">Name</div>
        <div className="w-24 hidden sm:block">Size</div>
        <div className="w-32 hidden md:block">Modified</div>
        <div className="w-8" /> {/* Actions space */}
      </div>

      {/* Items */}
      <div className="space-y-1">
        {allItems.map((item, index) => (
          <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 20}ms` }}>
            <FileListItem
              item={item}
              isSelected={selectedItems.has(item.id)}
              onClick={() => onSelect(item.id)}
              onDoubleClick={() => onOpen(item)}
              onAction={(action) => onAction(item, action)}
              onSelect={(selected) => onToggleSelect(item.id, selected)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
