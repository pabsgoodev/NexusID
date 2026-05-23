import 'dotenv/config';

import { User } from '../entitys/userEntity';
import { AppDataSource } from '../database/connection';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

type Result<T, E> = readonly [T, null] | readonly [null, E];

export class UserService {

    private userRepository = AppDataSource.getRepository(User);

    async exeRegister(
        username: string,
        password: string,
        req: Request,
        res: Response
    ): Promise<Result<{ user: { id: number; username: string }, x: string }, Error>> {

        try {

            const userExists = await this.userRepository.findOne({
                where: { username }
            });

            if (userExists) {
                return [null, new Error('Username already exists')];
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = this.userRepository.create({
                username,
                password: hashedPassword
            });

            await this.userRepository.save(user);

            const secret = process.env.JWT_SECRET as string;

            if (!secret) {
                return [null, new Error('JWT_SECRET not found')];
            }

            const token = jwt.sign(
                { userId: user.id },
                secret,
                { expiresIn: '1h' }
            );
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });

                const x = 'Success';
            return [
                {
                    user: {
                        id: user.id,
                        username: user.username
                    },
                    x
                },
                null
            ];

        } catch (error) {

            console.error(error);

            return [null, new Error('Internal server error')];
        }
    }

    async exeLogin(
        username: string,
        password: string,
        req: Request,
        res: Response
    ): Promise<Result<{ user: { id: number; username: string }, x: string }, Error>> {
        try {
            const user = await this.userRepository.findOne({
                where: { username },
                select: ['id', 'username', 'password']
            });

            if (!user) {
                return [null, new Error('Invalid username or password')];
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return [null, new Error('Invalid username or password')];
            }

            const secret = process.env.JWT_SECRET as string;
            if (!secret) {
                return [null, new Error('JWT_SECRET not found')];
            }

            const token = jwt.sign(
                { userId: user.id },
                secret,
                { expiresIn: '1h' }
            );

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });
            const x = 'Success';
            return [
                {
                    user: {
                        id: user.id,
                        username: user.username
                    },
                    x
                },
                null
            ];

        } catch (error) {

            return [null, new Error('Internal server error')];
        }
    }

    async getMe(req: Request & { session?: { userId?: number }}): Promise<Result<{ id: number; username: string }, Error>>{
        const userId = req.session?.userId;

        if (!userId) {
            return [null, new Error('User not authenticated')];
        }

        try {
            const user = await this.userRepository.findOne({
                where: { id: userId },
                select: ['id', 'username']
            });

            if (!user) {
                return [null, new Error('User not found')];
            }

            return [
                {
                    id: user.id,
                    username: user.username
                },
                null
            ];
        } catch (error) {
            return [null, new Error('Internal server error')];
        }
    }
}