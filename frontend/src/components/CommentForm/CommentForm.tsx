'use client';

import { useState, FormEvent } from 'react';
import { ApiService } from '@/services/api.service';
import styles from './CommentForm.module.css';

interface CommentFormProps {
  onCommentCreated: () => void;
}

/**
 * Comment Form Component
 * Allows users to submit new guest book entries
 */
export default function CommentForm({ onCommentCreated }: CommentFormProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate inputs
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    setIsSubmitting(true);

    try {
      await ApiService.createComment({
        name: name.trim(),
        message: message.trim(),
      });

      setSuccess('Comment added successfully!');
      setName('');
      setMessage('');
      
      // Notify parent component to refresh comments
      setTimeout(() => {
        onCommentCreated();
        setSuccess('');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.commentForm}>
      <h2>Sign the Guest Book</h2>
      
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            maxLength={100}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave your thoughts..."
            maxLength={500}
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
