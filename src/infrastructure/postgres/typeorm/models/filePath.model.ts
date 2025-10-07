import { FilePath } from '../../../../core/domain/file';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';


interface creationData {
    accountId: string;
    path: string;
    originalName: string;
    mimeType: string;
}

@Entity({ name: 'file-path'})
export class FilePathModel extends BaseEntity implements FilePath  {
  
  constructor(data? : creationData) {
    super();
    if (data) {
      this.accountId = data.accountId;
      this.path = data.path;
      this.mimeType = data.mimeType;
      this.originalName = data.originalName;
    }
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "uuid",
    nullable: false,
  })
  accountId: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  path: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  originalName: string;
  
  @Column({
    type: 'varchar',
    nullable: false,
  })
  mimeType: string;


  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
