import { Comment, CreateCommentRequest } from '@/types/comment';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Validate that API_URL is configured
if (!API_URL) {
  console.error(
    '❌ ERROR: NEXT_PUBLIC_API_URL is not configured. ' +
    'Please set the NEXT_PUBLIC_API_URL environment variable to your backend API URL. ' +
    'Example: NEXT_PUBLIC_API_URL=https://api.example.com'
  );
}

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
    if (!API_URL) {
      throw new Error(
        'API URL is not configured. Please set NEXT_PUBLIC_API_URL environment variable.'
      );
    }

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
