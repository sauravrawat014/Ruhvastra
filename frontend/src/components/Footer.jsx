import React from "react";
import { assets } from "../assets/assets";

export default function Footer(){
    return(
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 ">
                <div>
                    <img src={assets.logo2} className="w-17"/>
                    <p>
                        We’re more than just a clothing brand — we’re a lifestyle. Built on the idea that fashion should be effortless, comfortable, and expressive, our collections bring together premium fabrics, modern fits, and timeless designs. Every piece is created with care to help you look good, feel confident, and stand out in your own way.

                    </p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">Get In Touch</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+1-198-360-1280</li>
                        <li>ruhvastra@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr className="text-gray-300"/>
                <p className="text-center py-5 text-sm">Copyright Reserved By Ruhvastra</p>
            </div>

        </div>
    )
}