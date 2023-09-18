import {
  Column as Col,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Card } from '../../cards/entities/card.entity.js';
import { User } from '../../users/entities/user.entity.js';

const tableName = 'comments';

@Entity({ name: tableName })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Col({ name: 'card_id', type: 'uuid' })
  cardId!: string;

  @Col({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Col({ type: 'varchar' })
  comment!: string;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: Relation<User>;

  @ManyToOne(() => Card, (card) => card.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'card_id' })
  card!: Relation<Card>;
}
