import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
export default function Product(){

    const {products, currency, addToCart, cartItem} = useContext(ShopContext);
    const {productId} = useParams();
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    const fetchProductData = async()=>{
        products.map((item)=>{
            if(item._id == productId){
                setProductData(item);
                
                setImage(item.image[0]);
                return null;
            }
        });
    }

    useEffect(()=>{
        fetchProductData();

    },[productId, products]);
    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* product data */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                {/* product images */}
                <div className='flex-1 flex flex-col reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {
                            productData.image.map((item,index)=>(
                                <img onClick={()=> setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
                            ))
                        }
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img className='w-full h-auto' src={image}/>
                    </div>
                </div>
                {/* product info */}
                <div className='flex-1'>
                    <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} className='w-3 5'/>
                         <img src={assets.star_icon} className='w-3 5'/>
                         <img src={assets.star_icon} className='w-3 5'/>
                         <img src={assets.star_icon} className='w-3 5'/>
                         <img src={assets.star_dull_icon} className='w-3 5'/>
                         <p className='pl-2'>(122)</p>
                    </div>
                    <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
                    <p className='text-gray-500 mt-5 md:w-4/5'>{productData.description}</p>

                    <div className='flex flex-col gap-4 my-8'>
                        <p>Select Sizes</p>
                        <div className='flex gap-2'>
                            {
                            productData.sizes.map((item,index)=>(
                                <button onClick={()=> setSize(item)} key={index} className={`border bg-gray-100 px-4 py-2 ${size === item ? 'border-orange-500' : '' }`}>{item}</button>

                            ))
                        }
                        </div>
                    </div>

                    <button onClick={()=>addToCart(productData._id, size)} className='bg-black text-white py-3 px-8 active:bg-gray-700'>Add To Cart</button>
                    <hr className='mt-8 sm:w-4/5'/>

                    <div className='mt-5 text-sm text-gray-500 flex flex-col gap-1'>
                        <p>100% Original Product</p>
                        <p>Cash On Delivery Is Available On This Product</p>
                        <p>Easy Return And Exchange Policy Within 7 Days</p>
                    </div>

                </div>
            </div>

            {/* description & review */}

            <div className='mt-20'>
                <div className='flex'>
                    <b className='border border-gray-200 py-3 px-5 text-sm'>Description</b>
                    <p className='border border-gray-200 py-3 px-5 text-sm'>Reviews (122)</p>
                </div>

                <div className='flex flex-col gap-4 border border-gray-200 py-6 px-6 text-sm text-gray-500'>
                    <p>An eCommerce platform is a software tool that helps businesses create and run online stores. It includes features for displaying products, managing inventory, accepting payments, and handling customer orders — all in one place.</p>
                    <p>An eCommerce platform enables businesses to sell products or services online, offering tools for storefront design, shopping cart functionality, secure checkout, and inventory management.</p>

                </div>
            </div>

            {/* related products section */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

        </div>
    ) : <div className='opacity-0'></div>
}