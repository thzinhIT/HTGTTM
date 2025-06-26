import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { amount, orderId } = req.body;

  const partnerCode = process.env.MOMO_PARTNER_CODE;
  const accessKey = process.env.MOMO_ACCESS_KEY;
  const secretKey = process.env.MOMO_SECRET_KEY;
  const requestId = String(Date.now());
  const orderInfo = "Thanh toán đơn hàng test";
  const redirectUrl = "http://localhost:3000/payment-success";
  const ipnUrl = "http://localhost:3000/api/momo_callback";
  const requestType = "captureWallet";
  const extraData = "";

  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const body = JSON.stringify({
    partnerCode,
    accessKey,
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    extraData,
    requestType,
    signature,
    lang: "vi",
  });

  try {
    const response = await fetch(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }
    );

    const result = await response.json();

    return res.status(200).json({ payUrl: result.payUrl });
  } catch (error) {
    return res.status(500).json({ message: "Error processing payment" });
  }
}




export default function handler(req, res) {
    if (req.method === 'POST') {
        console.log('Momo callback: ', req.body);

        // Tại đây bạn có thể lưu trạng thái thanh toán vào database nếu cần

        res.status(200).send('Received');
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }}