import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Không có token, từ chối truy cập' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token không hợp lệ' });
    }
}
