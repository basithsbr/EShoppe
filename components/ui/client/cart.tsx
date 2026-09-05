'use client';

import React from "react";

export default function cartTotal(cartItems: any[]) {
    let total = 0;
    for (const item of cartItems) {
        total += item.price * item.quantity;
    }           
    return total;
}