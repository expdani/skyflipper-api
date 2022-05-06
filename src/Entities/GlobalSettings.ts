import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

type botSettings = {
  settings?: {
    random_event?: {
      enabled?: boolean;
      percent_change_per_message?: number;
    };
  };
};

@Entity()
export class GlobalSettings extends BaseEntity {
  @PrimaryColumn({ name: "name" })
  name!: string;

  @Column("simple-json")
  settings!: botSettings;

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
