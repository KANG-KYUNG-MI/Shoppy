import React, {useState} from 'react';
import Button from '../components/ui/Button';
import { uploadImage } from '../api/uploader';

export default function NewProduct() {
    const [product, setProduct] = useState({});
    const [file, setFile] = useState();

    const handleChange = (e) => {
        const {name, value, files}= e.target;
        if(name ==='file'){
            setFile(files && files[0]);
            console.log(files[0]);
            return;
        }
        setProduct((product)=>({...product, [name]:value}))};

    const handleSubmit =(e)=>{ 
        e.preventDefault();
        uploadImage(file)
        .then(url=>{
            console.log(url);
        })
    };

    return (
        <section>

            <form onSubmit={handleSubmit}>

                <input type= 'file' 
                       accept='image/*'
                       name='file' 
                       required 
                       onChange={handleChange} />

                <input type='text' 
                       name='title' 
                       value={product.title ?? ''} 
                       placeholder='Search Product' 
                       required 
                       onChange={handleChange} />
              
                <input type='text' 
                       name='price' 
                       value={product.price ?? ''} 
                       placeholder='Price' 
                       required 
                       onChange={handleChange} />

               <input type='text' 
                       name='description' 
                       value={product.description ?? ''} 
                       placeholder='Description' 
                       required 
                       onChange={handleChange}/>

               <input type='text' 
                       name='option' 
                       value={product.option ?? ''} 
                       placeholder='Option' 
                       required 
                       onChange={handleChange}/>
                <Button text={'Product registration'}/>
            </form>
            {file && <img src={URL.createObjectURL(file)} alt='local file' />}
        </section>
    );
}

