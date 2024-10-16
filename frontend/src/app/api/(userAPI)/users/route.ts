import { NextResponse } from 'next/server';
import { UserController } from '@/controller/userAPI/userController';

const userController = new UserController();

export async function GET(): Promise<NextResponse> {
    return userController.getUsers();
}