import { useState, useMemo } from 'react';
import { FileItem, FolderItem, ViewMode, SortBy } from '@/types/file';
import { mockFiles, mockFolders } from '@/data/mockFiles';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import { Breadcrumbs } from './Breadcrumbs';
import { FileGrid } from './FileGrid';
import { FileList } from './FileList';
import { EmptyState } from './EmptyState';
import { UploadDialog } from './UploadDialog';
import { NewFolderDialog } from './NewFolderDialog';
import { useToast } from '@/hooks/use-toast';

export function FileManager() {
  const { toast } = useToast();
  const [currentPath, setCurrentPath] = useState('/');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);

  // Filter and sort items
  const { folders, files } = useMemo(() => {
    let filteredFolders = [...mockFolders];
    let filteredFiles = [...mockFiles];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredFolders = filteredFolders.filter(f => 
        f.name.toLowerCase().includes(query)
      );
      filteredFiles = filteredFiles.filter(f => 
        f.name.toLowerCase().includes(query)
      );
    }

    // Sort
    const sortFn = (a: FileItem | FolderItem, b: FileItem | FolderItem) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return b.modifiedAt.getTime() - a.modifiedAt.getTime();
        case 'size':
          const sizeA = 'size' in a ? a.size || 0 : 0;
          const sizeB = 'size' in b ? b.size || 0 : 0;
          return sizeB - sizeA;
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    };

    filteredFolders.sort(sortFn);
    filteredFiles.sort(sortFn);

    return { folders: filteredFolders, files: filteredFiles };
  }, [searchQuery, sortBy]);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    setSelectedItems(new Set());
  };

  const handleSelect = (id: string) => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleSelect = (id: string, selected: boolean) => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      if (selected) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const handleOpen = (item: FileItem | FolderItem) => {
    if (item.type === 'folder') {
      handleNavigate(item.path);
    } else {
      toast({
        title: "Opening file",
        description: `Opening ${item.name}...`,
      });
    }
  };

  const handleAction = (item: FileItem | FolderItem, action: string) => {
    toast({
      title: action.charAt(0).toUpperCase() + action.slice(1),
      description: `${action} action on ${item.name}`,
    });
  };

  const handleCreateFolder = (name: string) => {
    toast({
      title: "Folder created",
      description: `"${name}" has been created`,
    });
  };

  const isEmpty = folders.length === 0 && files.length === 0;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        folders={mockFolders}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <Toolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onUpload={() => setUploadDialogOpen(true)}
          onNewFolder={() => setNewFolderDialogOpen(true)}
        />

        {/* Breadcrumbs */}
        <Breadcrumbs path={currentPath} onNavigate={handleNavigate} />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <EmptyState onUpload={() => setUploadDialogOpen(true)} />
          ) : viewMode === 'grid' ? (
            <FileGrid
              folders={folders}
              files={files}
              selectedItems={selectedItems}
              onSelect={handleSelect}
              onOpen={handleOpen}
              onAction={handleAction}
            />
          ) : (
            <FileList
              folders={folders}
              files={files}
              selectedItems={selectedItems}
              onSelect={handleSelect}
              onToggleSelect={handleToggleSelect}
              onOpen={handleOpen}
              onAction={handleAction}
            />
          )}
        </div>
      </main>

      {/* Dialogs */}
      <UploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
      />
      <NewFolderDialog
        open={newFolderDialogOpen}
        onOpenChange={setNewFolderDialogOpen}
        onCreate={handleCreateFolder}
      />
    </div>
  );
}
