

export function totalCartAmount(amount: number,deliveryFee: number,otherCharges: number,tax: number) 
{
    return amount + deliveryFee + otherCharges + tax;
}