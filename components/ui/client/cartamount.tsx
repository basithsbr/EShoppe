import { useCartStore } from "@/app/store/cartStore";
import { totalCartAmount } from "@/app/utils/utils";



export default function CartAmount({amount}:{amount: number}) {
    
    
    return (
        <div className="shadow-border-def flex-1 p-10 h-fit">
            <div className="flex flex-col gap-5 ">
                <h1 className="font-bluefamily-def-H2 font-semibold ">
                    Amount Payable
                </h1>

                <div>
                    <div className="flex flex-row justify-between">
                        <span>Cart Items Price</span>
                        <span>{amount}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>Discount %</span>
                        <span>0</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>Delivery fee</span>
                        <span>0</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>Other charges</span>
                        <span>0</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>Tax</span>
                        <span>0</span>
                    </div>
                </div>
                <hr></hr>
                <div className="flex flex-row justify-between">
                    <span>Total</span>
                    <span>{totalCartAmount(amount, 0 ,0 ,0)}</span>
                </div>
            </div>

        </div>
    );
}