import React from "react";
import { assets } from "../assets/assets";

export default function OurPolicy(){
    return(
        <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-2">
            <div>
                <img src={assets.exchange_icon} className="m-auto w-12 mb-5"/>
                <p className="font-semibold">Easy Exchange Policy</p>
                <p className="text-gray-400">We Offer hassle free exchange</p>
            </div>

            <div>
                <img src={assets.quality_icon} className="m-auto w-12 mb-5"/>
                <p className="font-semibold">Easy Exchange Policy</p>
                <p className="text-gray-400">We Offer hassle free exchange</p>
            </div>

            <div>
                <img src={assets.support_img} className="m-auto w-12 mb-5"/>
                <p className="font-semibold">Easy Exchange Policy</p>
                <p className="text-gray-400">We Offer hassle free exchange</p>
            </div>
        </div>
    )
}