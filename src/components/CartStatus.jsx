import React from 'react';
import { FaShoppingCart } from "react-icons/fa";

import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function CartStatus() {
    const {uid} = useAuthContext()
    const {data: products} = useQuery({queryKey: ['carts'], queryFn:()=> getCart(uid)})
    
    return (
        <div className='relative'>
            <FaShoppingCart className='text-3xl'/> 
            {products && <p className='w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-2 -right-2 ' >{products.length}</p>}
        </div>
    );
}

