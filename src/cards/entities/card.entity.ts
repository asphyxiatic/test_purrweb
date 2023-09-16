import {
  Column as Col,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Column } from '../../columns/entities/column.entity.js';
import { Comment } from '../../comments/entities/comment.entity.js';

const tableName = 'cards';

@Entity({ name: tableName })
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Col({ name: 'column_id', type: 'uuid' })
  columnId!: string;

  @Col({ type: 'varchar' })
  name!: string;

  @Col({ type: 'varchar', nullable: true })
  description?: string | null;

  @OneToMany(() => Comment, (comment) => comment.card)
  comments!: Relation<Comment[]>;

  @ManyToOne(() => Column, (column) => column.cards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'column_id' })
  column!: Relation<Column>;
}
