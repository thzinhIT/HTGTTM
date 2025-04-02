const ModelCart = require('../../model/ModelCart');
const ModelPaymentSuccess = require('../../model/ModelPaymentSuccess');
const { jwtDecode } = require('jwt-decode');

const { VNPay, ignoreLogger, ProductCode, VnpLocale } = require('vnpay');

class ControllerPayments {
    async PaymentsMomo(req, res) {
        const token = req.cookies;
        const decoded = jwtDecode(token.Token);
        const email = decoded.email;
        ModelCart.findOne({ email: email }).then((dataCart) => {
            if (dataCart) {
                const vnpay = new VNPay({
                    tmnCode: 'DH2F13SW',
                    secureSecret: 'NXZM3DWFR0LC4R5VBK85OJZS1UE9KI6F',
                    vnpayHost: 'https://sandbox.vnpayment.vn',
                    testMode: true, // tùy chọn
                    hashAlgorithm: 'SHA512', // tùy chọn
                    enableLog: true, // tùy chọn
                    loggerFn: ignoreLogger, // tùy chọn
                });
                const paymentUrl = vnpay.buildPaymentUrl({
                    vnp_Amount: dataCart.sumPrice,
                    vnp_IpAddr: '13.160.92.202',
                    vnp_TxnRef: dataCart._id,
                    vnp_OrderInfo: `Thanh toan don hang ${dataCart._id}`,
                    vnp_OrderType: ProductCode.Other,
                    vnp_ReturnUrl: 'http://localhost:5000/vnpay-return',
                    vnp_Locale: VnpLocale.VN,
                });
                return res.status(200).json(paymentUrl);
            }
        });
    }

    async checkData(req, res, next) {
        if (req.query.vnp_ResponseCode === '00') {
            const token = req.cookies;
            const decoded = jwtDecode(token.Token);
            if (!token || !token.Token) {
                return res.status(403).json({ message: 'Bạn Cần Đăng Nhập Lại !!!' });
            }

            if (!decoded.email) {
                return res.status(403).json({ message: 'Bạn Cần Đăng Nhập Lại !!!' });
            }

            const dataCart = await ModelCart.findOne({ email: decoded.email });
            if (!dataCart) {
                return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
            }

            const lastPayment = await ModelPaymentSuccess.findOne({ email: decoded.email }).sort({ id: -1 });
            const newProductId = lastPayment && lastPayment.id !== undefined ? lastPayment.id + 1 : 0;

            ModelCart.findOne({ email: decoded.email }).then(async (dataCart) => {
                if (dataCart) {
                    const newDataSuccess = new ModelPaymentSuccess({
                        id: newProductId,
                        email: decoded.email,
                        products: dataCart.products.map((item) => ({
                            nameProduct: item.nameProduct,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                        sumPrice: dataCart.sumPrice,
                        statusPayment: true,
                        statusOrder: false,
                        idCode: req.query.vnp_TxnRef,
                    });
                    await newDataSuccess.save();
                    dataCart.deleteOne({ _id: dataCart._id }).then((data) => {
                        return res.status(200).json({ message: 'Thanh toan thanh cong !!!' });
                    });
                }
            });
        }
    }

    async GetProductsSuccess(req, res) {
        const token = req.cookies;
        const decoded = jwtDecode(token.Token);
        ModelPaymentSuccess.findOne({ email: decoded.email })
            .sort({ id: 'desc' })
            .exec()
            .then((data) => {
                return res.status(200).json([[data]]);
            });
    }
    async Payments(req, res) {
        try {
            const token = req.cookies;
            if (!token || !token.Token) {
                return res.status(403).json({ message: 'Bạn Cần Đăng Nhập Lại !!!' });
            }

            const decoded = jwtDecode(token.Token);
            if (!decoded.email) {
                return res.status(403).json({ message: 'Bạn Cần Đăng Nhập Lại !!!' });
            }

            const dataCart = await ModelCart.findOne({ email: decoded.email });
            if (!dataCart) {
                return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
            }

            const lastPayment = await ModelPaymentSuccess.findOne({ email: decoded.email }).sort({ id: -1 });
            const newProductId = lastPayment && lastPayment.id !== undefined ? lastPayment.id + 1 : 0;

            const newDataSuccess = new ModelPaymentSuccess({
                id: newProductId,
                email: decoded.email,
                products: dataCart.products.map((item) => ({
                    nameProduct: item.nameProduct,
                    quantity: item.quantity,
                    price: item.price,
                })),
                sumPrice: dataCart.sumPrice,
            });

            await newDataSuccess.save();
            await dataCart.deleteOne({ _id: dataCart._id });

            return res.status(200).json({ message: 'Payment successful', dataCart });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
        }
    }

    async GetOrderUser(req, res) {
        ModelPaymentSuccess.find({}).then((data) => {
            return res.status(200).json(data);
        });
    }
}

module.exports = new ControllerPayments();
