import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn 
} from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar" }) 
    username!: string;

    @Column({ type: "varchar", select: false }) 
    password!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}