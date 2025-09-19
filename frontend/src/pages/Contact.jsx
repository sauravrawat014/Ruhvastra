import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
export default function Contact(){
    return(
        <div>
            <div className='text-center text-2xl pt-10 border-t border-gray-600'>
                <Title text1={"Contact"} text2={"Us"}/>
            </div>

            <div className='flex flex-col md:flex-row gap-10 mb-28 my-10 justify-center'>
                <img className='w-full md:max-w-[480px]' src={assets.contact_img}/>
                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-xl text-gray-600'>Our Store</p>
                    <p className='text-gray-500'>5407 William Station <br/> Suite 350, Washington, USA</p>
                    <p className='text-gray-500'>Tel: (415) 555-0132 <br/> Email: ruhvastra@gmail.com</p>
                    <p className='font-semibold text-xl text-gray-600'>Careers At Forever</p>
                    <p className='text-gray-500'>Leanr more about our teams and job openings.</p>
                    <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
                </div>
            </div>
            <NewsletterBox/>
        </div>
    )
}