import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
