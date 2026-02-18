import { Comment } from '@/types/comment';
import styles from './CommentCard.module.css';

interface CommentCardProps {
  comment: Comment;
}

/**
 * Comment Card Component
 * Displays a single guest book entry
 */
export default function CommentCard({ comment }: CommentCardProps) {
  // Format the date to be more readable
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.commentCard}>
      <div className={styles.commentHeader}>
        <div className={styles.commentName}>{comment.name}</div>
        <div className={styles.commentDate}>{formatDate(comment.created_at)}</div>
      </div>
      <div className={styles.commentMessage}>{comment.message}</div>
    </div>
  );
}
