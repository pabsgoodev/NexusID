import 'dotenv/config';
import { Product } from '../entitys/productEntity';
import { AppDataSource } from '../database/connection';

type Result<T, E = Error> = readonly [T, null] | readonly [null, E];

export class ProductService {
    private repository = AppDataSource.getRepository(Product);

    async listAll(): Promise<Result<Product[]>> {
        try {
            const products = await this.repository.find({
                order: { createdAt: 'DESC' }
            });
            return [products, null] as const;
        } catch (error) {
            return [null, error as Error] as const;
        }
    }

    async create(data: Partial<Product>): Promise<Result<Product>> {
        try {
            const newProduct = this.repository.create(data);
            const savedProduct = await this.repository.save(newProduct);
            return [savedProduct, null] as const;
        } catch (error) {
            return [null, error as Error] as const;
        }
    }

    async update(id: number, data: Partial<Product>): Promise<Result<Product>> {
        try {
            const product = await this.repository.findOneBy({ id });

            if (!product) {
                return [null, new Error('Product not found')] as const;
            }

            this.repository.merge(product, data);
            const updatedProduct = await this.repository.save(product);
            return [updatedProduct, null] as const;
        } catch (error) {
            return [null, error as Error] as const;
        }
    }
    
    async delete(id: number): Promise<Result<boolean>> {
        try {
            const result = await this.repository.delete(id);
            
            if (result.affected === 0) {
                return [null, new Error('Product not found or already deleted')] as const;
            }

            return [true, null] as const;
        } catch (error) {
            return [null, error as Error] as const;
        }
    }
}