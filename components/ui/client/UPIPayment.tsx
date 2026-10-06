'use client';

import React, { useEffect, useState, useRef } from 'react';
import { PaymentStatus, PaymentCheckResponse, UpiParams } from '@/types/UPI';

interface UpiPaymentProps {
  orderId?: string;
  amount?: number;
  merchantVpa?: string;
  merchantName?: string;
  onSuccess: () => void;
  onFailure: () => void;
}

export default function UpiPayment({
  orderId,
  amount,
  merchantVpa,
  merchantName,
  onSuccess,
  onFailure
}: UpiPaymentProps) {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('PENDING');
  const [upiUrl, setUpiUrl] = useState<string>('');
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Construct the secure UPI String
  useEffect(() => {
    const params: UpiParams = {
      pa: merchantVpa,
      pn: merchantName,
      tr: orderId,
      am: amount.toFixed(2),
      cu: 'INR',
      tn: `Payment for Order ${orderId}`
    };

    const queryString = new URLSearchParams(params as unknown as Record<string, string>).toString();
    setUpiUrl(`upi://pay?${queryString}`);
  }, [orderId, amount, merchantVpa, merchantName]);

  // 2. Start checking the server for updates (Long-Polling)
  useEffect(() => {
    if (paymentStatus === 'PENDING') {
      pollingRef.current = setInterval(async () => {
        try {
          const res = await fetch(`/EShoppe/api/payment/status?orderId=${orderId}`);
          if (res.ok) {
            const data: PaymentCheckResponse = await res.json();
            
            if (data.status === 'SUCCESS') {
              setPaymentStatus('SUCCESS');
              clearInterval(pollingRef.current!);
              onSuccess();
            } else if (data.status === 'FAILED') {
              setPaymentStatus('FAILED');
              clearInterval(pollingRef.current!);
              onFailure();
            }
          }
        } catch (err) {
          console.error('Error polling payment status:', err);
        }
      }, 3000); // Check your server status every 3 seconds
    }

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [paymentStatus, orderId, onSuccess, onFailure]);

  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-sm bg-white max-w-sm mx-auto">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Pay via UPI</h3>
      <p className="text-xl font-semibold text-emerald-600 mb-4">₹{amount.toFixed(2)}</p>

      {paymentStatus === 'PENDING' && (
        <div className="w-full text-center space-y-4">
          {/* Action button visible/clickable primarily on Mobile Devices */}
          <a
            href={upiUrl}
            className="block w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition text-center"
          >
            Open UPI App (GPay/PhonePe)
          </a>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 pt-2">
            <span className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></span>
            <span>Awaiting application verification response...</span>
          </div>
        </div>
      )}

      {paymentStatus === 'SUCCESS' && (
        <div className="text-center text-emerald-600 font-medium py-2">
          🎉 Payment Secured Successfully!
        </div>
      )}

      {paymentStatus === 'FAILED' && (
        <div className="text-center text-rose-600 font-medium py-2">
          ❌ Payment Transaction Failed.
        </div>
      )}
    </div>
  );
}
