import React from 'react';
//import Products from './Products';
import { useNavigate } from 'react-router-dom';

export default function ProductCard(
    
    {product,
     product:{id, imageUrl, title, description, price} }) {
    
    const navigate = useNavigate();
return<li onClick={()=>{
    navigate(`/products/${id}`,{state: {product}})
}}
            className='rounded-1xl shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105'>
        <img className='w-full' src={imageUrl} alt={title}/>
        <div className='mt-2 px-2 text-lg flex justify-evenly'>
            <h3 className='truncate'>{title}</h3>
            <h3>{`WON:${price}`}</h3>
        </div>
        <p className='mb-2 px-2 text-gray-600 text-center'>{description}</p>
    </li>
}

