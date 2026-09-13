import { useCartStore } from "@/app/store/CommonStore";
import { totalCartAmount } from "@/app/utils/utils";



export default function CartAmount({amount}:{amount: number}) {
    
    
    return (
        <div className="shadow-border-def flex-1 p-5 h-fit">
            <div className="flex flex-col gap-5 ">
                <h1 className="font-bluefamily-def-H2 font-semibold ">
                    Order Summary
                </h1>

                <div>
                    <div className="flex flex-row justify-between">
                        <span className="font-bluefamily-def-H3">Cart Items Price</span>
                        <span className="font-bluefamily-def-H2 font-semibold">{amount}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className="font-bluefamily-def-H3">Discount %</span>
                        <span>0</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className="font-bluefamily-def-H3">Delivery fee</span>
                        <span>0</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className="font-bluefamily-def-H3">Other charges</span>
                        <span>0</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className="font-bluefamily-def-H3">Tax</span>
                        <span>0</span>
                    </div>
                </div>
                <hr></hr>
                <div className="flex flex-row justify-between">
                    <span>Total</span>
                    <span className="font-bluefamily-def-H2 font-semibold">{totalCartAmount(amount, 0 ,0 ,0)}</span>
                </div>
            </div>

        </div>
    );
}