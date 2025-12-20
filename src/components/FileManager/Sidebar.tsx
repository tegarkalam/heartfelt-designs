import { useState } from 'react';
import { FolderItem } from '@/types/file';
import { 
  Folder, 
  ChevronRight, 
  ChevronDown, 
  HardDrive, 
  Star, 
  Clock, 
  Trash2,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  folders: FolderItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
}

const quickAccessItems = [
  { id: 'recent', label: 'Recent', icon: Clock, path: '/recent' },
  { id: 'starred', label: 'Starred', icon: Star, path: '/starred' },
  { id: 'trash', label: 'Trash', icon: Trash2, path: '/trash' },
];

export function Sidebar({ folders, currentPath, onNavigate }: SidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  return (
    <aside className="w-64 h-full glass-dark flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
            <HardDrive className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-sidebar-foreground">FileVault</span>
        </div>
      </div>

      {/* Quick Access */}
      <div className="p-4">
        <h3 className="text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider mb-3 px-3">
          Quick Access
        </h3>
        <nav className="space-y-1">
          {quickAccessItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.path)}
              className={cn(
                "sidebar-item w-full",
                currentPath === item.path && "sidebar-item-active"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Folders */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-3 px-3">
          <h3 className="text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider">
            Folders
          </h3>
          <button className="p-1 rounded-md hover:bg-sidebar-accent transition-colors">
            <Plus className="w-3.5 h-3.5 text-sidebar-foreground/50" />
          </button>
        </div>
        
        <nav className="space-y-1">
          <button
            onClick={() => {
              toggleFolder('root');
              onNavigate('/');
            }}
            className={cn(
              "sidebar-item w-full",
              currentPath === '/' && "sidebar-item-active"
            )}
          >
            {expandedFolders.has('root') ? (
              <ChevronDown className="w-4 h-4 text-sidebar-foreground/50" />
            ) : (
              <ChevronRight className="w-4 h-4 text-sidebar-foreground/50" />
            )}
            <HardDrive className="w-4 h-4 text-file-folder" />
            <span className="text-sm">My Files</span>
          </button>

          {expandedFolders.has('root') && (
            <div className="ml-4 space-y-1 animate-fade-in">
              {folders.map((folder, index) => (
                <button
                  key={folder.id}
                  onClick={() => onNavigate(folder.path)}
                  className={cn(
                    "sidebar-item w-full",
                    currentPath === folder.path && "sidebar-item-active"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Folder className="w-4 h-4 text-file-folder" />
                  <span className="text-sm truncate">{folder.name}</span>
                </button>
              ))}
            </div>
          )}
        </nav>
      </div>

      {/* Storage Info */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-sidebar-foreground/70">Storage Used</span>
            <span className="text-xs font-medium text-sidebar-foreground">68%</span>
          </div>
          <div className="h-1.5 bg-sidebar-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
              style={{ width: '68%' }}
            />
          </div>
          <p className="text-xs text-sidebar-foreground/50 mt-2">6.8 GB of 10 GB</p>
        </div>
      </div>
    </aside>
  );
}
