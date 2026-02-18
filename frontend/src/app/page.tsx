'use client';

import { useState, useEffect } from 'react';
import CommentForm from '@/components/CommentForm/CommentForm';
import CommentList from '@/components/CommentList/CommentList';
import { ApiService } from '@/services/api.service';
import { Comment } from '@/types/comment';
import styles from './page.module.css';

/**
 * Home Page Component
 * Main page of the Guest Book application
 */
export default function Home() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch comments from the API
   */
  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getComments();
      setComments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  // Load comments on initial page load
  useEffect(() => {
    fetchComments();
  }, []);

  /**
   * Callback when a new comment is created
   * Refreshes the comments list
   */
  const handleCommentCreated = () => {
    fetchComments();
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Guest Book</h1>
          <p className={styles.subtitle}>
            Leave your mark and share your thoughts
          </p>
        </header>

        <div className={styles.content}>
          <CommentForm onCommentCreated={handleCommentCreated} />
          <CommentList comments={comments} loading={loading} error={error} />
        </div>
      </main>
    </div>
  );
}
