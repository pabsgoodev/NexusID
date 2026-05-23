import 'dotenv/config';

import { Product } from '../entitys/productEntity';
import { AppDataSource } from '../database/connection';

export class ProductService {
    private repository = AppDataSource.getRepository(Product);

    async listAll() {
        return await this.repository.find({
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async create(data: Partial<Product>): Promise<Product> {
        const newProduct = this.repository.create(data);
        return await this.repository.save(newProduct);
    }

    async update(id: number, data: Partial<Product>): Promise<Product | null> {
        const product = await this.repository.findOneBy({ id });

        if (!product) {
            return null;
        }

        this.repository.merge(product, data);
        return await this.repository.save(product);
    }
    
    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }

}