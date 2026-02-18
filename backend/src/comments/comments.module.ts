import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

/**
 * Comments Module
 * Encapsulates all guest book comment-related functionality
 */
@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
