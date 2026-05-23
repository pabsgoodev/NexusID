import { ProductService } from "../services/productService";
import { Request, Response } from "express";
import z from 'zod';

const productSchema = z.object({
    name: z.string().max(100),
    price: z.number().positive(),
    description: z.string().max(255),
    phone: z.string().max(14).min(14).regex(/^\d{2}\d{5}\d{4}$/), // Formato: 11987654321
});

export class ProductController {
    private productService = new ProductService();

    async list(req: Request, res: Response) {
        const [data, error] = await this.productService.listAll();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json(data);
    }

    async create(req: Request, res: Response) {
        const parsed = productSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({ error: 'Invalid input', details: parsed.error.format() });
        }

        const [data, error] = await this.productService.create(parsed.data);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(201).json(data);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const parsed = productSchema.partial().safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        const [data, error] = await this.productService.update(Number(id), parsed.data);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json(data);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const [data, error] = await this.productService.delete(Number(id));

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ success: data });
    }
}