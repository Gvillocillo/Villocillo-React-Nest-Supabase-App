import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

/**
 * Comments Controller
 * Handles HTTP requests for guest book comments
 */
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  /**
   * POST /comments
   * Create a new guest book comment
   * @param createCommentDto - Comment data from request body
   * @returns The newly created comment
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return await this.commentsService.create(createCommentDto);
  }

  /**
   * GET /comments
   * Fetch all guest book comments
   * @returns Array of all comments (newest first)
   */
  @Get()
  async findAll(): Promise<Comment[]> {
    return await this.commentsService.findAll();
  }
}
