import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tip {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @Column()
  likes: number;

  @Column()
  active: boolean;

  @Column({ type: 'date', nullable: true, default: null })
  showed_in_date: Date | null;
}
