import { ProductDetails } from "@/components/ui/client/productdetails";
import { getProductById, getRelatedProductBy } from '@/app/services/clientservices';
import React, { Suspense } from "react";
import { ShowCardsScrollH } from "@/components/ui/server/cardsscrollH";
import ServerCard from "@/components/ui/server/productscards";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductPage({ params }: { params: { id: string } }) {

  const resolvedParams = await params;
  const productId = resolvedParams.id;
  const product = await getProductById(productId);
  const relatedProducts = await getRelatedProductBy(productId);
  const searchParams = Promise.resolve({ category: product.category, id: productId, related: relatedProducts});
  return (
    <>
      {product && product.length > 0 ? <ProductDetails product={product[0]}>
        
          <ShowCardsScrollH searchParams={searchParams} type="new">
            <ServerCard searchParams={searchParams} className="w-[300px]"/>
          </ShowCardsScrollH>
        
      </ProductDetails> : "Product not found"}
    </>

  );
}