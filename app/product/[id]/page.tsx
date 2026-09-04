import { ProductDetails } from "@/components/ui/client/productdetails";
import {getProductById} from '@/app/services/clientservices';
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;  
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  const product = await getProductById(productId); 
  return (
    <>
    {product && product.length > 0 ? <ProductDetails product={product[0]}></ProductDetails>  : "Product not found"}
    </>   

  );
}