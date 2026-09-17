

export async function fetchLiveData(searchParams: Promise<{ [key: string]: string | string[] | undefined }>) {

    
    const resolvedParams = await searchParams;
    const category = typeof resolvedParams.category === 'string'
        ? resolvedParams.category
        : '';
    const filteType = typeof resolvedParams.filter === 'string'
        ? resolvedParams.filter
        : '';

    console.log("fetchLiveData category ",category);
    const minPrice = typeof resolvedParams.minPrice === 'string'
        ? resolvedParams.minPrice
        : '';
    const maxPrice = typeof resolvedParams.maxPrice === 'string'
        ? resolvedParams.maxPrice
        : '';

    const sortBy = typeof resolvedParams.sortBy === 'string'
        ? resolvedParams.sortBy
        : '';
    console.log("fetchLiveData category ",category, minPrice, maxPrice);
    const res = await fetchAll();
    if (!res.ok) throw new Error('Failed to fetch local database data');

    const data = await res.json();
    // if (category == undefined || category == '')
    //     return JSON.parse(JSON.stringify(data));

    const priceRange0: number = minPrice != undefined ? Number(minPrice) : 0
    const priceRange1: number = maxPrice != undefined ? Number(maxPrice) : 0

    const productsArr = JSON.parse(JSON.stringify(data))
    const filteredProducts = productsArr.filter((product: any) => {
        let filter = true;

        if (category != undefined && category != '') {
            filter = product.category === category
        }

        if (priceRange0 > 0) {

            filter = filter && product.price >= priceRange0;
        }

        if (priceRange1 > 0) {

            filter = filter && product.price <= priceRange1;
        }
        console.log("filter : ", filter);
        return filter;
    }).sort((a :any, b:any) => {
        if (sortBy === "Price-low") return a.price - b.price;
        if (sortBy === "Price-high") return b.price - a.price;
        if (sortBy === "High-Rating") return b.rating - a.rating;
        
        return 0;
    }).sort((a :any, b:any) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime(); 
    });
    // console.log("filteredProducts : ", filteredProducts);
    return filteredProducts;
}

export async function fetchAll() {

    return await fetch(`https://eliteshoppe-py.onrender.com/products`, {
        // return await fetch(`http://127.0.0.1:8000/products`, {
        // cache: 'no-store' // Forces Next.js to skip caching and perform true SSR on every request
        next: { revalidate: 60 },
    });
}

export async function getProductById(id: string) {
    console.log("getProductById id : ", id);
    const res = await fetchAll();
    if (!res.ok) throw new Error('Failed to fetch local database data');

    const data = await res.json();
    // console.log("date : ", data);
    const productsArr = JSON.parse(JSON.stringify(data))
    const filteredProducts = productsArr.filter((product: any) => {
        return product._id === id;
    });
    console.log("filteredProducts : ", filteredProducts);
    return filteredProducts;
}

export async function getRelatedProductBy(id: string) {
    console.log("getProductById id : ", id);
    const res = await fetchAll();
    if (!res.ok) throw new Error('Failed to fetch local database data');

    const data = await res.json();
    // console.log("date : ", data);
    return JSON.parse(JSON.stringify(data));

}