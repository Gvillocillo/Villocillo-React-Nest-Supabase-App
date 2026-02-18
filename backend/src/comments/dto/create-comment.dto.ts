import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Data Transfer Object for creating a new comment
 * Validates user input before saving to database
 */
export class CreateCommentDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @IsNotEmpty({ message: 'Message is required' })
  @IsString({ message: 'Message must be a string' })
  @MaxLength(500, { message: 'Message must not exceed 500 characters' })
  message: string;
}
