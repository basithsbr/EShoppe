'use client'
import React, { useState } from 'react';

export default function PaymentPage() {
    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
    });

    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Mock order details
    const orderSummary = {
        item: "Premium Subscription Plan",
        price: 49.99,
        tax: 4.00,
        total: 53.99,
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Simple formatting helper logic
        let formattedValue = value;
        if (name === 'cardNumber') {
            formattedValue = value.replace(/\s?/g, '').replace(/(\d{4})/g, '\$1 ').trim().slice(0, 19);
        } else if (name === 'expiry') {
            formattedValue = value.replace(/\//g, '').replace(/(\d{2})/g, '\$1/').trim().slice(0, 5);
            if (formattedValue.endsWith('/')) formattedValue = formattedValue.slice(0, -1);
        } else if (name === 'cvv') {
            formattedValue = value.replace(/\D/g, '').slice(0, 3);
        }

        setFormData({ ...formData, [name]: formattedValue });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
        if (formData.cardNumber.replace(/\s/g, '').length !== 16) newErrors.cardNumber = 'Card number must be 16 digits';
        if (!/^\d{2}\/\d{2}\$/.test(formData.expiry)) newErrors.expiry = 'Expiration format must be MM/YY';
        if (formData.cvv.length !== 3) newErrors.cvv = 'CVV must be 3 digits';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsProcessing(true);

        // Simulate API request to a payment processor backend (e.g., Stripe, PayPal)
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);
        }, 2000);
    };

    if (paymentSuccess) {
        return (
            <div style={styles.successContainer}>
                <div style={styles.successCard}>
                    <span style={styles.successIcon}>✅</span>
                    <h2 style={{ margin: '10px 0' }}>Payment Successful!</h2>
                    <p style={{ color: '#666' }}>Thank you for your purchase. A receipt has been sent to your email.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.layoutGrid}>

                {/* Left Column: Payment Form */}
                <div style={styles.card}>
                    <h2 style={styles.title}>Secure Checkout</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Name on Card</label>
                            <input
                                type="text"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleInputChange}
                                placeholder="Jane Doe"
                                style={{ ...styles.input, borderColor: errors.cardName ? '#dc3545' : '#ccc' }}
                            />
                            {errors.cardName && <span style={styles.errorText}>{errors.cardName}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Card Number</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                placeholder="0000 0000 0000 0000"
                                style={{ ...styles.input, borderColor: errors.cardNumber ? '#dc3545' : '#ccc' }}
                            />
                            {errors.cardNumber && <span style={styles.errorText}>{errors.cardNumber}</span>}
                        </div>

                        <div style={styles.row}>
                            <div style={{ ...styles.formGroup, flex: 1, marginRight: '10px' }}>
                                <label style={styles.label}>Expiration Date</label>
                                <input
                                    type="text"
                                    name="expiry"
                                    value={formData.expiry}
                                    onChange={handleInputChange}
                                    placeholder="MM/YY"
                                    style={{ ...styles.input, borderColor: errors.expiry ? '#dc3545' : '#ccc' }}
                                />
                                {errors.expiry && <span style={styles.errorText}>{errors.expiry}</span>}
                            </div>

                            <div style={{ ...styles.formGroup, flex: 1 }}>
                                <label style={styles.label}>CVV</label>
                                <input
                                    type="password"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    placeholder="123"
                                    style={{ ...styles.input, borderColor: errors.cvv ? '#dc3545' : '#ccc' }}
                                />
                                {errors.cvv && <span style={styles.errorText}>{errors.cvv}</span>}
                            </div>
                        </div>

                        <button type="submit" disabled={isProcessing} style={styles.payButton}>
                            {isProcessing ? 'Processing Payment...' : `Pay $${orderSummary.total}`}
                        </button>
                    </form>
                </div>

                {/* Right Column: Order Summary */}
                <div style={{ ...styles.card, backgroundColor: '#f9f9f9' }}>
                    <h2 style={styles.title}>Order Summary</h2>
                    <div style={styles.summaryRow}>
                        <span>{orderSummary.item}</span>
                        <span>\${orderSummary.price.toFixed(2)}</span>
                    </div>
                    <div style={styles.summaryRow}>
                        <span>Estimated Tax</span>
                        <span>\${orderSummary.tax.toFixed(2)}</span>
                    </div>
                    <hr style={styles.divider} />
                    <div style={{ ...styles.summaryRow, fontWeight: 'bold', fontSize: '18px' }}>
                        <span>Total Due:</span>
                        <span>\${orderSummary.total.toFixed(2)}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Inline CSS Styles for absolute simplicity & standalone usage
const styles = {
    container: { maxWidth: '1000px', margin: '40px auto', padding: '0 20px', fontFamily: 'system-ui, sans-serif' },
    layoutGrid: { display: 'flex', gap: '30px', flexWrap: 'wrap' },
    card: { flex: '1 1 400px', padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
    title: { fontSize: '22px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' },
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px', color: '#333' },
    input: { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' },
    row: { display: 'flex', justifyContent: 'space-between' },
    payButton: { width: '100%', padding: '12px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', transition: 'background-color 0.2s' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#555' },
    divider: { border: '0', borderTop: '1px solid #ddd', margin: '15px 0' },
    errorText: { color: '#dc3545', fontSize: '12px', marginTop: '4px', display: 'block' },
    successContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', fontFamily: 'system-ui, sans-serif' },
    successCard: { textAlign: 'center', padding: '40px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', maxWidth: '400px' },
    successIcon: { fontSize: '48px' }
};
