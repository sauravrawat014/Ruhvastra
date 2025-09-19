import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function Orders(){
    const {backendUrl, token, currency} = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);

    const loadOrdersData = async()=>{
        try{
            if(!token){
                return null;
            }

            const response = await axios.post(backendUrl + '/api/order/userOrder', {}, {headers:{token}});
            if(response.data.success){
                let allOrdersItem = [];
                response.data.orders.map((order)=>{
                    order.items.map((item)=>{
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item);
                    })
                })
                setOrderData(allOrdersItem.reverse());
            }

        } catch(error){

        }
    }

    useEffect(()=>{
        loadOrdersData()

    },[token]);
    return(
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={"MY"} text2={"ORDERS"}/>
            </div>

            <div>
                {
                    orderData.slice(0,4).map((item,index)=>(
                        <div key={index} className='py-4 border-t border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                            <div className='flex items-center gap-6 text-sm'>
                                <img className='w-16 sm:w-20' src={item.image[0]}/>
                                <div>
                            
                            <p className='sm:text-base font-medium'>{item.name}</p>
                            <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                <p>{currency}{item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Size: {item.size}</p>
                            </div>
                            <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(Number(item.date)).toLocaleDateString()}</span></p>
                             <p className='mt-2'>Payment Method: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                        </div>
                        </div>
                        <div className='md:w-1/2 flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                <p className='text-sm md:text-base'>{item.status}</p>
                             </div>
                             <button onClick={loadOrdersData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                        </div>
                        </div>

                    ))
                }

            </div>

        </div>
    )
}