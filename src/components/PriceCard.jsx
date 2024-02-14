import React from 'react';

export default function PriceCard({text, price}) {
    return <div className='bg-red-50  mx-8 px-8 rounded-2xl text-center text-lg md:text-xl'>
            <p>{text}</p>
            <p className='font-bold text-brand text-xl md:text-2xl'>{price}</p>
        </div>
    
}



