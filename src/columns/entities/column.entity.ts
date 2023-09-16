import {
  Entity,
  PrimaryGeneratedColumn,
  Column as Col,
  ManyToOne,
  Relation,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import { Card } from '../../cards/entities/card.entity.js';

const tableName = 'columns';

@Entity({ name: tableName })
export class Column {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Col({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Col({ type: 'varchar' })
  name!: string;

  @OneToMany(() => Card, (card) => card.column)
  cards!: Relation<Card[]>;

  @ManyToOne(() => User, (user) => user.columns, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: Relation<User>;
}
