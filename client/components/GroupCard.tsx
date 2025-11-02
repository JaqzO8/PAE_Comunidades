import { Users, MessageSquare, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GroupCardProps {
  id: string;
  title: string;
  description: string;
  subject: string;
  memberCount: number;
  messageCount: number;
  fileCount: number;
  visibility: 'public' | 'private';
  isOwner?: boolean;
  onClick?: () => void;
  coverColor?: string;
}

export function GroupCard({
  id,
  title,
  description,
  subject,
  memberCount,
  messageCount,
  fileCount,
  visibility,
  isOwner = false,
  onClick,
  coverColor = 'primary',
}: GroupCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
    >
      {/* Cover */}
      <div
        className={cn(
          'h-32 bg-gradient-to-br transition-opacity group-hover:opacity-90',
          coverColor === 'primary'
            ? 'from-primary to-secondary'
            : coverColor === 'accent'
              ? 'from-accent to-orange-500'
              : 'from-blue-400 to-blue-600'
        )}
      />

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg text-foreground line-clamp-1">
            {title}
          </h3>
          {visibility === 'public' && (
            <span className="text-xs font-medium px-2 py-1 bg-muted text-muted-foreground rounded">
              Público
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>

        <div className="text-xs font-medium text-accent mb-3">
          {subject}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{memberCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{messageCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              <span>{fileCount}</span>
            </div>
          </div>
          {isOwner && (
            <span className="text-xs font-bold px-2 py-1 bg-primary text-primary-foreground rounded">
              Propietario
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
