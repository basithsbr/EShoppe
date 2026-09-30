import { useCartStore } from "@/app/store/CommonStore";
import { totalCartAmount } from "@/app/utils/utils";



export default function CartAmount({amount = 0, page}:{amount?: number, page?:string}) {
    const style_font_H2 = page == 'payment'? 'font-whitefamily-def-H2' : 'font-bluefamily-def-H2';
    const style_font_H3 = page == 'payment'? 'font-whitefamily-def-H3' : 'font-bluefamily-def-H3';
    
    return (

        <div className="shadow-border-def flex-1 p-5 h-fit">
            <div className="flex flex-col gap-5 ">
                <h1 className={`pagefont font-semibold`}>
                    Order Summary
                </h1>

                <div>
                    <div className="flex flex-row justify-between">
                        <span className={`style_font_H3`}>Cart Items Price</span>
                        <span className={`style_font_H2 font-semibold`}>{amount}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className={`style_font_H3`}>Discount %</span>
                        <span>0</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className={`style_font_H3`}>Delivery fee</span>
                        <span>0</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className={`style_font_H3`}>Other charges</span>
                        <span>0</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className={`style_font_H3`}>Tax</span>
                        <span>0</span>
                    </div>
                </div>
                <hr></hr>
                <div className="flex flex-row justify-between">
                    <span>Total</span>
                    <span className={`pagefont font-semibold`}>₹ {totalCartAmount(amount, 0 ,0 ,0)}</span>
                </div>
            </div>

        </div>
    );
}