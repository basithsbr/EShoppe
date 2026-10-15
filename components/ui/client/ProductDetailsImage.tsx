import React from "react";


export default function ProductDetailsImage({ product }: { product: any }) {
    const [selectedImage, setSelectedImage] = React.useState<string>(product.image_url);
    const [imageIndex, setImageIndex] = React.useState<number>(0);
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
        const scroll = (direction: 'left' | 'right') => {
            if (scrollContainerRef.current) {
                const scrollAmount = 300;
                scrollContainerRef.current.scrollBy({
                    left: direction === 'left' ? -scrollAmount : scrollAmount,
                    behavior: 'smooth',
                });
            }
        };
    
    const otherImages = [
        product.image_url,
        'dummy-image-1.jpg',
        product.image_url,
        product.image_url,
        'dummy-image-1.jpg',
        product.image_url,
        product.image_url,
        'dummy-image-1.jpg',
        product.image_url,
        product.image_url
    ]
    
    const handleImageClick = (imageUrl: string, index: number) => {
        setSelectedImage(imageUrl);
        setImageIndex(index);
    };

    return (
        <>
            <div className=" w-full flex align-center justify-center h-2/4">
                <img
                    src={selectedImage}                
                    className="text-center 
                      lg:w-1/2 object-contain border-0 transform group-hover:scale-105 transition-transform duration-300"
                />

            </div>
            <div className="flex flex-row gap-4 relative w-full px-2 py-2 align-center justify-center ">
                
                <button
                    onClick={() => scroll('left')}
                    className="lg:block right-0 top-1/2  z-10 rounded-full 
                         text-gray-800  flex items-center justify-center w-10 h-10"
                    aria-label="Scroll left"
                >
                    <span className="text-xl flex justify-center font-bold font-mono font-bluefamily-def">‹</span>
                </button>
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-3 pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
                    > 
                {otherImages && otherImages.length > 0 && otherImages.map((imageUrl, index) => (
                    <img
                        key={index}
                        src={imageUrl}
                        alt={product.name}
                        className={`text-center 
                          w-20 object-contain border-[#071b4b] ${imageIndex === index ? 'border-2' : ''} transform group-hover:scale-105 transition-transform duration-300`}
                        onClick={() => handleImageClick(imageUrl,index)}
                    />
                ))}
                
                </div>
                <button
                        onClick={() => scroll('right')}
                        className="lg:block right-0 top-1/2  z-10 rounded-full 
                         text-gray-800  flex items-center justify-center w-10 h-10"
                        aria-label="Scroll right"
                    >
                        <span className="text-xl flex justify-center font-bold font-mono font-bluefamily-def">›</span>
                    </button>
            </div>
        </>
    );
}