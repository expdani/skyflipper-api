import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Items extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column("text")
  description: string | undefined;

  @Column("double", { default: 0 })
  price: number | undefined;

  @Column("text")
  emoji: string | undefined;

  @Column({ default: false })
  shop!: boolean;
}
