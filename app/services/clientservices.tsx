

export async function fetchLiveData(category: string) {
    // Executed securely on your backend platform layer

    const res = await fetchAll();
    if (!res.ok) throw new Error('Failed to fetch local database data');

    const data = await res.json();
    if (category == undefined || category == '')
        return JSON.parse(JSON.stringify(data));

    const productsArr = JSON.parse(JSON.stringify(data))
    const filteredProducts = productsArr.filter((product: any) => {
        return product.category === category;
    });
    // console.log("filteredProducts : ", filteredProducts);
    return filteredProducts;
}

async function fetchAll() {

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
