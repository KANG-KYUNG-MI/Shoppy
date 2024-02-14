import React from 'react';
import { AiOutlineMinusSquare } from "react-icons/ai";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { addOrUpdateToCart, removeFromCart } from '../api/firebase';
const Icons_Class = 'transition-all cursor-pointer  hover:text-brand hover:scale-105 mx-1 text-2xl'




export default function CartItem(
    { uid,
      product, 
      product:{id, imageUrl, title, option, quantity, price }}
    ) {
    const handleMinus =()=>{
    if(quantity <2) return;
    addOrUpdateToCart(uid, {...product, quantity: quantity - 1})
    }

    const handlePlus =()=>{
    addOrUpdateToCart(uid, {...product, quantity: quantity + 1})
    }

    const handleDelete =()=>{
    removeFromCart(uid, id)
    }

    return <li className='flex justify-between items-center m-10'>
<img className='w-24 md:w-48 rounded-lg' src={imageUrl} alt={title} />
     <div className='flex-1 flex justify-between ml-10'>
        <div className='basis-3/5'>
        <p className='text-lg'>{title}</p>
        <p className='text-xl font-bold text-brand'>{option}</p>
        <p>Price: {price}</p>
        </div>
       
       <div className='text-2xl flex itens-center'>
        <AiOutlineMinusSquare className={Icons_Class} onClick={handleMinus}/>
        <span className=' text-lg'>{quantity}</span>
        <AiOutlinePlusSquare  className={Icons_Class}  onClick={handlePlus} />
        <RiDeleteBin6Fill className={Icons_Class}   onClick={handleDelete} />    
       </div>
     </div>
    </li>
}

