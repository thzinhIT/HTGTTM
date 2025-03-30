// pages/api/hello.js

export default function handler(req, res) {
    if (req.method === "GET") {
      res.status(200).json({ message: "Xin chào từ Next.js!" });
    } else {
      res.status(405).json({ message: "Phương thức không được hỗ trợ!" });
    }
  }
  