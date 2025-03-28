import authMiddleware from '../middleware/authMiddleware';

export default function handler(req, res) {
    authMiddleware(req, res, () => {
        res.status(200).json({ message: 'Bạn đã truy cập API được bảo vệ!', user: req.user });
    });
}
