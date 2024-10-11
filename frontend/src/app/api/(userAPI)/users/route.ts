import { NextResponse } from 'next/server';
import { UserController } from '@/apiController/userAPI/userController';

const userController = new UserController();

export async function GET(): Promise<NextResponse> {
    return userController.getUsers();
}