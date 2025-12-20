import { FileType } from '@/types/file';
import {
  Folder,
  FileImage,
  FileText,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  File,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileIconProps {
  type: FileType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const iconMap = {
  folder: { icon: Folder, colorClass: 'text-file-folder' },
  image: { icon: FileImage, colorClass: 'text-file-image' },
  document: { icon: FileText, colorClass: 'text-file-document' },
  video: { icon: FileVideo, colorClass: 'text-destructive' },
  audio: { icon: FileAudio, colorClass: 'text-primary' },
  archive: { icon: FileArchive, colorClass: 'text-amber-500' },
  code: { icon: FileCode, colorClass: 'text-emerald-500' },
  other: { icon: File, colorClass: 'text-file-icon' },
};

const sizeMap = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function FileIcon({ type, size = 'md', className }: FileIconProps) {
  const { icon: Icon, colorClass } = iconMap[type] || iconMap.other;
  
  return (
    <Icon className={cn(sizeMap[size], colorClass, className)} />
  );
}
