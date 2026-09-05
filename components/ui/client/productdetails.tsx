'use client'

import { DivideSquare, IndianRupee } from "lucide-react";
import { Card } from "../card";
import { Button } from "@base-ui/react";
import React from  "react";
import { useCartStore } from "@/components/store/cartStore";


interface Props {
  product: any,
}

export function ProductDetails({ product }: Props) {
  const[sizeButton, setSizeButton] = React.useState<string | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);
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
        <div className="font-bluefamily-def text-[18px] font-extrabold border-b py-2 px-4">
          {product.model}
        </div>
        <div className=" flex lg:flex-row md:flex-col flex-col py-3 lg:h-screen">
          <div className="px-4 border-slate-200/60 flex flex-col gap-4 w-full md:w-full lg:w-full">
            <div className=" w-full flex align-center justify-center h-2/4">
              <img
                src={product.image_url}
                alt={product.name}
                className="text-center 
                      lg:w-1/2 object-contain border-0 transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-row gap-10 mt-2 py-5">
              <div className="font-redfamily-def text-[15px] flex">
                size
              </div>
              {/* <div className="flex flex-row items-center gap-2 w-full flex-wrap "> */}
              {/* <div className="prod-size-wrapper-sm md:prod-size-wrapper-md lg:prod-size-wrapper-lg"> */}
              <div className="flex flex-row gap-3 items-center justify-start w-full flex-wrap ">
                {sizeButtons.map((button) => (
                  <button
                    key={button.id}
                    className={`prod-size ${sizeButton === button.id ? 'red-def' : ''}`}
                    onClick={() => setSizeButton(button.id)}
                  >
                    {button.label}
                  </button>
                ))
              }               
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-5
        rounded-xl w-full text-slate-900 bg-white  shadow-lg border border-slate-200/60 relative -translate-y-0.5">
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
                  className="cursor-pointer p-10 text-white font-bluefamily-def rounded-[5px] py-[10px] bg-[#071b4b] text-[11px] font-semi font-[family:Arial,sans-serif]">
                    Add To Cart</Button>
                </div>
                <div>
                  <Button className="cursor-pointer p-10 text-white font-bluefamily-def rounded-[5px] py-[10px] bg-[#071b4b] text-[11px] font-semi font-[family:Arial,sans-serif]">
                    Enquiry Whatsapp</Button>
                </div>
              </div>

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
    </>
  );
}