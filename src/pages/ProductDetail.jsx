import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import {addOrUpdateToCart} from '../api/firebase';

export default function ProductDetail() {
  const {uid} = useAuthContext()
  const {
    state: {
      product: { id, imageUrl, title, description, category, price, options },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    const product = { id, imageUrl, title, price, option: selected, quantity:1}
    addOrUpdateToCart  (uid, product);
  };

  return (
    <>
      <p className='mx-12 mt-4 text-gray-700'>{category}</p>
      <section className='flex flex-col items-center md:flex-row p-4'>
        <img className='w-96 basis-6/12 px-4 ' src={imageUrl} alt={title} />
        
        <div className='w-full basis-6/12 flex flex-col '>
          <h2 className='text-3xl font-bold py-2'>{title}</h2>
          <p className='text-2xl font-bold py-2  border-b border-gray-400'>
            ₩{price}
          </p>
          <p className='py-4 text-lg'>{description}</p>
          
          <div className='flex items-center'>
            <label className='text-brand font-bold' htmlFor='select'> Option: </label>
            <select
              id='select'
              className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none'
              onChange={handleSelect}
              value={selected}
                   >
              {options &&
                options.map((option, index) => (
                  <option className='flex text-center' key={index}>{option}</option>
                ))}
            </select>
          </div>
<div className='flex flex-col text-center'>
<Button text='Add to Cart' onClick={handleClick} />
</div>
         
        </div>
     
      </section>
    </>
  );
}
