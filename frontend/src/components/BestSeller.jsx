import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItems";

export default function BestSeller(){
    const [bestSeller, setBestSeller] = useState([]);
    const {products} = useContext(ShopContext);

    useEffect(()=>{
        const bestProducts = products.filter((items)=>items.bestseller);
        setBestSeller(bestProducts.slice(0,5));

    },[products]);

    return(
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title text1={'BEST'} text2={'SELLER'}/>
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                   Loved by thousands, trusted for their style and comfort. These best-selling pieces are the ones our community can’t get enough of! From versatile everyday wear to iconic statement outfits, each item is a customer favorite for its perfect fit, premium quality, and timeless design. If you’re wondering where to start, this is the collection that speaks for itself.

                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                bestSeller.map((item, index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />

                ))
            }
            </div>

        </div>
    )
}