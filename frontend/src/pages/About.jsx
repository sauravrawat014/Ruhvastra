import React from 'react';
import Title from '../components/Title'
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

export default function About(){
    return(
        <div>
            <div className='text-center text-2xl pt-8 border-t border-gray-300'>
                <Title text1={"ABOUT"} text2={"US"}/>
                
            </div>

            <div className='flex flex-col md:flex-row gap-16'>
                <img className='w-full md:max-w-[450px]' src={assets.about_img}/>
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>At Ruhvastra, we believe fashion is more than just clothing — it's self-expression. Our mission is to create timeless, comfortable, and bold pieces that empower individuals to wear their confidence. Every collection is designed with attention to detail, blending contemporary trends with everyday functionality to ensure you feel your best, always.</p>
                    <p>Born out of passion and a love for creativity, we are more than a brand — we’re a movement. Whether it’s a casual day out or making a statement, our clothing is made for those who live with purpose and aren’t afraid to stand out. Join us as we redefine what it means to wear your story.</p>
                    <b className='text-gray-800'>Our Mission</b>
                    <p>At Ruhvastra, our mission is to empower individuals to express themselves confidently through fashion. We believe clothing should not only look good but feel authentic — reflecting your personality, passion, and purpose.We are committed to creating high-quality, thoughtfully designed pieces that combine comfort, creativity, and culture. Every collection is a step toward building a community that values originality, inclusivity, and bold self-expression.</p>


                </div>
            </div>

            <div className='text-xl py-4'>
                <Title text1={"WHY"} text2={"CHOOSE US"}/>
            </div>

            <div className='flex flex-col md:flex-row text-sm mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:p-20 flex flex-col gap-5 border-gray-400'>
                    <b>Quality Assurance</b>
                    <p className='text-gray-600'>Quality Assurance (QA) ensures that our e-commerce platform functions smoothly, securely, and reliably. It involves testing every feature—from product listings to checkout—to identify and fix bugs, improve performance, and provide a seamless user experience for our customers.</p>

                </div>

                <div className='border px-10 md:px-16 py-8 sm:p-20 flex flex-col gap-5 border-gray-400'>
                    <b>Quality Assurance</b>
                    <p className='text-gray-600'>Quality Assurance (QA) ensures that our e-commerce platform functions smoothly, securely, and reliably. It involves testing every feature—from product listings to checkout—to identify and fix bugs, improve performance, and provide a seamless user experience for our customers.</p>

                </div>

                <div className='border px-10 md:px-16 py-8 sm:p-20 flex flex-col gap-5 border-gray-400'>
                    <b>Quality Assurance</b>
                    <p className='text-gray-600'>Quality Assurance (QA) ensures that our e-commerce platform functions smoothly, securely, and reliably. It involves testing every feature—from product listings to checkout—to identify and fix bugs, improve performance, and provide a seamless user experience for our customers.</p>

                </div>
            </div>
            <NewsletterBox/>
        </div>
    )
}