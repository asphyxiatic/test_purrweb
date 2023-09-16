import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';

const tableName = 'users';

@Entity({ name: tableName })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar' })
  password!: string;
}
