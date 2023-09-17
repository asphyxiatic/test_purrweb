import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCommentDto } from '../dto/update-comment.dto.js';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  //-----------------------------------------------------------------------
  public async findOneFor(options: Partial<Comment>): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({ where: options });

    if (!comment) {
      throw new NotFoundException('🚨 column not found!');
    }

    return comment;
  }

  //-----------------------------------------------------------------------
  public async update(
    commentId: string,
    body: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.findOneFor({ id: commentId });

    return this.commentsRepository.save({
      id: comment.id,
      ...body,
    });
  }

  //-------------------------------------------------------------------
  public async delete(commentId: string): Promise<void> {
    try {
      await this.commentsRepository.delete({ id: commentId });
    } catch (error: any) {
      throw new InternalServerErrorException('🚨 failed to delete comment!');
    }
  }
}
