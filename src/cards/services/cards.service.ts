import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Card } from '../entities/card.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCardDto } from '../dto/update-card.dto.js';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  //-------------------------------------------------------------------
  public async findOneFor(options: Partial<Card>): Promise<Card> {
    const card = await this.cardRepository.findOne({ where: options });

    if (!card) {
      throw new NotFoundException('🚨 card not found!');
    }

    return card;
  }

  //-------------------------------------------------------------------
  public async update(cardId: string, body: UpdateCardDto): Promise<Card> {
    const card = await this.findOneFor({ id: cardId });

    return this.cardRepository.save({
      id: card.id,
      ...body,
    });
  }

  //-------------------------------------------------------------------
  public async delete(cardId: string): Promise<void> {
    try {
      await this.cardRepository.delete({ id: cardId });
    } catch (error: any) {
      throw new InternalServerErrorException('🚨 failed to delete card!');
    }
  }
}
