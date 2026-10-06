'use client'
import React, { useState } from 'react';
import { CreditCard, QrCode, ShieldCheck, Lock } from 'lucide-react';
import CartAmount from '@/components/ui/client/cartamount';
import { useCartStore } from '../store/CommonStore';
import UpiPayment from '@/components/ui/client/UPIPayment';
import { useRouter } from 'next/navigation';
export default function PaymentPage() {
    const cartAmount = useCartStore((state) => state.getCartAmount());
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [upiId, setUpiId] = useState('');
    const [cardData, setCardData] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: '',
    });
    const router = useRouter();

    const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardData({ ...cardData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        alert(`Payment processed successfully via ${paymentMethod.toUpperCase()}!`);
    };

    const handlePaymentSuccess = () => {
        console.log("Success callback triggered!");
        // Redirect customer to your success layout confirmation path
        router.push(`/api/payment/success?orderId=${orderDetails.orderId}`);
    };

    const handlePaymentFailure = () => {
        console.log("Failure callback triggered.");
        // Route customer to an explicit failed checkout warning screen
        router.push('/payment/failed');
    };

    const orderDetails = {
        orderId: "ORD" + Math.floor(Math.random() * 900000 + 100000), // Unique order reference ID
        amount: 299.00, // ₹299.00
        merchantVpa: "7871100014@apl", // Your registered business virtual payment address
        merchantName: "basith_test" // Your official trading name
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-slate-100">

                {/* Order Summary / Left Panel */}
                <div className="md:col-span-5 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center space-x-2 text-indigo-400 mb-6">
                            <ShieldCheck className="w-6 h-6" />
                            <span className="font-semibold text-sm tracking-wider uppercase">Secure Checkout</span>
                        </div>
                        {/* <h2 className="text-xl font-bold mb-1">Order Summary</h2>             */}

                        <CartAmount amount={cartAmount}></CartAmount>
                    </div>

                    <div className="mt-8 flex items-center space-x-2 text-xs text-slate-400">
                        <Lock className="w-4 h-4 text-emerald-400" />
                        <span>256-bit SSL Bank-grade Encryption</span>
                    </div>
                </div>

                {/* Payment Form / Right Panel */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Select Payment Method</h2>

                        {/* Tabs for Payment Methods */}
                        <div className="grid grid-cols-3 gap-2 mb-6">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('card')}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all ${paymentMethod === 'card'
                                        ? ' border-[#071b4b]'
                                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                                    }`}
                            >
                                <CreditCard className="w-5 h-5 mb-1.5" />
                                Credit / Debit Card
                            </button>

                            <button
                                type="button"
                                onClick={() => setPaymentMethod('upi')}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all ${paymentMethod === 'upi'
                                        ? 'border-[#071b4b]'
                                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                                    }`}
                            >
                                <QrCode className="w-5 h-5 mb-1.5" />
                                UPI ID / QR
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {paymentMethod === 'card' && (
                                <>
                                    <div>
                                        <label className="block font-semibold font-bluefamily-def-H12 uppercase mb-1">Card Number</label>
                                        <input
                                            type="text"
                                            name="number"
                                            placeholder="4111 2222 3333 4444"
                                            value={cardData.number}
                                            onChange={handleCardChange}
                                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-semibold font-bluefamily-def-H12 uppercase mb-1">Cardholder Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="John Doe"
                                            value={cardData.name}
                                            onChange={handleCardChange}
                                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block font-semibold font-bluefamily-def-H12  uppercase mb-1">Expiry Date</label>
                                            <input
                                                type="text"
                                                name="expiry"
                                                placeholder="MM/YY"
                                                value={cardData.expiry}
                                                onChange={handleCardChange}
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-semibold font-bluefamily-def-H12 uppercase mb-1">CVV</label>
                                            <input
                                                type="password"
                                                name="cvv"
                                                placeholder="123"
                                                maxLength={4}
                                                value={cardData.cvv}
                                                onChange={handleCardChange}
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                                                required
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {paymentMethod === 'upi' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block font-semibold font-bluefamily-def-H12 uppercase mb-1">Enter UPI ID</label>
                                        <input
                                            type="text"
                                            placeholder="username@okhdfcbank or phone@paytm"
                                            value={upiId}
                                            onChange={(e) => setUpiId(e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                                        <QrCode className="w-24 h-24 text-slate-700 mb-2" />
                                        <span className="text-xs text-slate-500 font-medium">Or scan QR code using any UPI app</span>
                                    </div>
                                </div>
                            )}

                            {/* <button
                type="submit"
                className="w-full mt-6 blue-def font-whitefamily-def-H12 font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition-all text-sm"
              >
                Pay ₹ {cartAmount}
              </button> */}
                            <UpiPayment
                                orderId={orderDetails.orderId}
                                amount={orderDetails.amount}
                                merchantVpa={orderDetails.merchantVpa}
                                merchantName={orderDetails.merchantName}
                                onSuccess={handlePaymentSuccess}
                                onFailure={handlePaymentFailure}
                            />

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
