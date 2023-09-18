import {
  Column as Col,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Column } from '../../columns/entities/column.entity.js';
import { Card } from '../../cards/entities/card.entity.js';
import { Comment } from '../../comments/entities/comment.entity.js';

const tableName = 'users';

@Entity({ name: tableName })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Col({ type: 'varchar' })
  email!: string;

  @Col({ type: 'varchar' })
  password!: string;

  @OneToMany(() => Card, (card) => card.user)
  cards!: Relation<Card[]>;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Relation<Comment[]>;

  @OneToMany(() => Column, (column) => column.user)
  columns!: Relation<Column[]>;
}
