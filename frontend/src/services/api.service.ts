import { Comment, CreateCommentRequest } from '@/types/comment';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * API Service for guest book operations
 * Handles all communication with the backend API
 */
export class ApiService {
  /**
   * Fetch all comments from the backend
   * @returns Promise with array of comments
   */
  static async getComments(): Promise<Comment[]> {
    try {
      const response = await fetch(`${API_URL}/comments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Ensure fresh data
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  /**
   * Create a new comment
   * @param data - Comment data (name and message)
   * @returns Promise with the newly created comment
   */
  static async createComment(data: CreateCommentRequest): Promise<Comment> {
    try {
      const response = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create comment');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }
}
