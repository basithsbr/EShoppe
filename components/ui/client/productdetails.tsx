'use client'

import { DivideSquare, IndianRupee } from "lucide-react";
import { Card } from "../card";
import { Button } from "@base-ui/react";

interface Props {
  product: any,
}

export function ProductDetails({ product }: Props) {
  return (
    <>
      <div className=" overflow-auto  h-screen ">
        <div className="p-4  ">
          {/* h-2/3 */}
          <div className="font-bluefamily-def text-[18px] font-extrabold  border-b py-2">
            {product.model}
          </div>
          {/* h-8/9 */}
          <div className=" w-full  flex align-center justify-center">
            <img
                      src={product.image_url}
                      alt={product.name}
                      className="text-center 
                      lg:w-1/2 object-contain border-0 transform group-hover:scale-105 transition-transform duration-300"
                    />
          </div>

        </div>

        <div className="flex flex-col  gap-8 h-1/2 px-5">
          <div className="h-1/4 flex flex-row gap-10 mt-2 py-5">
            <div className="font-redfamily-def text-[15px] flex">
              size
            </div>
            {/* <div className="flex flex-row items-center gap-2 w-full flex-wrap "> */}
            <div className="prod-size-wrapper-sm md:prod-size-wrapper-md lg:prod-size-wrapper-lg">
              <button className="prod-size ">S</button>
              <button className="prod-size">M</button>
              <button className="prod-size">L</button>
              <button className="prod-size">XL</button>
              <button className="prod-size">XXL</button>
              <button className="prod-size">XXXL</button>
            </div>
          </div>
          <div className="h-2/3 flex flex-col gap-10 ">
            <div className="flex flex-row gap-10 flex-wrap leading-none justify-between">
              <div className="flex flex-row gap-10 flex-wrap leading-none items-center">
                <h4 className=" font-bold uppercase tracking-wider text-muted-foreground text-[14px]">Price</h4>
                <div className="flex flex-row leading-none">
                  <div className="text-3xl  flex  leading-none">
                    <IndianRupee className="w-[0.5em] h-[0.5em] -mr-0.5" />
                    <span className="font-bluefamily-def text-[20px]">
                    {product.price}
                    </span>
                    {/* <span className="text-2xl flex flex-row  font-medium font-bluefamily-def"><IndianRupee className="mt-1 h-5 w-5 -ml-1" />
                    {product.price}</span> */}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-end">
                <div>
                  <Button className="w-full cursor-pointer p-10 text-white font-bluefamily-def rounded-[5px] py-[10px] bg-[#071b4b] text-[11px] font-semi font-[family:Arial,sans-serif]">
                    Add To Cart</Button>
                </div>
                <div>
                  <Button className="w-full cursor-pointer p-10 text-white font-bluefamily-def rounded-[5px] py-[10px] bg-[#071b4b] text-[11px] font-semi font-[family:Arial,sans-serif]">
                    Enquiry Whatsapp</Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full text-slate-900 border-none pb-10
             bg-white shadow-md hover:shadow-lg transition-shadow gap-5 snap-start shrink-0">
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}

                {/* Left Block Column */}
                
                  <h4 className=" font-bold uppercase tracking-wider text-muted-foreground text-[14px]">Product Info</h4>
                  <div className="rounded-xl bg-slate-50 gap-4 grid md:grid-cols-4 lg:grid-cols-4 w-full">
                    <div className="flex flex-col justify-between text-sm ">
                      <span className="text-muted-foreground font-bluefamily-def">Item Name</span>
                      <span className="font-semibold ml-4">{product.model}</span>
                    </div>
                    <div className="flex flex-col justify-between text-sm ">
                      <span className="text-muted-foreground font-bluefamily-def">Model Variant</span>
                      <span className="font-semibold ml-4">{product.model}</span>
                    </div>
                    <div className="flex flex-col justify-between text-sm ">
                      <span className="text-muted-foreground font-bluefamily-def">Model Variant</span>
                      <span className="font-semibold ml-4">{product.model}</span>
                    </div>
                    <div className="flex flex-col justify-between text-sm ">
                      <span className="text-muted-foreground font-bluefamily-def">Model Variant</span>
                      <span className="font-semibold ml-4">{product.model}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

      {/* </div> */}

    </>
  );
}