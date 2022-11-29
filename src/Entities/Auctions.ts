import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class Auctions extends BaseEntity {
  @PrimaryColumn()
  uuid!: string;

  @Column()
  auctioneer!: string;

  @Column()
  profile_id!: string;

  @Column({ type: "bigint" })
  start!: string;

  @Column({ type: "bigint" })
  end!: string;

  @Column()
  item_name!: string;

  @Column({ nullable: true })
  stripped_item_name!: string;

  @Column()
  category!: string;

  @Column()
  tier!: string;

  @Column({ type: "bigint" })
  starting_bid!: number;

  @Column()
  claimed!: boolean;

  @Column({ type: "bigint" })
  highest_bid_amount!: number;

  @Column()
  bin!: boolean;

  @Column({ type: "bigint", nullable: true })
  updated_at!: number;

  @Column({ nullable: true })
  stars!: number;

  @Column({ nullable: true })
  level!: number;

  @Column({ nullable: true, type: "bigint" })
  estimated_profit!: number;

  @Column({ nullable: true, type: "bigint" })
  lowest_bin!: number;

  @Column({ nullable: true })
  scanned_auctions!: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at!: Date;
}
