// import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FaShopify } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import User from './User';
import Button from './ui/Button';

import { useAuthContext } from './context/AuthContext';

export default function Navbar(){

const {user, login, logout} = useAuthContext();

    return(
        <header className='flex justify-between border-b border-gray-300 p-5'>
            <Link to ='/' className='flex items-center text-4xl text-brand'>
                <FaShopify />
                <h1>Shoppy</h1>
            </Link>

            <nav className='flex items-center gap-4 font-semibold'>
                <Link to = '/products'>Products</Link>

                {user && <Link to = '/carts' className='text-brand'><FaShoppingCart /> 
                </Link>}
                {user && user.isAdmin && (<Link to= '/products/new' className='text-2xl'>
                                            <CiEdit/> </Link>)}
                {user && <User user={user}/>}
                {!user && <Button text={'LogIn'} onClick ={()=>login()} />}
                {user && <Button text ={'LogOut'} onClick ={()=>logout()} />}
            </nav>
        </header>
    )
}

