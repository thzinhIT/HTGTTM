import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const users = [
    { email: 'admin@example.com', password: '123456' }, // Tài khoản cố định để test
    { email: 'user@example.com', password: 'password' }
];

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Vui lòng nhập email và mật khẩu' }, { status: 400 });
        }

        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return NextResponse.json({ message: 'Sai email hoặc mật khẩu' }, { status: 401 });
        }

        // Tạo token JWT
        const token = jwt.sign(
            { email: user.email },
            'test_secret_key', // Chỉ là key test, không cần lưu vào .env
            { expiresIn: '1h' }
        );

        return NextResponse.json({ message: 'Đăng nhập thành công', token }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Lỗi server' }, { status: 500 });
    }
}
