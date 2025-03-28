import jwt from 'jsonwebtoken';

const users = [
    { email: 'admin@example.com', password: '123456' }, // Tài khoản cố định
    { email: 'user@example.com', password: 'password' }
];

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu' });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Sai email hoặc mật khẩu' });
    }

    const token = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Đăng nhập thành công', token });
}
