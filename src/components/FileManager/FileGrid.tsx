import { FileItem, FolderItem } from '@/types/file';
import { FileCard } from './FileCard';
import { FolderCard } from './FolderCard';

interface FileGridProps {
  folders: FolderItem[];
  files: FileItem[];
  selectedItems: Set<string>;
  onSelect: (id: string) => void;
  onOpen: (item: FileItem | FolderItem) => void;
  onAction: (item: FileItem | FolderItem, action: string) => void;
}

export function FileGrid({ 
  folders, 
  files, 
  selectedItems, 
  onSelect, 
  onOpen, 
  onAction 
}: FileGridProps) {
  return (
    <div className="p-4">
      {/* Folders Section */}
      {folders.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">
            Folders
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {folders.map((folder, index) => (
              <div key={folder.id} style={{ animationDelay: `${index * 30}ms` }}>
                <FolderCard
                  folder={folder}
                  isSelected={selectedItems.has(folder.id)}
                  onClick={() => onSelect(folder.id)}
                  onDoubleClick={() => onOpen(folder)}
                  onAction={(action) => onAction(folder, action)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Files Section */}
      {files.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">
            Files
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {files.map((file, index) => (
              <div key={file.id} style={{ animationDelay: `${(folders.length + index) * 30}ms` }}>
                <FileCard
                  file={file}
                  isSelected={selectedItems.has(file.id)}
                  onClick={() => onSelect(file.id)}
                  onDoubleClick={() => onOpen(file)}
                  onAction={(action) => onAction(file, action)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
