import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function PlaceOrder(){

    const [method,setMethod] = useState('cod');
    const {navigate, backendUrl, token, cartItem ,setCartItem, getCartAmount, delivery_fee, products} = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        street:'',
        city:'',
        state:'',
        zipcode:'',
        country:'',
        phone:''
    });

    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data=> ({...data, [name]:value}));

    }

    const initPay = (order)=>{
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async(response)=>{
                console.log(response)
                try{
                    const {data} = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, {headers:{token}});
                    if(data.success){
                        navigate('/orders');
                        setCartItem({});
                    }

                } catch(error){
                    console.log(error);
                    toast.error(error);

                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open();
    }

    const onSubmitHandler = async(e)=>{
        e.preventDefault();

        try{

            let orderItems = [];

            for(const items in cartItem){
                for(const size in cartItem[items]){
                    if(cartItem[items][size]>0){
                        const itemInfo = structuredClone(products.find(products => products._id == items));

                        if(itemInfo){
                            itemInfo.size = size;
                            itemInfo.quantity =  cartItem[items][size];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch(method){

                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}});

                    if(response.data.success){
                        setCartItem({});
                        navigate('/orders');
                    } else{
                        toast.error(response.data.error)
                    }
                    break;

                    case 'razorpay':
                        const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}});
                        if(responseRazorpay.data.success){
                            initPay(responseRazorpay.data.order);
                        }

                    default:
                        break;

            }

        }catch(error){
            console.log(error);
            toast.error(error.message);

        }

    }
    return(
        <form onSubmit={onSubmitHandler} className='flex gap-6 justify-between'>
            {/* left side */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
                </div>

                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First Name'/>
                     <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last Name'/>
                </div>

                 <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email Address'/>
                  <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street'/>

                    <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City'/>
                     <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State'/>
                </div>

                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Zipcode'/>
                     <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country'/>
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone'/>

            </div>
            {/* right side */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal/>
                </div>

                <div className='mt-12'>
                    <Title text1={"PAYMENT"} text2={"METHOD"}/>
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={()=> setMethod('stripe')} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method == 'stripe'? 'bg-green-400' : ''}`}></p>
                            <img src={assets.stripe_logo}/>
                        </div>

                           <div onClick={()=> setMethod('razorpay')} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method == 'razorpay'? 'bg-green-400' : ''}`}></p>
                            <img src={assets.razorpay_logo}/>
                        </div>

                           <div onClick={()=> setMethod('cod')} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method == 'cod'? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                            
                        </div>

                    </div>
                    <div className='text-end mt-8 w-full'>
                        <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
    )
}