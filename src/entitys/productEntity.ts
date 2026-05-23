import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn 
} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 }) 
    name!: string;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 }) 
    price!: number;

    @Column({ type: "text", nullable: true })
    description!: string;

    @Column({ type: 'text', nullable: true })
    phone!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}