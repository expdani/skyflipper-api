import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

type inventoryType = {
  items?: [{ id?: string; amount?: number }];
};

@Entity()
export class Inventory extends BaseEntity {
  @PrimaryColumn()
  user_id!: string;

  @Column("simple-json", { default: "[]" })
  inventory!: inventoryType | undefined;

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
