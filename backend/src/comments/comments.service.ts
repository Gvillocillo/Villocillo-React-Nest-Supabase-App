import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { SupabaseService } from '../supabase/supabase.service';

/**
 * Comments Service
 * Handles business logic for guest book comments
 * Communicates with Supabase database
 */
@Injectable()
export class CommentsService {
  private supabase = SupabaseService.getClient();

  /**
   * Create a new comment in the guest book
   * @param createCommentDto - Comment data (name and message)
   * @returns The newly created comment
   */
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const { data, error } = await this.supabase
        .from('comments')
        .insert([
          {
            name: createCommentDto.name,
            message: createCommentDto.message,
          },
        ])
        .select()
        .single();

      if (error) {
        throw new InternalServerErrorException(
          `Failed to create comment: ${error.message}`,
        );
      }

      return data;
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the comment',
      );
    }
  }

  /**
   * Fetch all comments from the guest book
   * Returns comments sorted by newest first
   * @returns Array of all comments
   */
  async findAll(): Promise<Comment[]> {
    try {
      const { data, error } = await this.supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new InternalServerErrorException(
          `Failed to fetch comments: ${error.message}`,
        );
      }

      return data || [];
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while fetching comments',
      );
    }
  }
}
