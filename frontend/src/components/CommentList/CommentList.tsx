'use client';

import { Comment } from '@/types/comment';
import CommentCard from '../CommentCard/CommentCard';
import styles from './CommentList.module.css';

interface CommentListProps {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

/**
 * Comment List Component
 * Displays all guest book entries
 */
export default function CommentList({ comments, loading, error }: CommentListProps) {
  if (loading) {
    return (
      <div className={styles.commentList}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <div>Loading comments...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.commentList}>
        <div className={styles.error}>
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className={styles.commentList}>
        <h2>Guest Book Entries</h2>
        <div className={styles.empty}>
          No comments yet. Be the first to sign the guest book!
        </div>
      </div>
    );
  }

  return (
    <div className={styles.commentList}>
      <h2>
        Guest Book Entries
        <span className={styles.count}> ({comments.length})</span>
      </h2>
      <div className={styles.commentsContainer}>
        {comments.map((comment, index) => (
          <CommentCard key={comment.id || index} comment={comment} />
        ))}
      </div>
    </div>
  );
}
