import React, { useState } from 'react';
import { addNewProduct } from '../api/firebase';
import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  const queryClient = useQueryClient();

  const addProduct = useMutation(
   {mutationFn: ({product, url})=>addNewProduct(product, url), 
   onSuccess: ()=>queryClient.invalidateQueries(['products'])
   } 
   
    )



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      console.log(files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file) //
      .then((url) => {
        addProduct.mutate({product, url},
                          {onSuccess: ()=>{
                            setSuccess('Successfully Add it!');
                            setTimeout(() => {setSuccess(null)}, 4000)}}
                            )
      }).finally(() => setIsUploading(false));
  };

  //className='w-full text-center'
  return (
    <section className='flex flex-col  p-4 md:flex-row '  >
     
      <form  className='flex flex-col text-center w-full p-10 basis-5/12'  onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          name='file'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='Product Title'
          required
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          value={product.price ?? ''}
          placeholder='Price'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          placeholder='Category'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='description'
          value={product.description ?? ''}
          placeholder='Description'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='options'
          value={product.options ?? ''}
          placeholder='Sort Out with comma'
          required
          onChange={handleChange}
        />
        <Button
          text={isUploading ? 'Loading' : 'Add New Product'}
          disabled={isUploading} 
        />
      </form>

      <div className='flex flex-col text-center py-2  basis-5/12'>
      <h2 className='text-2xl font-bold'>Add New Product</h2>
      {success && <p className=' mx-25 my-3'>✅ {success}</p>}
      {file && (
        <img
          className='py-2'
          src={URL.createObjectURL(file)}
          alt='local file'
        />
      )}
      </div>
     
    </section>
  );
}
