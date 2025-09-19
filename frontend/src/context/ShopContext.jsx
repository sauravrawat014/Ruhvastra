import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
export const ShopContext = createContext();

const ShopContextProvider = (props) =>{

    const currency = '₹';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem, setCartItem] = useState({});
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');

    const addToCart = async(itemId,size)=>{

        if(!size){
            toast.error("Select Product Size");
            return;
        }

        let cartData = structuredClone(cartItem);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] +=1;
            } else{
                cartData[itemId][size] = 1;
            }
        } else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        console.log(cartData);
        setCartItem(cartData);

        if(token){
            try{
                await axios.post(backendUrl + "/api/cart/add", {itemId, size}, {headers:{token}});
            } catch(error){
                console.log(error);
                toast.error(error.message);
            }
        }

    }

    const getCartCount = ()=>{
        let totalCount = 0;

        for(const item in cartItem){
            for(const size in cartItem[item]){
                try{
                if(cartItem[item][size]>0){
                    totalCount += cartItem[item][size];
                }
            } catch(error){
                console.log(error);

            }
            }
        }
        return totalCount;
    }

    const updateQuantity = async(itemId, size, quantity)=>{
        const cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData);

        if(token){
            try{

                await axios.post(backendUrl + "/api/cart/update", {itemId,size,quantity}, {headers:{token}});

            } catch(error){
                 console.log(error);
                toast.error(error.message);

            }
        }

    }

    const getCartAmount = ()=>{
        let totalAmount = 0;
        for(const items in cartItem){
            const productInfo = products.find((product)=>(product._id == items));
            for(const size in cartItem[items]){
               try{
                if(cartItem[items][size]>0){
                     totalAmount += productInfo.price * cartItem[items][size];
                }
               } catch(err){
                console.log(err);
               }
            }

        }
        return totalAmount;
    }

    const getProducts = async()=>{
        try{

            const response = await axios.get(backendUrl + "/api/product/list");

            if(response.data.success){
                setProducts(response.data.products);
            } else{
                toast.error(response.data.message);
            }
        } catch(error){
            console.log(error);
            toast.error(error.message);

        }
    }

    const getUserCart = async(token)=>{
        try{

            const response = await axios.post(backendUrl + "/api/cart/get", {}, {headers:{token}});

            if(response.data.success){
                setCartItem(response.data.cartData);
            }

        } catch(error){
             console.log(error);
                toast.error(error.message);

        }

    }

    useEffect(()=>{
    getProducts();
    },[]);

    useEffect(()=>{

        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }

    },[]);

    const value = {
        products, currency , delivery_fee, search, setSearch, showSearch, setShowSearch,cartItem, setCartItem, addToCart, getCartCount, updateQuantity,getCartAmount,
        navigate, backendUrl, setToken, token

    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}

        </ShopContext.Provider>
    )
}

export default ShopContextProvider;