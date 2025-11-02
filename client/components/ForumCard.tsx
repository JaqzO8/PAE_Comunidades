import { MessageCircle, Eye, ThumbsUp } from "lucide-react";

interface ForumCardProps {
  id: string;
  title: string;
  author: string;
  answerCount: number;
  views: number;
  votes: number;
  tags: string[];
  isAnswered?: boolean;
  onClick?: () => void;
}

export function ForumCard({
  id,
  title,
  author,
  answerCount,
  views,
  votes,
  tags,
  isAnswered = false,
  onClick,
}: ForumCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-border p-4 hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-foreground flex-1 text-sm md:text-base line-clamp-2 hover:text-primary transition-colors">
          {title}
        </h3>
        {isAnswered && (
          <span className="ml-2 text-xs font-bold px-2 py-1 bg-green-50 text-green-700 rounded whitespace-nowrap">
            ✓ Respondida
          </span>
        )}
      </div>

      <div className="text-xs text-muted-foreground mb-3">
        por <span className="font-medium">{author}</span>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-accent/10 text-accent font-medium rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 pt-3 border-t border-border">
        <div className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
          <MessageCircle className="w-4 h-4" />
          <span>{answerCount}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
          <Eye className="w-4 h-4" />
          <span>{views}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors">
          <ThumbsUp className="w-4 h-4" />
          <span>{votes}</span>
        </div>
      </div>
    </div>
  );
}
