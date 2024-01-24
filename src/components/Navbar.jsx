import React from 'react';
import { Link } from 'react-router-dom';
import { FaShopify } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

export default function Navbar(){

    return(
        <header>
            <Link to ='/'>
                <FaShopify />
                <h1>Shoppy</h1>
            </Link>

            <nav>
                <Link to = '/products'>Products</Link>
                <Link to = '/carts'>Carts</Link>
                <Link to= '/products/new'>
                    <CiEdit/>
                </Link>
                <button>Log In</button>
            </nav>
        </header>
    )
}

