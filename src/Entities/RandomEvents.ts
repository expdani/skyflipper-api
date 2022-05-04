import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export type RewardType = {
  rewards?: {
    wallet?: number;
    bank?: number;
    items?: [{ name: string; amount: number }];
  };
};

@Entity()
export class RandomEvents extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: "reply" })
  type!: string;

  @Column()
  name!: string;

  @Column("text")
  text!: string;

  @Column("text")
  answer!: string;

  @Column("text")
  successText!: string;

  @Column("text")
  failText!: string;

  @Column("simple-json")
  rewards!: RewardType;

  @Column({ default: 60 })
  timeLimit!: number;

  @Column({ default: 1 })
  rarity!: 1;

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
