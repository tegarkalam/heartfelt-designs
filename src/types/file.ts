export type FileType = 'folder' | 'image' | 'document' | 'video' | 'audio' | 'archive' | 'code' | 'other';

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size?: number;
  modifiedAt: Date;
  createdAt: Date;
  path: string;
  extension?: string;
  thumbnail?: string;
}

export interface FolderItem extends FileItem {
  type: 'folder';
  children?: (FileItem | FolderItem)[];
  isExpanded?: boolean;
}

export type ViewMode = 'grid' | 'list';
export type SortBy = 'name' | 'date' | 'size' | 'type';
export type SortOrder = 'asc' | 'desc';
