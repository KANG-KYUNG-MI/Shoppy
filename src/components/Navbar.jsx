import React from 'react';
import { Link } from 'react-router-dom';
import { FaShopify } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar(){

    return(
        <header className='flex justify-between border-b border-gray-300 p-5'>
            <Link to ='/' className='flex items-center text-4xl text-brand'>
                <FaShopify />
                <h1>Shoppy</h1>
            </Link>

            <nav className='flex items-center gap-4 font-semibold'>
                <Link to = '/products'>Products</Link>
                <Link to = '/carts' className='text-brand'><FaShoppingCart /></Link>
                <Link to= '/products/new' className='text-2xl text-brand'>
                    <CiEdit/>
                </Link>
                <button>Log In</button>
            </nav>
        </header>
    )
}

