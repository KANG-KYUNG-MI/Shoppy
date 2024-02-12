import React from 'react';
//import Products from './Products';

export default function ProductCard({product:{id, imageUrl, title, description, price} }) {
    return<li className='rounded-1xl shadow-md overflow-hidden cursor-pointer'>
        <img className='w-full' src={imageUrl} alt={title}/>
        <div className='mt-2 px-2 text-lg flex justify-around'>
            <h3 className='truncate'>{title}</h3>
            <h3>{`WON:${price}`}</h3>
        </div>
        <p className='mb-2 px-2 text-gray-600 text-center'>{description}</p>
    </li>
}

