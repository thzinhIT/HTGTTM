// src/app/api/auth/create-payment/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";
import { console } from "inspector";

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, orderInfo = "pay with MoMo", userId, id, soLuong } = body;

    const partnerCode = process.env.MOMO_PARTNER_CODE || "MOMO";
    const accessKey = process.env.MOMO_ACCESS_KEY || "F8BBA842ECF85";
    const secretkey =
      process.env.MOMO_SECRET_KEY || "K951B6PE1waDMi640xX08PD3vg6EkVlz";

    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;

    const redirectUrl = "http://localhost:3000/payment-success";
    const ipnUrl = "http://localhost:3000/api/auth/momo-callBack";

    const requestType = "captureWallet";
    const extraData = Buffer.from(
      JSON.stringify({ userId, id, soLuong })
    ).toString("base64");

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto
      .createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
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
      lang: "en",
    };

    const momoResponse = await fetch(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    const momoData = await momoResponse.json();
    console.log("Momo response:", momoData);

    return NextResponse.json({ payUrl: momoData.payUrl });
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { message: "Error creating payment" },
      { status: 500 }
    );
  }
}
