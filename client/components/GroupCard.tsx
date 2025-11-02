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
  progress?: number;
  showProgress?: boolean;
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
  progress = 0,
  showProgress = false,
}: GroupCardProps) {
  const getProgressColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressTextColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };
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

        {/* Progress Bar (Students Only) */}
        {showProgress && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-foreground">
                Tu Progreso
              </span>
              <span className={`text-xs font-bold ${getProgressTextColor(progress)}`}>
                {progress}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgressColor(progress)} rounded-full transition-all duration-300`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

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
