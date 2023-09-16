import {
  Column as Col,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Card } from '../../cards/entities/card.entity.js';

const tableName = 'comments';

@Entity({ name: tableName })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Col({ name: 'card_id', type: 'uuid' })
  cardId!: string;

  @Col({ type: 'varchar' })
  comment!: string;

  @ManyToOne(() => Card, (card) => card.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'card_id' })
  card!: Relation<Card>;
}
