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
}
