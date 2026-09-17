import React from 'react';
import { Card, CardContent, CardFooter } from '../card';
import { Button } from '@base-ui/react';
import { Badge, Heart, IndianRupee, Layers, LayoutGrid } from 'lucide-react';
import { ProductWrapper } from '../client/productwrapper';
import { fetchLiveData } from '@/app/services/clientservices';


interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  style?: React.CSSProperties;
  cardClass?: string;
  wrapperDivClass?: string;
}

export default async function ServerCard({ searchParams, style, cardClass,wrapperDivClass }: PageProps) {


  const resolvedParams = await searchParams;
  let productsArray = Array.isArray(resolvedParams.related)
    ? resolvedParams.related
    : await fetchLiveData(searchParams);
  return (
    <>

      <React.Suspense>
        {productsArray.length === 0 ? <>
          <div className="w-full flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-16 text-center">
            <LayoutGrid className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg">No products found</h3>
            <p className="text-muted-foreground text-sm mt-1 max-w-xs">
              Try loosening your filters, adjusting your price range, or searching for something else.
            </p>
            <Button
              className="mt-4"
            >
              Retry with some other category
            </Button>
          </div>
        </> :
          <>
            <div className={`${wrapperDivClass}`}>
              {productsArray.map((product: any) => {
                return (

                  <ProductWrapper key={product._id} product={product}>
                    {/* <Card key={product._id} className="min-w-[260px] sm:min-w-[280px] bg-white shadow-md hover:shadow-lg transition-shadow gap-0 py-[0px] snap-start shrink-0"> */}
                    <Card key={product._id} className={`flex flex-col bg-transparent shrink-0 ${cardClass}`} >
                      <CardContent className="relative grid aspect-2/2 rounded-t-xl]">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="rounded-t-[10px] object-center h-full w-full border-0 transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <Button
                          className="absolute top-3 right-3 rounded-full opacity-90 hover:opacity-100 shadow-sm"
                        >
                          <Heart className="h-4 w-4 text-muted-foreground group-hover:text-destructive group-hover:fill-destructive" />
                        </Button>
                      </CardContent>
                      <CardFooter className="flex flex-col py-2 px-2 gap-1.5 bg-white items-start">
                        <div className='w-full flex flex-row flex-wrap-reverse justify-between gap-2'>
                          <div>
                            <h3 className="font-bluefamily-def-H12 tracking-wider">{product.item}</h3>
                          </div>
                          <div className="rounded-[5px] py-2 px-3 uppercase font-semibold tracking-wider font-bluefamily-def-H10 bg-gray-200 text-center">
                            {product.category}
                          </div>
                        </div>

                        <span className="flex flex-row text-sm font-medium font-bluefamily-def"><IndianRupee className="mt-1 h-3 w-3" />{product.price}</span>
                        <Button className="w-full cursor-pointer text-white font-bluefamily-def rounded-[5px] py-[10px] bg-[#071b4b] text-[13px] font-semi font-[family:Arial,sans-serif]">
                          View</Button>
                      </CardFooter>
                    </Card>
                  </ProductWrapper>

                )
              }
              )
              }
              </div>            
          </>
        }

      </React.Suspense>
    </>);

}
