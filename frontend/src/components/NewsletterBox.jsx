import React from "react";

export default function NewsletterBox(){

    const onSubmitHandler = (event)=>{
        event.preventDefault();
    }

    return(
        <div className="text-center">
            <p className="text-2xl font-medum text-gray-800">Subscribe Now & Get 20% OFF</p>
            <p className="text-gray-400 mt-3">
                Join our style community today! Be the first to know about new arrivals, exclusive offers, and fashion tips — plus enjoy an instant 20% OFF on your first order. Fresh fashion, straight to your inbox.

            </p>
            <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
                <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Enter your email" required/>
                <button className="bg-black text-white text-xs px-10 py-4" type="submit">SUBSCRIBE</button>
            </form>

        </div>
    )
}