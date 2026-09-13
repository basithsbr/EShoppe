
'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import React from "react";

interface Props {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}
export default function SelectControls({ searchParams }: Props) {

  const currentParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  
  const sortBy = (value: string | null) => {
    const params = new URLSearchParams(currentParams.toString());
    if(value && value != 'Featured')
    {
      params.set('sortBy', value);
    } else {
      params.delete('sortBy');
    }


    router.push(`${pathName}?${params.toString()}`);
  };
  return (
    <>
      <Select onValueChange={sortBy} >
        <SelectTrigger className="w-[160px] bg-[#071b4b] text-white font-[Arial,sans-serif] text-[13px]">
          <SelectValue className="font-bluefamily-def-H4 text-white" placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent >
          <SelectItem value="Featured" className="font-bluefamily-def-H4">Featured</SelectItem>
          <SelectItem value="Price-low" className="font-bluefamily-def-H4">Price: Low to High</SelectItem>
          <SelectItem value="Price-high" className="font-bluefamily-def-H4">Price: High to Low</SelectItem>
          <SelectItem value="High-Rating" className="font-bluefamily-def-H4">Highest Rated</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}