'use client'

import { DivideSquare, IndianRupee } from "lucide-react";
import { Card } from "../card";
import { Button, Input } from "@base-ui/react";
import React from "react";
import { useCartStore } from "@/app/store/cartStore";
import { ReadStream } from "fs";
import { ShowCardsScrollH } from "../server/cardsscrollH";
import ProductDetailsImage from "./ProductDetailsImage";


interface Props {
  product: any,
  cartIndex: number,
  children?: React.ReactNode
}

export function ProductDetails({ product, cartIndex, children }: Props) {
  const cartStoreItems = useCartStore((state) => state.cart);

  const cartItem = cartIndex != undefined ? cartStoreItems[cartIndex] : null;
  const [sizeButton, setSizeButton] = React.useState<string | null>(cartItem ? cartItem.size : '');
  const [addCartSuccess, setAddCartSuccess] = React.useState(false);
  const [addCartSuccessMsg, setAddCartSuccessMsg] = React.useState('');
  const [addCartFailed, setAddCartFailed] = React.useState(false);
  const [addCartFailedMsg, setAddCartFailedMsg] = React.useState('');

  const [qty, setQty] = React.useState<number>(1);



  const addToCartStore = useCartStore((state) => state.addToCart);
  const addToCart = (product: any) => {
    product = { ...product, size: sizeButton, qty: qty };
    // setAddCartFailed(false);
    let addCartFailedVar;
    if(!sizeButton)
    {
       addCartFailedVar = true;
       setAddCartFailed(true);
       setAddCartFailedMsg("Failed to Add cart. Please choose the size!");
    }

    if (!addCartFailedVar) {
      addToCartStore({ ...product, size: sizeButton, qty: qty });
      setAddCartSuccess(true);
      setAddCartSuccessMsg("Added to Cart !!!")      
    }
    setTimeout(() => {
        setAddCartSuccess(false);
        setAddCartFailed(false);
      }, 3000);
  }

  const sizeButtons = [
    { id: 'S', label: 'S' },
    { id: 'M', label: 'M' },
    { id: 'L', label: 'L' },
    { id: 'XL', label: 'XL' },
    { id: 'XXL', label: 'XXL' },
    { id: 'XXXL', label: 'XXXL' },
  ];

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="lg:w-6/7">
          <div className="font-bluefamily-def-H16 font-bold border-b py-2 px-4">
            {product.model}
          </div>
          <div className=" flex lg:flex-row md:flex-col flex-col py-3">
            <div className="px-4 border-slate-200/60 flex flex-col gap-4 w-full md:w-full lg:w-full">
              <ProductDetailsImage product={product}></ProductDetailsImage>
              <div className="flex flex-row gap-10 mt-2 py-3">
                <div className="font-redfamily-def text-[15px] flex">
                  size
                </div>
                {/* <div className="flex flex-row items-center gap-2 w-full flex-wrap "> */}
                {/* <div className="prod-size-wrapper-sm md:prod-size-wrapper-md lg:prod-size-wrapper-lg"> */}
                <div className="flex flex-row gap-3 items-center justify-start w-full flex-wrap ">
                  {sizeButtons.map((button) => (
                    <button
                      key={button.id} value="M"
                      className={`prod-size ${sizeButton === button.id ? 'red-def' : ''}`}
                      onClick={() => setSizeButton(button.id)}
                    >
                      {button.label}
                    </button>
                  ))
                  }
                </div>

              </div>
              <div className="flex flex-row gap-5 pb-5">
                <div className="font-redfamily-def text-[15px] flex">
                  quantiy
                </div>
                <Input type="number" name="quantity"
                  className="border-b input-focus-border-h-def border w-15 rounded-[3px] px-2"
                  value={cartItem ? cartItem.qty : qty}
                  onInput={(e) => setQty(parseInt(e.currentTarget.value))}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 p-5 w-full shadow-border-def bg-white">
              <div className="flex flex-col  gap-4 md:gap-8 lg:gap-8">
                <div className="">
                  <h4 className="font-subtitle-def">Price</h4>
                  <div className="shadow-border-def flex flex-row justify-between items-center font-bluefamily-def">
                    <div className="flex flex-row items-baseline leading-none">
                      <div className="text-xl flex items-baseline">
                        {/* <IndianRupee className="w-[0.5em] h-[0.5em] -mr-0.5" /> */}
                        ₹
                      </div>

                      <div className="font-bluefamily-def text-[20px] font-semibold">
                        {product.price}
                      </div>
                      <div className="text-[8px] px-1 font-redfamily-def">
                        MRP<span className="font-bluefamily-def px-1">(Inclusive of all taxes)</span>
                      </div>
                    </div>
                    <div className="text-[10px] font-bluefamily-def flex flex-col items-end justify-end gap-1 px-2">
                      <div className="flex flex-row gap-1 items-center">
                        <span className="text-[14px] font-bluefamily-def font-semibold relative">
                          ₹
                        </span>
                        <span className="text-[14px] font-bluefamily-def font-semibold relative
                      px-1 before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-full before:h-[2px] before:bg-red-500 before:rotate-12 before:-translate-y-1/2">
                          200
                        </span>
                      </div>
                      <span className="font-semibold font-redfamily-def">10% Discount</span>
                    </div>
                  </div>

                </div>
                <div className="flex flex-row gap-4 justify-end py-3 w-full">
                  <div>
                    <Button
                      onClick={() => addToCart(product)}
                      className="button-def ">
                      Add To Cart</Button>
                    <div className={`mt-1 p-3 border-[#071b4b]
                      shadow-border-def-p1 rounded-xl border-2 absolute ${addCartSuccess ? 'block' : 'hidden'}  bg-white`}>
                      <span className="font-semibold font-bluefamily-def-H13 tracking-[1px]">
                        {addCartSuccessMsg}
                      </span>
                    </div>
                    <div className={`mt-1 p-3 border-[#e91e63]
                      shadow-border-def-p1 rounded-xl border-2 absolute ${addCartFailed ? 'block' : 'hidden'} bg-white`}>
                      <span className="font-semibold font-redfamily-def-H13 tracking-[1px]">
                        {addCartFailedMsg}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Button className="button-def">
                      Enquiry Whatsapp</Button>
                  </div>

                </div>

                <div className="horizontal-line-def" aria-hidden="true" />
                <div className="">
                  <h4 className="font-subtitle-def">
                    Delivery
                  </h4>
                  <div className="max-sm:shadow-border-def w-full bg-white font-bluefamily-def 
                text-[12px] tracking-[1px]  
                ">
                    Free Delivery. Will deliver between 3-5 business days. In case of any issues, We will contact you at the right time.
                  </div>
                </div>
                <div className="horizontal-line-def" aria-hidden="true" />
                <div className="flex flex-col w-full gap-2 ">
                  <h4 className=" font-subtitle-def">Product Info</h4>
                  <div className="rounded-xl grid md:grid-cols-2 lg:grid-cols-2 gap-4 w-full text-slate-900 bg-white font-bluefamily-def text-[14px] tracking-[1px] max-sm:shadow-border-def">
                    <div className="prod-info-row">
                      <span className="text-muted-foreground ">Item Name</span>
                      <span className="font-semibold ml-4">{product.model}</span>
                    </div>
                    <div className="prod-info-row">
                      <span className="text-muted-foreground font-bluefamily-def">Model Variant</span>
                      <span className="font-semibold ml-4">{product.model}</span>
                    </div>
                    <div className="prod-info-row">
                      <span className="text-muted-foreground font-bluefamily-def">Model Variant</span>
                      <span className="font-semibold ml-4">{product.model}</span>
                    </div>
                    <div className="prod-info-row">
                      <span className="text-muted-foreground font-bluefamily-def">Model Variant</span>
                      <span className="font-semibold ml-4">{product.model}</span>
                    </div>
                  </div>
                </div>
                <div className="horizontal-line-def" aria-hidden="true" />
                <div className="">
                  <h4 className="font-subtitle-def">
                    Return Policy
                  </h4>
                  <div className="max-sm:shadow-border-def w-full bg-white font-bluefamily-def 
                text-[12px] tracking-[1px]  
                ">
                    Currently  we dont support return policy. In case of any issues, Kindly contact us. We will provide you with the best possible solution. We are always here to help you.
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="flex flex-col gap-1"  >
        <div id="section2" className="w-full overflow-hidden bg-[#f5f7fb] flex-col gap-10 px-[10px] py-[10px] md:px-[20px] md:py-[30px] lg:px-[30px] lg:py-[20px] ">
          <div id="head" className="grid flex-col gap-5">
            {/* <h1 className="text-[#071b4b] font-bold lg:text-[20px] text-[20px] md:text-[5vw] leading-[1.1]"> */}
            <h1 className="font-bluefamily-def-H16 font-semibold">
              Related Products
            </h1>
          </div>
          <div>
            {children}
          </div>
        </div>
        <div id="section2" className="w-full overflow-hidden bg-[#f5f7fb] flex-col gap-10 px-[10px] py-[10px] md:px-[20px] md:py-[30px] lg:px-[30px] lg:py-[20px] ">
          <div id="head" className="grid flex-col gap-5">
            <h1 className="font-bluefamily-def-H16 font-semibold">
              You May Also Like</h1>
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}