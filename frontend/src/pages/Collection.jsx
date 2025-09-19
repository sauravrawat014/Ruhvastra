import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItems';
export default function Collection(){

    const{products, search, showSearch} = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sort, setSort] = useState("relevant");
    

    const toggleCategory = (e)=>{
        if(category.includes(e.target.value)){
            setCategory(prev=> prev.filter(item => item!==e.target.value));
        } else{
            setCategory(prev => [...prev, e.target.value]);
        }
    }

    const toggleSubCategory = (e)=>{
        if(subCategory.includes(e.target.value)){
            setSubCategory(prev=>prev.filter(item=>item!=e.target.value));
        } else{
            setSubCategory(prev=> [...prev, e.target.value]);
        }
    }

    const applyFilter = ()=>{
        let productCopy = products.slice();

        if(search && showSearch){
            productCopy = productCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if(category.length>0){
            productCopy = productCopy.filter(item=> category.includes(item.category));
        }

        if(subCategory.length>0){
            productCopy = productCopy.filter(item=> subCategory.includes(item.subCategory));
        }

        if(sort == "low-high"){
            productCopy.sort((a,b) => a.price - b.price);
        } else if(sort == "high-low"){
            productCopy.sort((a,b)=> b.price - a.price);
        }

        setFilterProducts(productCopy);

    }

    useEffect(()=>{
        applyFilter();
        
    }, [category, subCategory, sort, search, showSearch, products]);

    return(
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

            <div className='min-w-60'>
                <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ""}`} src={assets.dropdown_icon}/>
                </p>
                {/* category filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter? ' ' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type='checkbox' value={'Men'} onChange={toggleCategory}/> Men
                        </p>

                         <p className='flex gap-2'>
                            <input type='checkbox' value={'Women'} onChange={toggleCategory}/> Women
                        </p>

                         <p className='flex gap-2'>
                            <input type='checkbox' value={'Kid'} onChange={toggleCategory}/> Kid
                        </p>
                    </div>
                </div>
                {/* subcategory filter */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter? ' ' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type='checkbox' value={'Topwear'} onChange={toggleSubCategory}/> Topwear
                        </p>

                         <p className='flex gap-2'>
                            <input type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
                        </p>

                         <p className='flex gap-2'>
                            <input type='checkbox' value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
                        </p>
                    </div>
                </div>

            </div>

            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'}/>
                    {/* Products sort */}
                    <select className='border-2 border-gray-300 text-sm px-2' onChange={(e)=>setSort(e.target.value)}>
                        <option value="relevent">Sort by: Relevent</option>
                        <option value="low-high">Sort by: Low To High</option>
                        <option value="high-low">Sort by: High To Low</option>
                    </select>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {
                       filterProducts.map((item,index)=>(
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                       ))
                    }

                </div>
            </div>
        </div>
    )
}