import React, {useState} from 'react';
import Button from '../components/ui/Button';
import { uploadImage } from '../api/uploader';
import {addNewProduct} from '../api/firebase';


export default function NewProduct() {
    const [product, setProduct] = useState({});
    const [file, setFile] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [success, setSucess] = useState();

    const handleChange = (e) => {
        const {name, value, files}= e.target;
        if(name ==='file'){
            setFile(files && files[0]);
             console.log(files,files[0]);
            // return;
        }
        setProduct((product)=>({...product, [name]:value}))
    };

    const handleSubmit =(e)=>{ 
        e.preventDefault();
        setIsUploading(!isUploading)
        uploadImage(file)
        .then(url=>{
            console.log(url);
            addNewProduct(product, url)
        }).then(()=>{
            setSucess('🎉🎊🎉🎊Sucessful🎉🎊🎉🎊!');
            
        })
        .then(()=>{
            setTimeout(()=>{setSucess();
            }, 2000);
           
           
        }).finally( setTimeout(()=>{setIsUploading(isUploading);
        }, 2500))
        
    };

    return (
        <section className='w-full text-center'>
<h2 className='text-2xl font-bold my-5'>New Products Registration</h2>
<h2 className=''> {success && <p> {success}</p>}</h2>

            <form  className='flex flex-col px-12' onSubmit={handleSubmit}>

                <input type= 'file' 
                       accept='image/*'
                       name='file' 
                       required 
                       onChange={handleChange} />

                <input type='text' 
                       name='title' 
                       value={product.title ?? ''} 
                       placeholder='Category' 
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

               <input type=''   
                       name='options' 
                       value={product.options ?? ''} 
                       placeholder='Options' 
                       required 
                       onChange={handleChange}/>
                <Button  text={isUploading ? 'Uploading': 'Product registration'}/>
            </form>
            {file && <img className='w-96 my-5 mx-auto mb-2' src={URL.createObjectURL(file)} alt='local file' />}
        </section>
    );
}

