/**
 * Comment type definition
 * Represents a guest book entry
 */
export interface Comment {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

/**
 * Create comment request payload
 */
export interface CreateCommentRequest {
  name: string;
  message: string;
}
