import React, {useContext, useEffect, useState} from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItems";

export default function LatestCollections(){

    const {products} = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));

    },[products]);
    return(
        <div className="my-10 ">
            <div className="text-center py-8 text-3xl">
                <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">Step into the season with style! Our latest collection is all about comfort, confidence, and trendsetting designs. From everyday essentials to statement pieces, each outfit is crafted with premium fabrics and modern fits that let you express your personality effortlessly. Whether you’re looking for laid-back casuals, chic streetwear, or timeless classics, this collection is designed to elevate your wardrobe and keep you ahead of the fashion game.</p>
            </div>

            {/* rendering products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                latestProducts.map((item,index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>

                ))
            }
            
            </div>
            
        </div>

    )
}