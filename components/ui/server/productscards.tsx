import React from 'react';
import { Card, CardContent, CardFooter } from '../card';
import { Button } from '@base-ui/react';
import { Badge, Heart, IndianRupee, Layers } from 'lucide-react';
import { ModalWrapper } from '../client/modal';

async function fetchLiveData(category: string) {
  // Executed securely on your backend platform layer

  const res = await fetch(`https://eliteshoppe-py.onrender.com/products`, {
  // const res = await fetch(`http://127.0.0.1:8000/products`, {
    cache: 'no-store' // Forces Next.js to skip caching and perform true SSR on every request
  });

  if (!res.ok) throw new Error('Failed to fetch local database data');

  const data = await res.json();
  if (category == undefined || category == '')
    return JSON.parse(JSON.stringify(data));

  const productsArr = JSON.parse(JSON.stringify(data))
  const filteredProducts = productsArr.filter((product: any) => {

    return product.category === category;
  });
  console.log("filteredProducts : ", filteredProducts);
  return filteredProducts;

}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ServerCard({ searchParams }: PageProps) {

  // export default async function ServerCard() {
  // const resolvedParams = React.use(searchParams);
  const resolvedParams = await searchParams;
  // 2. Extract and format your values safely
  const category = typeof resolvedParams.category === 'string'
    ? resolvedParams.category
    : '';
  // const category = '';
  const productsArray = await fetchLiveData(category);

  return (
    <>

      <React.Suspense>
        {productsArray.length === 0 ? productsArray.length :
          productsArray.map((product: any) => {
            return (

              <ModalWrapper key={product._id} product={product}>
                <Card key={product._id} className="min-w-[260px] sm:min-w-[280px] bg-white shadow-md hover:shadow-lg transition-shadow gap-0 py-[0px] snap-start shrink-0">

                  <CardContent className="relative grid aspect3/4  py-[5px]">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="object-contain border-0 transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button 
                      size="icon"
                      className="absolute top-3 right-3 rounded-full opacity-90 hover:opacity-100 shadow-sm"
                    >
                      <Heart className="h-4 w-4 text-muted-foreground group-hover:text-destructive group-hover:fill-destructive" />
                    </Button>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2 bg-white items-start">

                    <div className='w-full flex flex-row justify-between'>
                      <div>
                        <h3 className="font-bluefamily-def ">{product.item}</h3>
                      </div>
                      <div className="rounded-[5px] py-2 px-3 text-[10px] uppercase font-semibold tracking-wider font-bluefamily-def bg-gray-200 text-center">
                        {product.category}
                      </div>
                    </div>

                    <span className="flex flex-row text-sm font-medium font-bluefamily-def"><IndianRupee className="mt-1 h-3 w-3" />{product.price}</span>
                    <Button size="sm" className="w-full cursor-pointer text-white font-bluefamily-def rounded-[5px] py-[10px] bg-[#071b4b] text-[13px] font-semi font-[family:Arial,sans-serif]">
                      View</Button>
                  </CardFooter>
                </Card>
              </ModalWrapper>

            )
          })
        }
      </React.Suspense>

    </>);

}
