
interface Post {
  id: number, name: string, category: string, price: number, rating: any, image: string
}

export async function getProducst(): Promise<Post[]> {
  const res = await fetch("https://typicode.com", {
    next: { revalidate: 1800 } // Optional: caches data for an hour
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}