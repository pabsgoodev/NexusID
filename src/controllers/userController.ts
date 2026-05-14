import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import z from 'zod';

export class UserController {

    private userService = new UserService();

    async register(req: Request, res: Response) {
        const schema = z.object({
            username: z.string().min(3).max(70),
            password: z.string().min(6).max(70)
        });

        try {
           const parsed = schema.safeParse(req.body);

           if (!parsed.success) {
                return res.status(400).json({ error: 'Invalid input'});
           }

           const { username, password } = parsed.data;

           const [data, error] = await this.userService.exeRegister(username, password);
           if (error){
            return res.status(400).json({ error: error.message})
           }
           return res.json(data)

        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async login(req: Request, res: Response){
        const schema = z.object({
            username: z.string().min(3).max(70),
            password: z.string().min(3).max(70)
        })

        try {
            const parsed = schema.safeParse(req.body)
            if(!parsed.success){
                return res.status(400).json({ error: 'Invalid input'});
            }

            const {username, password} = parsed.data;
            const [data, error] = await this.userService.exeLogin(username, password)
            if (error){
                return res.status(400).json({ error: error.message})
            }
            return res.json(data)

        } catch (error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    
}