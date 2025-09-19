import React, { useContext, useState } from "react";

import {assets} from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

export default function Navbar(){

    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);

    const logout = async()=>{
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
        
    }
    return(
        <div className="flex item-center justify-between py-5 font-medium"> 
           <Link to="/"> <img src={assets.logo2} className="w-17"/> </Link>

            <ul className="hidden sm:flex gap-5 text-sm text-gray-700">

            <NavLink to='/' className="flex flex-col items-center gap-1">
                <p>HOME</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
            </NavLink>

            <NavLink to='/Collection' className="flex flex-col items-center gap-1">
                <p>COLLECTIONS</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
            </NavLink>

            <NavLink to='/About' className="flex flex-col items-center gap-1">
                <p>ABOUT</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
            </NavLink>

            <NavLink to='/Contact' className="flex flex-col items-center gap-1">
                <p>CONTACT</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
            </NavLink>

            </ul>

            <div className="flex items-center gap-6">
                <img onClick={()=> setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer"/>
                <div className="group relative">
                    <img onClick={()=> token? null: navigate('/login')} src={assets.profile_icon} className="w-5 cursor-pointer"/>
                    {/* drop menu */}
                   {token &&  <div className="group-hover:block hidden dropdown-menu absolute right-0 pt-4">
                        <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                            <p className="cursor-pointer hover:text-black">My Profile</p>
                            <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                            <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                        </div>
                    </div>}
                </div>
                <Link to='/Cart' className="relative">
                <img src={assets.cart_icon} className="w-5 min-w-5"/>
                 <p className="absolute right-[-5px] bottom-[-5px] text-center w-4 leading-4 bg-black rounded-full text-white aspect-square text-[8px]">{getCartCount()}</p>
                
                </Link>
                 <img src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" onClick={()=>setVisible(true)}/>
            </div>

            {/* sidebar menu for small screen */}
            <div className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className="flex flex-col text-gray-600">

                <div onClick={()=>setVisible(false)} className="cursor-pointer flex items-center gap-4 p-3">
                    <img src={assets.dropdown_icon} className="h-4 rotate-180"/>
                    <p>BACK</p>
                </div>

                <NavLink onClick={()=> setVisible(false)} className="py-2 pl-6 border-t" to='/'>HOME</NavLink>
                <NavLink onClick={()=> setVisible(false)} className="py-2 pl-6 border-t"  to='/Collection'>COLLECTIONS</NavLink>
                <NavLink onClick={()=> setVisible(false)} className="py-2 pl-6 border-t" to='/About'>ABOUT</NavLink>
                <NavLink onClick={()=> setVisible(false)} className="py-2 pl-6 border-t" to='/Contact'>CONTACT</NavLink>
                </div>

            </div>

        </div>
    )
}