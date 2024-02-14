import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import { FaPlus } from "react-icons/fa6";
import { FaEquals } from 'react-icons/fa';
import PriceCard from '../components/PriceCard';
import CartItem from '../components/CartItem';
import Button from './../components/ui/Button';
const SHIPPING = 3000

export default function MyCart() {

    const {uid} = useAuthContext()
    const {isLoading, data: products} = useQuery({queryKey: ['carts'], queryFn:()=> getCart(uid)})
    
    if(isLoading){return <p>Loading.......</p>
                  }
    const hasProducts = products && products.length > 0;
    const totalPrice = products && products.reduce(
                                    (prev, current)=> prev + parseInt(current.price) * current.quantity, 0
    )

    return <section className='flex flex-col'>
            <p className='text-2xl flex justify-center items-center font-bold p-2'>My Cart</p>
            {!hasProducts && <p> Cart is empty</p>}
            {hasProducts && (
            <> 
            <div className='text-center p-4'>
            <div className='flex justify-around items-center pb-4'>
                    <PriceCard text="Total Price" price={totalPrice}/>
                   < FaPlus className=' shrink-0 bg-black text-white rounded-full text-2xl'/> 
                   <PriceCard text="Shipping Charge " price={SHIPPING}/>
                    <FaEquals className='shrink-0' />
                    <PriceCard text="Total Amount" price={totalPrice + SHIPPING}/>
            </div>
                <Button text='ORDER HERE'/>

            </div>
            

              
                <ul>
                  {products && products.map((product) =>(
                    <CartItem key={product.id} product={product} uid={uid}/>
                    ))}
                </ul>

            </>
            )}
        </section>
    
}

