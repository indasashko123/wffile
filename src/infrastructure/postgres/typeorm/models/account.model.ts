import { Account } from '../../../../core/domain/auth';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';


interface creationData {
  login: string;
  password: string;
}

@Entity({ name: 'accounts'})
export class AccountModel extends BaseEntity implements Account  {
  
  constructor(data? : creationData) {
    super();
    if (data) {
      this.login = data.login;
      this.password = data.password;
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  login: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
