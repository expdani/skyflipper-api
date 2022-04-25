import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class KarmaPosts extends BaseEntity {
  @PrimaryColumn({ name: "server_id" })
  server_id!: string;

  @PrimaryColumn({ name: "user_id" })
  user_id!: string;

  @PrimaryColumn({ name: "message_id" })
  message_id!: string;

  @PrimaryColumn({ name: "author_id" })
  author_id!: string;

  @Column()
  vote!: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at!: Date;
}
