import React from 'react';
import {assets} from '../assets/assets';

export default function Navbar({setToken}){
    return(
        <div className='flex justify-between py-2 px-[4%] items-center'>
            <img className='w-[max(10%,80px)]' src={assets.logo}/>
            <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
        </div>
    )
}