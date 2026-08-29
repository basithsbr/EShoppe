// import React from "react"
// import { IndianRupee } from "lucide-react"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"

// interface Props {
//     product: any
// }
// export default function ProductCarousel({ product }: Props) {
//     const productImages = product.image
//   return (
//     <div className="w-full max-w-5xl mx-auto px-12">
//       <Carousel
//         opts={{
//           align: "start",
//           loop: true,
//         }}
//         className="w-full"
//       >
//         <CarouselContent className="-ml-4">
//           {products.map((product, index) => (
//             // Responsive: 1 card on mobile, 2 on tablet (sm), 3 on desktop (md)
//             <CarouselItem key={index} className="pl-4 sm:basis-1/2 md:basis-1/3">
//               <div className="p-1">
//                 <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col justify-between h-80">
//                   {/* Image Placeholder */}
//                   <div className="h-40 w-full bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
//                     Product Image
//                   </div>

//                   {/* Product Details */}
//                   <div className="mt-4">
//                     <h3 className="font-medium text-slate-800 line-clamp-1">{product.name}</h3>
                    
//                     {/* Bottom Flex row using your price alignment */}
//                     <div className="flex flex-row items-center justify-between w-full mt-2">
//                       <div className="text-2xl font-bold flex items-center leading-none text-slate-900">
//                         <IndianRupee className="w-[0.9em] h-[0.9em] -mr-1 -mt-0.5" />
//                         <span>{product.price}</span>
//                       </div>
//                       <button className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">
//                         Add
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
        
//         {/* Navigation Arrows */}
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </div>
//   )
// }
